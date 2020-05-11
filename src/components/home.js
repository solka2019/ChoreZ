import React, { Component } from "react";
import ListTasks from "./ListTasks";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class Home extends Component {
    constructor() {
        super();
    }
    render() {
        const imageStyle = {
            width: 400
        };

        console.log(this.props.appState.username);
        return ( 
            <div>
                <p> This is the main screen for our Child Chores app</p>
                {/* <img style={imageStyle} src="../resources/img/logono.png" /> */}
                { this.props.appState.tasks && <ListTasks items={this.props.appState.tasks} /> }
            </div>
        );
    }
}

export default Home;