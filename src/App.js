import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser (userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/parent/').then(response => {
      console.log('Get parent response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get parent: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });

      } else {
        console.log('Get parent: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

        {/* greet user if logged in: */}
        {
          this.state.loggedIn &&
          <p>Welcome back, {this.state.username}!</p>
        }
        
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />

        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />

        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}

export default App;
