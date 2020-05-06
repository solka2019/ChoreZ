const express = require('express');
const router = express.Router();
const Parent = require('../database/models/parent');
const passport = require('../passport');
// SE O SERVIDOR RECEBEU O PEDIDO DE POST. CRIAR PARENT TEM QUE TER UMA ROUTE CRIADA PRA ISSO PRO SERVIDOR ENTENDER E CRIAR ISSO E NAO DAR ERROR 400 OU 500
router.post('/', (req, res) => {
    console.log('parent signup');

    const {
        username,
        password
    } = req.body;
// ESTE PARENT EH UM OBJECT QUE FOI CRIADO NO MODEL. FIND ONE EH A FUNCAO QUE JA VEM COM O MONGOOSE. FIND ONE EH PRA PROCURAR SE JA EXISTE UM FUNCIONARIO 
// COM ESTE NOME. ELE VAI TESTAR SE O USUARIO JA EXISTE E NAO VAI CRIAR OUTRO COM O MESMO NOME.
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