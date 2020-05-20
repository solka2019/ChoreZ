const express = require('express');
const router = express.Router();
const Parent = require('../database/models/parent');
const Child = require('../database/models/child');
const Task = require('../database/models/task');
//const passport = require('../passport');

router.post('/taskcompleted',  (req, res) => {
    console.log('task completed api received a request from browser');

    const idFromBrowser = req.body.taskId;
    const childIdFromBrowser = req.body.childId;

    // https://mongoosejs.com/docs/api.html#model_Model.findOne
    Task.findOne({
           _id: idFromBrowser,
           completed: false
        },
        async (err, task) => {
            if (err) {
                console.log('failed to find one task with id passed in and not completed!: ', err);
                res.json({
                    // send something back to browser saying it worked
                    success: false
                });
            } else if (task) {
                // got the task, now we need to set it to 'complete: true'
                console.log(task);
                task.completed = true;
                task.childId = childIdFromBrowser;
                await task.save();
                res.json({
                    // send something back to browser saying it worked
                    success: true
                });
            }           
        });
});

router.post('/taskdeleted',  (req, res) => {
    console.log('task deleted api received a request from browser');

    const idFromBrowser = req.body.taskId;

    // https://mongoosejs.com/docs/api.html#model_Model.findOne
    Task.findOne({
           _id: idFromBrowser
        },
        async (err, task) => {
            if (err) {
                console.log('failed to find one task with id passed in and not completed!: ', err);
                res.json({
                    // send something back to browser saying it worked
                    success: false
                });
            } else if (task) {
                console.log(task);
                // https://kb.objectrocket.com/mongo-db/how-to-delete-documents-with-mongoose-235
                await Task.deleteOne( { _id: task._id });
                res.json({
                    // send something back to browser saying it worked
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
                    // send something back to browser saying it worked
                    success: false
                });
            } else {
                res.json({
                    success: true
                });
            }           
        });
});

// createchild from browser
router.post('/createchild',  (req, res) => {
    console.log('createchild api received a request from browser');

    const newChildName = req.body.name;
    const parentId = req.body.parentId;

      // https://mongoosejs.com/docs/api.html#model_Model.findOne
      Child.findOne({
        name: newChildName
        },
        (err, child) => {
            if (err) {
                console.log('Child.js post error: ', err);
            } else if (child) {
                res.json({
                    error: `Sorry, already a child with the name: ${newChildName}`
                });
            } else {
                const newChild = new Child({
                    name: newChildName,
                    parentId: parentId
                });
                newChild.save((err, savedUser) => {
                    if (err) return res.json(err);
                    res.json(savedUser);
                });
            }
        });
});

router.post('/createtask',  (req, res) => {
    console.log('createtask api received a request from browser');

    const taskData = req.body.task;

      // https://mongoosejs.com/docs/api.html#model_Model.findOne
      Task.findOne({
            task: taskData.task,
            value: taskData.value,
            parentId: taskData.parentId
        },
        (err, task) => {
            if (err) {
                console.log('task.js post error: ', err);
            } else if (task) {
                res.json({
                    error: `Sorry, you already have a task with the same text and value.`
                });
            } else {
                const newTask = new Task({
                    task: taskData.task,
                    value: taskData.value,
                    parentId: taskData.parentId,
                    completed: false
                });

                newTask.save((err, savedTask) => {
                    if (err) return res.json(err);
                    res.json(savedTask);
                });
            }
        });
});

// refreshTasksByParent from the App.js
// https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
router.get('/tasksbyparent', async (req, res) => {
    console.log('get all child tasks from a given parentId - will return every task completed or not');
    const tasksArray = await Task.find({
        parentId: req.query.parentId
    });

    console.log("Sending tasks to browser:");
    console.log(JSON.stringify(tasksArray));
    
    res.json({
        tasks: tasksArray
    });
});

// refreshChildrenByParent from App.js
// https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
router.get('/childrenbyparent', async (req, res) => {
    console.log('get all children from a given parentId ');
    const childrenArray = await Child.find({
        parentId: req.query.parentId
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