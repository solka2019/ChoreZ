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
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onChildMessageClose = this.onChildMessageClose.bind(this);
    }

    onChildMessageClose()
    {
        // Force a reload of the page
        // https://davidwalsh.name/react-force-render
        this.props.appState.refreshChildTasks();
        this.setState({
            message: null
        });
    }

    onCompleteTask(id)
    {
        if(!id)
        {
            // didn't get a taskId, exit
            return;
        }

        let thisReferenceFromClass = this;

        // Create an AJAX/AXIOS call to the server to set this task as completed
        // https://www.educative.io/edpresso/how-to-make-an-axios-post-request
        axios.post('/api/taskcompleted', {
            taskId: id
        }).then(function (response) {
            thisReferenceFromClass.setState({
                message: "Yay!!! You finished another chore!"
            });
        });
    }

    onDeleteTask(id)
    {
        if(!id)
        {
            // didn't get a taskId, exit
            return;
        }

        let thisReferenceFromClass = this;

        // Create an AJAX/AXIOS call to the server to set this task as completed
        // https://www.educative.io/edpresso/how-to-make-an-axios-post-request
        axios.post('/api/taskdeleted', {
            taskId: id
        }).then(function (response) {
            // only a parent can delete a task, so let's refresh the list now
            thisReferenceFromClass.props.appState.refreshTasksByParent(thisReferenceFromClass.appState.user._id);
        });
    }


    // In the function below we will render the home screen.
    // it will be different depending on the type of user: child or parent
    // for this reason, there is a check done in JSX in the beginning, and inside the 'if'
    // there will be the necessary HTML inside the main div to build the appropriate page.

    // TODO next version: each one of the pages for child and parent can be made into their own React component
    //                    this way we can make this class size smaller.

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

                        { /* Only render the task list if there is a list from the server, and passed by the App component*/}
                        { this.props.appState.tasks && 
                            <ListTasks items={this.props.appState.tasks} 
                                onDeleteTask={this.onDeleteTask} /> }
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