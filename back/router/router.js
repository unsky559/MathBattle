const {body} = require('express-validator');
const {StatusCodes} = require('http-status-codes');

const user_controller = require('../controllers/user_controller.js');
const game_controller = require('../controllers/game_controller.js');

const Router = require('express').Router;
const router = new Router();

const MIN_USERNAME_LEN = 4;
const MAX_USERNAME_LEN = 16;

const MIN_PASS_LEN = 8;
const MAX_PASS_LEN = 32;

function isLoggedIn(req, res, next)
{
  if(req.session.user_id){
    return next();
  }
  else{
    res.status(StatusCodes.UNAUTHORIZED).send({status: "fail", code: StatusCodes.UNAUTHORIZED, data: null});
  }
}

function isNotLoggedIn(req, res, next)
{
  if(!req.session.user_id){
    return next();
  }
  else{
    res.status(StatusCodes.CONFLICT).send({status: "fail", code: StatusCodes.CONFLICT, data: null});
  }
}

router.post('/reg', isNotLoggedIn,
  body('username').isLength({ min: MIN_USERNAME_LEN, max: MAX_USERNAME_LEN}).withMessage('Invalid username length')
  .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Invalid characters in username'),
  body('password').isLength({ min: MIN_PASS_LEN, max: MAX_PASS_LEN}).withMessage('Invalid password length'),
  body('email').isEmail().withMessage('Invalid email'),
  user_controller.register
);
router.post('/changepassword', isLoggedIn,
  body('current_password').isLength({ min: MIN_PASS_LEN, max: MAX_PASS_LEN}).withMessage('Invalid current password length'),
  body('new_password').isLength({ min: MIN_PASS_LEN, max: MAX_PASS_LEN}).withMessage('Invalid new password length'),
  user_controller.changePassword
);
router.post('/login', isNotLoggedIn, 
  body('username').notEmpty(),
  body('password').notEmpty(),
  user_controller.login
);
router.post('/logout', isLoggedIn, user_controller.logout);

router.get('/account', isLoggedIn, user_controller.getCurrentUser);
router.get('/user/:username', user_controller.getUserByUsername);
router.get('/gamepresets', game_controller.getGamePresets);

router.use('*', (req, res) => { res.status(StatusCodes.NOT_FOUND).send({status: "fail", code: StatusCodes.NOT_FOUND, data: null}); });

module.exports = router;