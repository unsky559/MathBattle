var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});
var port = 2000;
var DEBUG = true;

//Открывает индекс файл если на серв поступил пустой запрос
app.get('/',function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
//Даём доступ к папке клиент
app.use('/client', express.static(__dirname + '/client'));

//Ставим серв и слушаем порт
serv.listen(port);
console.log("Server started on port "+port);

var PLAYER_LIST = {}; //Список сокетов
var string = "";
var result = 0;
// ------
var hard = 100;
var toWin = 100;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function newEx(socket) {

  var n1 = Math.round(Math.random()*hard);
  var n2 = Math.round(Math.random()*hard);
  var doing = Math.round(getRandomArbitrary(0,1));

  var ex = [];
  if(doing == 0){
    string = n1 + "+" + n2;
    result = n1 + n2;
  }else if(doing == 1){
    string = n1 + "-" + n2;
    result = n1 - n2;
  }else if (doing == 2) {
    string = n1 + "*" + n2;
    result = n1 * n2;
  }

  socket.emit('responce', {newEx: string});
  return ex = {string: string, result: result};

}

function ci() {
  console.log("___________");
}



function updatePlayerList() {
  io.emit('players', PLAYER_LIST);
}


io.on('connection', function (socket) {
  var id = socket.id;
  var score = 0;
  var username = "";
  if(string == ""){
    newEx(io);
  }
  socket.emit('responce', {newEx: string});



  socket.on('username', function (data) {
    PLAYER_LIST[id] = {username: data.username, score: 0};
    username = data.username;
    ci();
    console.log(PLAYER_LIST);
    updatePlayerList();
  });

  socket.on('answer', function (data) {
    console.log(data);

    if(score >= toWin - 1){
      io.emit('win', {winner: username});
    }
    console.log(score);
    console.log(toWin);

    if(data.answer == result && data.answer != ''){
      score++;
      PLAYER_LIST[id] = {username: username, score: score};
      newEx(io);
      socket.emit('responce', {wrong: false});
      console.log(PLAYER_LIST);
    }else {
      socket.emit('responce', {wrong: true});
    };
    updatePlayerList();
  });


  socket.on('disconnect', function () {
    delete PLAYER_LIST[id];
    ci();
    console.log(PLAYER_LIST);
    updatePlayerList();
  });


});
