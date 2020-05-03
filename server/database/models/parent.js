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
  password: {
    type: String,
    required : "Enter your password"
  },
  children: {
    type: [ childModel.schema ]
  },
  tasks : {
    type: [ taskModel.schema ]
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
		console.log('models/parent.js =======NO PASSWORD PROVIDED=======')
		next();
	} else {
		console.log('models/parent.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password);
		next();
	}
});

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
