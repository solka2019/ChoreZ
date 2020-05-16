// Send data/state from Components: https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
// https://www.robinwieruch.de/react-pass-props-to-component#children-as-a-function

import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.getUser = this.getParentUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    // this refresh the state of list based on a parentId for the parent page
    this.refreshTasksByParent = this.refreshTasksByParent.bind(this);
    this.refreshChildrenByParent = this.refreshChildrenByParent.bind(this);
    // this refresh the state of lists that are used in a child page
    this.refreshChildTasks = this.refreshChildTasks.bind(this);
    this.refreshChildren = this.refreshChildren.bind(this);

    this.state = {
      loggedIn: false,
      username: null,
      name: null,
      children: [],
      tasks: [],
      date: null,
      refreshTasksByParent: this.refreshTasksByParent,
      refreshChildrenByParent: this.refreshChildrenByParent,
      refreshChildTasks: this.refreshChildTasks,
      refreshChildren: this.refreshChildren
    };

  }

  refreshTasksByParent(id) {
    axios.get('/api/tasksbyparent', {
        parentId: id
      }).then(response => {
        console.log('Get api response: ');
        console.log(response.data);
      if (response.data.tasks) {
        this.setState({
          tasks: response.data.tasks,
        });
      }});
  }

  refreshChildrenByParent(id) {
    axios.get('/api/childrenbyparent', {
      parentId: id
    }).then(response => {
      console.log('Get api response: ');
      console.log(response.data);
    if (response.data.children) {
      this.setState({
        children: response.data.children,
      });
    }});
  }

  refreshChildTasks()
  {
    axios.get('/api/childtasks', {
    }).then(response => {
      console.log('Get api response: ');
      console.log(response.data);
    if (response.data.tasks) {
      this.setState({
        tasks: response.data.tasks,
      });
    }});
  }

  refreshChildren()
  {
    axios.get('/api/children', {
    }).then(response => {
      console.log('Get api response: ');
      console.log(response.data);
    if (response.data.children) {
      this.setState({
        children: response.data.children,
      });
    }});
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
            <Home     appState={this.state}/>}
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
            <Signup appState={this.state}/>}
        />

      </div>
    );
  }
}

export default App;
