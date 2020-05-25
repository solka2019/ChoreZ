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
  isPwdHashed: {
    type: Boolean,
    default: false
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
  },
  addTask: function (taskId) {
    if(!taskId) {
      return;
    }

    if((typeof this.taskIds === 'undefined')) {
      this.taskIds = [];
    }

    // https://www.geeksforgeeks.org/how-to-add-an-object-to-an-array-in-javascript/
    this.taskIds.push(taskId);
  },
  deleteTask: function (taskId) {
    if(!taskId || (typeof this.taskIds === 'undefined') || this.taskIds.length == 0) {
      return;
    }

    // https://love2dev.com/blog/javascript-remove-from-array/
    let idx = -1;
    for(let i=0; i < this.taskIds.length; i++) {
      if(this.taskIds[i].toString() === taskId.toString()) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      this.taskIds.splice(idx, 1);
    }
  },
  addChild: function (childId) {
    if(!childId) {
      return;
    }

    if((typeof this.childIds === 'undefined')) {
      this.childIds = [];
    }

    // https://www.geeksforgeeks.org/how-to-add-an-object-to-an-array-in-javascript/
    this.childIds.push(childId);
  },
  deleteChild: function (childId) {
    if(!childId || (typeof this.childIds === 'undefined') || this.childIds.length == 0) {
      return;
    }

    // https://love2dev.com/blog/javascript-remove-from-array/
    let idx = -1;
    for(let i=0; i < this.childIds.length; i++) {
      if(this.childIds[i].toString() === childId.toString()) {
        idx = i;
        break;
      }
    }

    if (idx > -1) {
      this.childIds.splice(idx, 1);
    }
  }
};

parentSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/parent.js =======NO PASSWORD PROVIDED=======');
		next();
	} else {
    if(!this.isPwdHashed) {
      console.log('models/parent.js hashPassword in pre save');
      this.password = this.hashPassword(this.password);
      this.isPwdHashed = true;
    }

		next();
	}
});

parentSchema.virtual('parentId').get(function(){
  return this._id;
});

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
