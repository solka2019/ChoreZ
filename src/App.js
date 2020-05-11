// Send data/state from Components: https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf

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
      username: null,
      name: null,
      children: [],
      tasks: [],
      date: null
    };

    this.getUser = this.getParentUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getParentUser();
  }

  updateUser (userObject) {
    this.setState(userObject);
  }

  getParentUser() {
    axios.get('/parent/').then(response => {
      console.log('Get parent response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get parent: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          user: response.data.user,
          name: response.data.user.name,
          username: response.data.user.username,
          children: response.data.children,
          tasks: response.data.tasks,
          date: null
        });

      } else {
        console.log('Get parent: no user');
        this.setState({
          loggedIn: false,
          user: null,
          username: null,
          name: null,
          children: response.data.children,
          tasks: response.data.tasks,
          date: null
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
          render={() => 
            <Home appState={this.state}/>}
        />

        <Route
          path="/login"
          render={() =>
            <LoginForm appState={this.state}
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
