//Connect to Mongo database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// here is the tutorial on how to use mongoose that was used for this project
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

//27017 is the default mongoDB port
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/choresAppDB";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { 

        console.log('Connected to Mongo');
        
    },
    err => {
         console.log('error connecting to Mongo: ');
         console.log(err);         
        }
  );

module.exports = mongoose.connection;