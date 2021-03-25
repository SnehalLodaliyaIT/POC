const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

// cookieSession config
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
    clientID: '848558335103-5nu5gqi1mqg9p42l16gtccpcqk3lg6ne.apps.googleusercontent.com',
    clientSecret: '9maBZg1Tha_c1DA5n-9WCs-9',
    callbackURL: 'http://localhost:8000/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        done(null, profile); // passes the profile data to serializeUser
    }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}

// Routes
app.get('/', (req, res) => {
    /*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
    function oauthSignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        // var form = document.createElement('form');
        // form.setAttribute('method', 'GET'); // Send as a GET request.
        // form.setAttribute('action', oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {
            'client_id': '848558335103-5nu5gqi1mqg9p42l16gtccpcqk3lg6ne.apps.googleusercontent.com',
            'redirect_uri': '9maBZg1Tha_c1DA5n-9WCs-9',
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };
        
        const request = require("request")

        let options = {
            method: 'GET',
            uri: oauth2Endpoint,
            params:params
        }

        request(options, function (error, response, body) {
            //console.log(response)
            let accessToken = body.access_token
            console.log(body)
        })
        
    }
    oauthSignIn();
});

// passport.authenticate middleware is used here to authenticate the request
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'] // Used to specify the required data
}));

// The middleware receives the data from Google and runs the function on Strategy config
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/secret');
});

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(8000, () => {
    console.log('Server Started!');
});