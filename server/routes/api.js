const express = require('express');
const router = express.Router();
const Parent = require('../database/models/parent');
const Child = require('../database/models/child');
const Task = require('../database/models/task');
//const passport = require('../passport');

router.post('/taskcompleted',  (req, res) => {
    console.log('task completed api received a request from browser');

    const idFromBrowser = req.body.taskId;

    // https://mongoosejs.com/docs/api.html#model_Model.findOne
    Task.findOne({
           _id: idFromBrowser,
           completed: false
        },
        async (err, task) => {
            if (err) {
                console.log('failed to find one task with id passed in and not completed!: ', err);
                res.json({
                    // todo: send something back to browser saying it worked
                    success: false
                });
            } else if (task) {
                // todo: got the task, now we need to set it to 'complete: true'
                console.log(task);
                task.completed = true;
                await task.save();
                res.json({
                    // todo: send something back to browser saying it worked
                    success: true
                });
            }           
        });
});

router.post('/taskupdated',  (req, res) => {
    console.log('task updated api received a request from browser');

    const idFromBrowser = req.body.task._id;
    let task = req.body.task;

    //https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-findoneandreplace-function-1019
    Task.findOneAndReplace({
           _id: idFromBrowser
        },
        task,
        (err, result) => {
            if (err) {
                console.log('failed to find one task with id passed in and not completed!: ', err);
                res.json({
                    // todo: send something back to browser saying it worked
                    success: false
                });
            } else {
                res.json({
                    success: true
                });
            }           
        });
});



// refreshTasksByParent from the App.js
router.get('/tasksbyparent', async (req, res) => {
    console.log('get all child tasks from a given parentId - will return every task completed or not');
    const tasksArray = await Task.find({
        parentId: req.parentId
    });

    console.log("Sending tasks to browser:");
    console.log(JSON.stringify(tasksArray));
    
    res.json({
        tasks: tasksArray
    });
});

// refreshChildrenByParent from App.js
router.get('/childrenbyparent', async (req, res) => {
    console.log('get all children from a given parentId ');
    const childrenArray = await Child.find({
        parentId: req.parentId
    });

    console.log("Sending children to browser:");
    console.log(JSON.stringify(childrenArray));
    
    res.json({
        children: childrenArray
    });
});



// refreshChildTasks - from the app.js
router.get('/childtasks', async (req, res) => {
    console.log('get all child tasks - will return the ones not completed');
    const tasksArray = await Task.find({
        completed: false
    }); //kids only want to see the tasks they have not finished yet!

    console.log("Sending tasks to browser:");
    console.log(JSON.stringify(tasksArray));
    
    res.json({
        tasks: tasksArray
    });
});



// refreshChildren from App.js
router.get('/children', async (req, res) => {
    console.log('get all children ');
    const childrenArray = await Child.find({});

    console.log("Sending children to browser:");
    console.log(JSON.stringify(childrenArray));
    
    res.json({
        children: childrenArray
    });
});

module.exports = router;