import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertDialogSlide from './error-dialog';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            redirectTo: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit');

        this.setState({
            error: null,
        });
        
        axios
            .post('/parent/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ');
                console.log(response);
                if (response.status === 200) {
                    // update App.js state - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
                    this.props.updateUser({
                        loggedIn: true,
                        user: response.data.user,
                        username: response.data.user.username,
                        name: response.data.user.name,
                        children: response.data.children,
                        tasks : response.data.tasks,
                        date: response.data.date
                    });

                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    });
                }
            }).catch(err => {
                console.log('login error: ');
                console.log(err);
                if(err.response.status === 401 || err.response.status === 400)
                {
                    this.setState({
                        error: 'Wrong username or password.',
                        username:'',
                        password:''
                    });           
                }        
            });
    }

    render() {
        if (this.state.redirectTo) {
            return (<Redirect to={{ pathname: this.state.redirectTo }} />)
        } else {
            return (
                <div>
                    { this.state.error  &&  <AlertDialogSlide message={this.state.error} />}
                    <h4>Parent Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"                               
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm;
