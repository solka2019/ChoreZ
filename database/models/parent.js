const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const childModel = require("./child");
const taskModel = require("./task");
const bcrypt = require('bcryptjs');


const parentSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Enter your name"
  },
  name : {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required : "Enter your password"
  },
  childIds: {
    type: [ mongoose.Schema.ObjectId ]
  },
  taskIds : {
    type: [ mongoose.Schema.ObjectId ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

parentSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

parentSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/parent.js =======NO PASSWORD PROVIDED=======');
		next();
	} else {
		console.log('models/parent.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password);
		next();
	}
});

parentSchema.virtual('parentId').get(function(){
  return this._id;
});

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;

// let newParent = new Parent(
//   {
//     username: "mom",
//     name: "mom",
//     password: "mom",
//     childIds: [  ],
//     taskIds: [  ]
//   }
// );

// let newChild = new childModel(
//   {
//     name: "kid",
//     parentId: newParent.parentId,
//     taskIds: [ ]
//   }
// );

// let newTask1 = new taskModel(
//   {
//     task: "Do dishes",
//     value: 5,
//     childId: newChild.childId,
//     parentId: newParent.parentId,
//     completed: false
//   }
// );

// let newTask2 = new taskModel(
//   {
//     task: "Do dishes",
//     value: 5,
//     childId: newChild.childId,
//     completed: false
//   }
// );

// newParent.childIds = [ newChild.childId ];
// newParent.taskIds = [ newTask1.taskId, newTask2.taskId ];
// newChild.taskIds = [newTask1.taskId, newTask2.taskId];

// newChild.save();
// newTask1.save();
// newTask2.save();
// newParent.save();
