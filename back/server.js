const URL_DATABASE = process.env.npm_package_config_databaseURL;
const PORT = process.env.PORT || process.env.npm_package_config_port || 80;
const SESS_LIFETIME = process.env.npm_package_config_session_lifetime;
const SESS_SECRET = process.env.npm_package_config_session_secret;

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongo_store = require('connect-mongo');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
//const path = require("path");

//require('./modules/set_game_presets');

const app = express();
const server = http.createServer(app);
const io = require('./io/socket.js').listen(server);

const router = require('./router/router');

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
    maxAge: 1000 * SESS_LIFETIME,
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
