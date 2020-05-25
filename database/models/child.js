const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const taskModel = require("./task");


const childSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your chid's name"
  },
  taskIds: {
    type: [ mongoose.Schema.ObjectId ]
  },
  parentId:
  {
    type: mongoose.Schema.ObjectId
  } 
});

childSchema.virtual('childId').get(function(){
  return this._id;
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
