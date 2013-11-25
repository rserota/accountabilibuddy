var path = require("path");
var User = require('./../user.js');
var passport = require('passport');

exports.index = function(req, res){
  res.render('index', { title: "Hey"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.account = function(req, res){
	User.findById(req.session.passport.user, function(err, user) {
    if(err) { 
      console.log(err); 
    } else {
      res.render('account', { user: user});
    }
  })
};
