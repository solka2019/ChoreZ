import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertDialogSlide from './error-dialog';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null,
			error: null,
			registrationCompleted:false
		};

		this.onRegistrationCompleted = this.onRegistrationCompleted.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	onRegistrationCompleted() {
		if(this.state.registrationCompleted)
		{
			this.setState({ //redirect to login page
				redirectTo: '/login'
			});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(this.state.username);
		event.preventDefault();
		this.setState({
			error: null,
			redirectTo: null
		});

		//request to server to add a new parent's username/password
		axios.post('/parent/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response);
				if (!response.data.error) {
					console.log('successful signup');
					this.setState({
						registrationCompleted: true
					});
					
				} else {
					this.setState({
						error: "Username already taken!"
					});
				}
			}).catch(error => {
				console.log('signup error: ');
				console.log(error);
				this.setState({
					error: error
				});
			});
	}

render() {
	if (this.state.redirectTo) {
		return ( 
			<div>
				<Redirect to={{ pathname: this.state.redirectTo }} />
			</div>
		)
	} else {
		return (
			<div className="SignupForm">

				{ this.state.registrationCompleted  &&  <AlertDialogSlide onRegistrationCompleted={this.onClose} title="Registration completed" message="User created. Please, login now." />}
				{ this.state.error  &&  <AlertDialogSlide title="Unable to register" message={this.state.error} />}
				
				<h4>Sign up</h4>
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
							type="submit"
						>Sign up</button>
					</div>
				</form>
			</div>
		)
	}
}
}

export default Signup;
