const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user_model = require('../models/user_model.js');

const {body} = require('express-validator');
const user_controller = require('../controllers/user_controller.js');

const Router = require('express').Router;
const router = new Router();

const MIN_USERNAME_LEN = 4;
const MAX_USERNAME_LEN = 32;

const MIN_PASS_LEN = 8;
const MAX_PASS_LEN = 32;

function isLoggedIn(req, res, next)
{
  if(req.session.user_id){
    return next();
  }
  else{
    console.log("Request rejected");
    res.redirect('back');
  }
}

function isNotLoggedIn(req, res, next)
{
  if(!req.session.user_id){
    return next();
  }
  else{
    console.log("Request rejected");
    res.redirect('back');
  }
}

router.get('/reg', isNotLoggedIn, (req, res) => {
  res.send('<h1>/reg</h1>');
});

router.post('/reg', isNotLoggedIn,
                    body('username').isLength({ min: MIN_USERNAME_LEN, max: MAX_USERNAME_LEN}),
                    body('password').isLength({ min: MIN_PASS_LEN, max: MAX_PASS_LEN}),
                    body('email').isEmail(),
                    user_controller.register
                    );

router.post('/login', isNotLoggedIn, user_controller.login);
router.delete('/logout', isLoggedIn, user_controller.logout);

router.get('/login', isNotLoggedIn, (req, res) => {
  res.send('<h1>/login</h1>');
});

router.get('/homepage', isLoggedIn, (req, res) => {
  res.send('<h1>Hello! Session created!.</h1>');
});

router.get("/user/:username", user_controller.getUserByUsername);

module.exports = router
