import React, { Component } from "react";
import ListTasks from "./ListTasks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class Home extends Component {
    constructor(props) {
        super(props);

        this.onCompleteTask = this.onCompleteTask.bind(this);
    }

    onCompleteTask(taskId)
    {
        alert("delete test");
        if(!taskId)
        {
            // didn't get a taskId, exit
            return;
        }

        // Todo. Create an AJAX call to the server to set this task as completed
    }

    render() {
        const imageStyle = {
            width: 400
        };

        console.log(this.props.appState.username);

        if(this.props.appState.loggedIn){
            // Parent home screen
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
            // Children home screen
            return (
                <div>
                <p> This is the main screen for our Child Chores app</p>
                {/* <img style={imageStyle} src="../resources/img/logono.png" /> */}
                { this.props.appState.tasks && 
                    <ListTasks items={this.props.appState.tasks} 
                               onCompleteTask={this.onCompleteTask} /> }
            </div>
            );
        }
    }
}

export default Home;