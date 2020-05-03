const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskModel = require("./task");

const childSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your chid's name"
  },
  tasks: {
    type: [ taskModel.schema ]
  } 
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;