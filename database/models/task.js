const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: {
    type: String,
    trim: false,
    required: "Enter the chore description"
  },
  value: {
    type: Number,
    required : "Enter how many points the task is worth"
  },
  childId: {
    type:  mongoose.Schema.ObjectId
  },
  parentId : {
    type:  mongoose.Schema.ObjectId,
  },
  completed : {
    type : Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateCompleted: {
    type: Date,
    default: null
  }
});

taskSchema.virtual('taskId').get(function(){
  return this._id;
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
