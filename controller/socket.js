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
  });//connection
};