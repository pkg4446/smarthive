const SocketIO  = require('socket.io');
const DataBase  = require('./device/whisper');

const clients   = {};

module.exports = (server) => {  
  const io = SocketIO(server, { path: '/socket.io' }); 
  io.on('connection', (socket) => {
    const ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress; //ip get
    const instanceId = socket.id;
    let   userID = null;
    
    console.log('새로운 클라이언트 접속!', ip, instanceId); // socket.id

    socket.emit('client',{type:"access",result:true,data:null});

    socket.on('disconnect', () => {      
      console.log('클라이언트 접속 해제', ip, instanceId);
      for (const key in clients) {
        if(clients[key][0] == instanceId) delete clients[key];
      }
    });
    socket.on('error', (error) => {
      console.error(error);
    });    

    socket.on('init',async function (DATA) {
      if( DATA.ID != undefined &&clients[DATA.id] == undefined ){
        clients[DATA.ID] = [instanceId,DATA.RESV];
        userID = DATA.ID;
        DATA.SEND = DATA.ID;
        const pastChat = await DataBase.read(DATA);
        socket.emit('client',{type:"init",result:true,DATA:pastChat});
      }else{
        socket.emit('client',{type:"init",result:false,DATA:null});
      }
      console.log(DATA,clients);
    });

    socket.on('chat',async function (DATA) {
      //await DataBase.write();
      let read = false;
      socket.emit('client',{type:"chat",result:true,data:DATA.text});
      if((clients[DATA.RESV] != undefined) && (clients[DATA.RESV][1] == userID)){
        read = true;
        io.to(clients[DATA.RESV][0]).emit('client',{type:"chat",result:true,data:DATA});
      }
      socket.emit('client',{type:"chat",result:true,DATA:read});
    });
  });//connection
};
