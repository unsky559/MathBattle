const URL_DATABASE = "mongodb://localhost:27017/mydb";
const PORT = process.env.PORT || 3000;
const SESS_LIFETIME = 60 * 3; // 3 minutes
const SESS_SECRET = "B6EG4W74o8z54h070BuQIMWBDy3qb5jk4e2mhqAsmziPBKDOSG34Dm8B8FVw5log";

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongo_store = require('connect-mongo');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
//const path = require("path");

const app = express();
const server = http.createServer(app);
//const io = require('socket.io')(server);
const io = require('./socket.js').listen(server);

const router = require('./back/router/router');

const session_middleware = session({
  name: 'sid',
  secret: SESS_SECRET,
  resave: false,
  //resave: true,
  //rolling: true, 
  saveUninitialized: false,
  genid: function(req) {
    return uuidv4();
  },
  store: mongo_store.create({
    mongoUrl: URL_DATABASE,
    collectionName: 'sessions',
    ttl: SESS_LIFETIME
  }),
  cookie: {
    maxAge: 1000 * SESS_LIFETIME, //SESS_LIFETIME,
    httpOnly: true,
    sameSite: 'strict',
    secure: false // dev
  }
});

app.use(cookieParser());
app.use(session_middleware);

io.use((socket, next) => {
  session_middleware(socket.request, {}, next);
  // sessionMiddleware(socket.request, socket.request.res, next); will not work with websocket-only
  // connections, as 'socket.request.res' will be undefined in that case
});

app.use(express.json());
app.use('/api', router);

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const startServer = async () => {
  try {
    await mongoose.connect(URL_DATABASE);
    server.listen(PORT, (error) => {  
      error ? console.log(error) : console.log(`Server started. PID: ${process.pid}. Listening port: ${PORT}.`);
    });
  } catch (error) {
    console.error(error); 
  }
/*
  io.on('connection', (socket) => {
     console.log("a new user", socket.id);
     socket.on("disconnect", () => {
        console.log("USER LEFT: ", socket.id);
     });
     socket.onAny((evek, arguments) => {
         console.log(`event ${evek} from ${socket.id}`);
         console.log(arguments);
     })
  });
*/
}

startServer();
