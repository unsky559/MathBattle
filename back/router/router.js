const user_model = require('../models/user_model.js');

const {body} = require('express-validator');
const user_controller = require('../controllers/user_controller.js');

const Router = require('express').Router;
const router = new Router();

const MIN_USERNAME_LEN = 4;
const MAX_USERNAME_LEN = 16;

const MIN_PASS_LEN = 8;
const MAX_PASS_LEN = 32;

function isLoggedIn(req, res, next)
{
  if(req.session.user_id){
    // mongo -> last_online = Date.now()
    return next();
  }
  else{
    console.log("Request rejected"); // 401 UNAUTHORIZED
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
    res.redirect('back'); //409 CONFLICT
  }
}

router.post('/reg', isNotLoggedIn,
  body('username').isLength({ min: MIN_USERNAME_LEN, max: MAX_USERNAME_LEN}).withMessage('Invalid username length')
  .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Invalid characters in username'),
  body('password').isLength({ min: MIN_PASS_LEN, max: MAX_PASS_LEN}).withMessage('Invalid password length'),
  body('email').isEmail().withMessage('Invalid email'),
  user_controller.register
);

router.post('/login', isNotLoggedIn, user_controller.login);
router.post('/logout', isLoggedIn, user_controller.logout);


router.get('/homepage', isLoggedIn, (req, res) => {
  res.send('<h1>Hello! Session created!.</h1>');
});

router.get("/user/:username", user_controller.getUserByUsername);

module.exports = router
