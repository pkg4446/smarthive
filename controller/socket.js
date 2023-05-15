const SocketIO  = require('socket.io');
const DataBase  = require('./app/whisper');
const firebase  = require('firebase-admin');

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
        clients[DATA.ID] = [instanceId,DATA.RECV];
        userID = DATA.ID;
        DATA.SEND = userID;
        await DataBase.write(DATA);
        const pastChat = await DataBase.read(DATA);        
        socket.emit('client',{type:"init",result:true,data:pastChat});
      }else{
        socket.emit('client',{type:"init",result:false,data:null});
      }
      
      console.log("init",DATA,clients);
    });

    socket.on('chat',async function (DATA) {     

      DATA.SEND = userID;
      DATA.READ = false;
      if((clients[DATA.RECV] != undefined) && (clients[DATA.RECV][1] == userID)){
        DATA.READ = true;
        io.to(clients[DATA.RECV][0]).emit('client',{type:"chat",result:true,data:{TYPE:"recv",RES:DATA}});        
      }
      await DataBase.write(DATA);
      socket.emit('client',{type:"chat",result:true,data:{TYPE:"send",RES:{READ:DATA.READ}}});
      
      console.log("chat",DATA);
    });
  });//connection
};
