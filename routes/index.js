var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.session.user) {
  //   res.render('index', { title: 'Express' });
  // } else {
  //   res.render('login-register');
  // }
  if (!req.cookies.voted) {
    res.cookie('voted', "");
  }
  res.render('index', {title: 'meanSurvey'});
});

router.post('/login', function(req, res, next) {
  var users = req.db.get('users');
  users.find({username: req.body.username}, function(err, result){
    req.session.user = result[0];
    res.redirect('/');
  })
})

router.post('/signup', function(req, res, next) {
  var users = req.db.get('users');
  users.insert({username: req.body.username}, function(err, result){
    req.session.user = result;
    res.redirect('/');
  })
})

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
})

module.exports = router;
