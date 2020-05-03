const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("task.js");

const childSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your chid's name"
  },
  tasks: [ Task ]
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
