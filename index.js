const express=require("express")
const app=express()
app.use(express.json())
const passport=require("passport")
const session=require("express-session")
app.use(session({secret:"privatekey"}))

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID:"919426656787-tt08ef56j91f25lgsd7bp10e0ud9o5l9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2300/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb(null, profile)
}
))

passport.serializeUser((user,done)=>{
    return done(null,user)
})
passport.deserializeUser((user, done) => {
    return done(null, user);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.send("done");
    });

app.listen(2300,()=>
{
    console.log("listening to 2300");
}
)