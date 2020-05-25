const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const mongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const PORT = 8080;
var mongoose = require('mongoose');

// Route requires
const parentRoute = require('./routes/user');
const apiRoute = require('./routes/api');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
	// IN HEROKU
	app.use(express.static('client/build'));
  
	const path = require('path');
	app.get('*', (req,res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});

	// Sessions
	mongoose.connect(process.env.MONGOLAB_URI);

	app.use(
		session(
			{
				secret: "magic-secret-word", //pick a random string to generate hash
				store: new mongoStore({ mongooseConnection: mongoose.connection }),
				resave: false,
				saveUninitialized: false
			}
		)
	);
}
else {

	// NOT IN HEROKU
	// Sessions
	app.use(
		session(
			{
				secret: "magic-secret-word", //pick a random string to generate hash
				store: new mongoStore({ mongooseConnection: dbConnection }),
				resave: false,
				saveUninitialized: false
			}
		)
	);
}

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/parent', parentRoute);
app.use('/api', apiRoute);

// Starting Server 
app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
