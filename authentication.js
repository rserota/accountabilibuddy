var passport = require('passport')
var GithubStrategy = require('passport-github').Strategy;
var User = require('./user.js')
var config = require('./oauth.js')

// config
module.exports = passport.use(new GithubStrategy({
   clientID: config.github.clientID,
   clientSecret: config.github.clientSecret,
   callbackURL: config.github.callbackURL
 },
 function(accessToken, refreshToken, profile, done) {
 User.findOne({ oauthID: profile.id }, function(err, user) {
   if(err) { console.log(err); }
   if (!err && user != null) {
     done(null, user);
   } else {
     var user = new User({
       oauthID: profile.id,
       name: profile.displayName,
       created: Date.now()
     });
     user.save(function(err) {
       if(err) { 
         console.log(err); 
       } else {
         console.log("saving user ...");
         done(null, user);
       };
     });
   };
 });
}
));
