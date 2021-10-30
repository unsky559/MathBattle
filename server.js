const http = require('http');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;
const jsonParser = express.json();


const database = require('./modules/database');
database.init();
const conn = database.getDatabaseConnection();


const registration = require("./modules/registration");
const login = require("./modules/login");


app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/reg', (req, res) => {
  res.send('<h1>/reg</h1>');
});

app.post('/reg', jsonParser, (req, res) => {
  //console.log(req.body);
  if(req.body.nickname && req.body.email && req.body.password){
    console.log('/reg: post request');
    const [reg_nickname, reg_email, reg_password]= [req.body.nickname, req.body.email, req.body.password];
    registration.register(reg_nickname, reg_email, reg_password, (err) => {
      if(!err){
        res.send('Account created successfully!\n');
      }
      else
        res.send('Registration error!\n');
    });
  }
  else{
    console.log('/reg: empty post request');
    res.send('Error: empty post request\n');
  }
});

app.get('/login', (req, res) => {
  res.send('<h1>/login</h1>');
});

app.post('/login', jsonParser, (req, res) => {
  console.log(req.body);
  if(req.body.login_word && req.body.password){
    console.log('/login: post request');
    const [login_word, login_password]= [req.body.login_word, req.body.password];
    login.login(login_word, login_password, (err) => {
      if(!err)
        res.send('Login successfully!\n');
      else
        res.send('Login error!\n');
    });
  }
  else{
    console.log('/login: empty post request');
    res.send('Error: empty post request\n');
  }
});

// any request redirect to '/'
app.use((req, res) => {
  res.redirect('/');
});


app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started. PID: ${process.pid}. Listening port: ${PORT}.`);

  conn.on('open', () => {
      conn.db.listCollections().toArray((err, names) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Database opened successfully.');
          //console.log(names);
        }
        //conn.closeConnection();
      });
  });
});
