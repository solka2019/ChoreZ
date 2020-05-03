const express = require('express');
const router = express.Router();
const Parent = require('../database/models/parent');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('parent signup');

    const {
        username,
        password
    } = req.body;

    // ADD VALIDATION
    Parent.findOne(
        {
        username: username
        }, 
        (err, user) => {
            if (err) {
                console.log('User.js post error: ', err);
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                });
            } else {
                const newUser = new Parent({
                    username: username,
                    password: password
                });
                newUser.save((err, savedUser) => {
                    if (err) return res.json(err);
                    res.json(savedUser);
                });
            }
        });
});

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/parent.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        res.send(req.user);
    }
);

router.get('/', (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
        res.json({
            user: req.user
        });
    } else {
        res.json({
            user: null
        });
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.send({
            msg: 'logging out'
        });
    } else {
        res.send({
            msg: 'no user to log out'
        });
    }
});

module.exports = router;