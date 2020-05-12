const express = require('express');
const router = express.Router();
const Parent = require('../database/models/parent');
const Child = require('../database/models/child');
const Task = require('../database/models/task');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('parent signup');

    const {
        username,
        password
    } = req.body;

    Parent.findOne({
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
    async (req, res) => {
        console.log('logged in', req.user);
        // res.send(req.user);
        // get children
        const childrenArray = await Child.find({
            parentId: req.user.parentId
        });
        const tasksArray = await Task.find({
            parentId: req.user.parentId
        });

        const parent = await Parent.findOne({
            username: req.user.username
        });

        res.send({
            user: parent,
            children: childrenArray,
            tasks: tasksArray
        });
    }
);

router.get('/', async (req, res, next) => {
    console.log('Check if parent is already logged in');
    console.log('user: ' + req.user);
    if (req.user) {
        // get children
        const childrenArray = await Child.find({
            parentId: req.user.parentId
        });
        const tasksArray = await Task.find({
            parentId: req.user.parentId
        });

        res.json({
            user: req.user,
            children: childrenArray,
            tasks: tasksArray
        });

    } else {
        // if not loggedin, we need to return the tasks because it's a child in the main screen
        // get children
        const childrenArray = await Child.find({});
        const tasksArray = await Task.find({
            completed: false
        }); //kids only want to see the tasks they have not finished yet!
        console.log("Sending children to browser:");
        console.log(JSON.stringify(childrenArray));
        console.log("Sending tasks to browser:");
        console.log(JSON.stringify(tasksArray));
        
        res.json({
            user: null,
            children: childrenArray,
            tasks: tasksArray
        });
    }
});

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