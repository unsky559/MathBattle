const URL_DATABASE = "mongodb://localhost:27017/mydb";

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mongo_store = require('connect-mongo');
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3000;

const router = require('./back/router/router');

const SESS_LIFETIME = 60 * 1; // 1 minutes
const SESS_SECRET = "B6EG4W74o8z54h070BuQIMWBDy3qb5jk4e2mhqAsmziPBKDOSG34Dm8B8FVw5log";


app.use(cookieParser());
app.use(session({
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
}));

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

// any request redirect to '/'
app.use((req, res) => {
  res.redirect('/');
});



const startServer = async () => {
  try {
    await mongoose.connect(URL_DATABASE);
    app.listen(PORT, (error) => {  
      error ? console.log(error) : console.log(`Server started. PID: ${process.pid}. Listening port: ${PORT}.`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();