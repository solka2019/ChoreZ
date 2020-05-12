const express = require('express');
const router = express.Router();
//const Parent = require('../database/models/parent');
//const Child = require('../database/models/child');
const Task = require('../database/models/task');
//const passport = require('../passport');

router.post('/api/taskcompleted', (req, res) => {
    console.log('tssk completed api received a request from browser');

    const {
        idFromBrowser
    } = req.body;

    // https://mongoosejs.com/docs/api.html#model_Model.findOne
    Task.findOne({
           taskId: idFromBrowser,
           completed: false
        },
        (err, task) => {
            if (err) {
                console.log('failed to find one task with id passed in and not completed!: ', err);
            } else if (task) {
                // todo: got the task, now we need to set it to 'complete: true'
                res.json({
                    // todo: send something back to browser saying it worked

                });
            }
           
        });
});


module.exports = router;

// const router = require("express").Router();
// const orm = require("../db/orm.js");

// router.post("/api/task", ({ body }, res) => {
//   Transaction.create(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/transaction", (req, res) => {
//   Transaction.find({})
//     .sort({ date: -1 })
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// module.exports = router;
