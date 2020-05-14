import React, { Component } from "react";
import ListTasks from "./ListTasks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AlertDialogSlide from './error-dialog';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

library.add(faTrash);

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            message: null,
            redirectTo: null
        };

        this.onCompleteTask = this.onCompleteTask.bind(this);
        this.onChildMessageClose = this.onChildMessageClose.bind(this);
    }

    onChildMessageClose()
    {
        // Force a reload of the page
        // TODO: we want to reload only the tasks
        this.setState({
            redirectTo: '/'
        });
    }

    onCompleteTask(id)
    {
        if(!id)
        {
            // didn't get a taskId, exit
            return;
        }

        let that = this;

        // Create an AJAX/AXIOS call to the server to set this task as completed
        // https://www.educative.io/edpresso/how-to-make-an-axios-post-request
        axios.post('/api/taskcompleted', {
            taskId: id
        }).then(function (response) {
            that.setState({
                message: "Yay!!! You finished another chore!"
            });
        });
    }

    render() {
        const imageStyle = {
            width: 400
        };

        console.log(this.props.appState.username);

        if (this.state.redirectTo) {
            return ( 
                <div>
                    <Redirect to={{ pathname: this.state.redirectTo }} />
                </div>
            )
        } else {
            if(this.props.appState.loggedIn){
                // ----------------------
                // Parent home screen
                // ----------------------

                return (
                    <div>
                    <p> This is the main screen for our Parent management of the app</p>
                    {/* <img style={imageStyle} src="../resources/img/logono.png" /> */}

                    { /* Only render the task list if there is a list from the server, and passed by the App component*/}
                    { this.props.appState.tasks && 
                        <ListTasks items={this.props.appState.tasks} 
                                onCompleteTask={this.onCompleteTask} /> }
                </div>
                );
            }
            else {
                // ----------------------
                // Children home screen
                // ----------------------

                return (
                    <div>
                        <p> This is the main screen for our Child Chores app</p>
                        {/* <img style={imageStyle} src="../resources/img/logono.png" /> */}
                        { this.state.message && <AlertDialogSlide message={this.state.message} onClose={this.onChildMessageClose} title="Great job!"/>}

                        { this.props.appState.tasks && 
                            <ListTasks items={this.props.appState.tasks} 
                                    onCompleteTask={this.onCompleteTask} /> }
                    </div>
                );
            }
        }      
    }
}

export default Home;