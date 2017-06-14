var express = require('express');
var router = express.Router();
let biz = require('../biz/user');
/* GET home page. */
router.get('/',biz.authorize,function(req, res, next) {
  res.render('index',{user:req.session.user});
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Get UserInfor
 */
router.get('/user/:id',(req,res,next)=>{
  res.send(`userId is:${req.params.id}`);
});

/**
 * Login Page
 */

router.get('/login',(req,res,next)=>{
   res.render('login',{user:req.session.user});
});

/**
 * Login Api
 */
router.post('/login', biz.login);

/**
 * Register Page
 */
router.get('/reg', (req, res, next) => {
  res.render('register',{user:req.session.user});
});

/**
 * Register Api
 */
router.post('/reg', biz.newUser);

/**
 * Loginout
 */
router.get('/loginout', biz.loginout);

/**
 * Profile Page
 */
router.get('/profile/:username', (req, res, next) => {
  res.render('profile',{user:req.session.user});
});

module.exports = router;