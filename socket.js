const pool = []; 

module.exports.listen = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    if(socket.request.session.user_id){
      console.log("A new user: ", socket.id, " (authorized)");
    }
    else{
      console.log("A new user: ", socket.id, " (anonymous)");
    }

    socket.on('find_game', (data) => {
      const game_preset_id = JSON.parse(data).game_preset_id;
      
      //pool_index = pool.push(/* SOMETHING */) - 1;
      /*
        finding...
      */

    });

    socket.on("disconnect", () => {      
      if(socket.request.session.user_id){
        console.log("USER LEFT: ", socket.id, " (authorized)");
      }
      else{
        console.log("USER LEFT: ", socket.id, " (anonymous)");
      }


    });
    /*
    socket.onAny((evek, arguments) => {
        console.log(`event ${evek} from ${socket.id}`);
        console.log(arguments);
    });
    */
 });

  return io;
}