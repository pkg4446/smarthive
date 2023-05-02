const SocketIO  = require('socket.io');

module.exports = (server) => {  
  const io = SocketIO(server, { path: '/socket.io' }); 
  io.on('connection', (socket) => {
    const ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress; //ip get
    const instanceId = socket.id;
    
    console.log('새로운 클라이언트 접속!', ip, instanceId); // socket.id

    socket.on('disconnect', () => {      
      console.log('클라이언트 접속 해제', ip, instanceId);
      console.log(World);
    });
    socket.on('error', (error) => {
      console.error(error);
    });    

    socket.on('announce', (data) => {         
      const total = [];
      const rooms = socket.adapter.rooms;
      const sids  = socket.adapter.sids;
      rooms.forEach((value, index) => {
        if(sids.get(index) == undefined){
          total[index] = [];
          for (const iterator of value) {total[index].push(iterator);}
        }          
      });      
      for (const key in total) {
        io.sockets.in(key).emit('console',data);
      }
    });

    socket.on('access',async function (data) {
        if(data.ACCESS == "IN"){
            socket.join(UUID);
        }else if(data.ACCESS == "OUT"){
            socket.leave(data.UUID)
        }
    });

    socket.on('invasion', async function (data) {
      if(turn && World.SITE[UUID]){        
        const participants  = Object.keys(World.SITE[UUID]).length
        if(data.SEND.M == "CAPTURE"){
          data.SEND.D = await capture(USERID,UUID);
        }
        const response  = await invasionAction(USERID,participants,instanceId,data.SEND,UUID);
        socket.emit('active',response);
        socket.in(UUID).emit('passive',response);
        turn = false;
      }else if(!World.SITE[UUID]){
        socket.emit('active',{command: 'ERR', result: 0});
      }else{        
        socket.emit('active',{command: 'WAIT', result: TURN_INTERVAL - (new Date().getTime() - INTERVAL)});
      }
    });

  });
};