const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Child = require("child.js");
const Task = require("task.js");

const parentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your name"
  },
  children: [ Child ],
  tasks : [ Task ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
