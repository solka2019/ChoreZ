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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
