const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const pool = require('../db/pool');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE googleID = ?', [id], (err, user, fields) => {
        if (err) throw err;
        done(null, user[0])
    })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            pool.query('SELECT uID FROM users WHERE googleID = ?', [profile.id], (err, existingUser, fields) => {
                if (err) throw err;
                const currentTime = new Date();
                if (existingUser.length > 0) {
                    pool.query('UPDATE users SET lastLoginAt = ? WHERE uID = ?', [currentTime.getTime(), existingUser[0].uID], (err, results, fields) => {
                        if (err) throw err;
                        done(null, profile);
                    })
                } else {
                    let queryValues = [profile.displayName, profile.photos[0].value, profile.id, currentTime.getTime(), currentTime.getTime(), currentTime.getTime()]
                    pool.query('INSERT INTO users (name, imageURL, googleID, createdAt, lastActiveAt, lastLoginAt) VALUES (?, ?, ?, ?, ?, ?)', queryValues, (err, results, fields) => {
                        if (err) throw err;
                        done(null, profile);
                    })
                }
            })
        }
    )
);