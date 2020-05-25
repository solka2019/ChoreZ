import React, { Component } from "react";
import ListTasks from "./ListTasks";
import ChildrenChores from "./childrenChores";
import ChildForm from "./child-form";
import ChoreForm from "./chore-form";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AlertDialogSlide from './error-dialog';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./home.css";
import kidsRunningImg from '../resources/img/kidsRunning.png';


//https://create-react-app.dev/docs/adding-bootstrap/
import 'bootstrap/dist/css/bootstrap.css';

// https://react-bootstrap.github.io/components/buttons/
import Button from 'react-bootstrap/Button';

library.add(faTrash);

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            dialogMessage: null,
            dialogTitle: null,
            redirectTo: null,
            currentChildName: '',
            currentChildId: ''
        };

        this.onCompleteTask = this.onCompleteTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onChildMessageClose = this.onChildMessageClose.bind(this);
        this.onChildSelected = this.onChildSelected.bind(this);
    }

    

    onChildSelected(id, name) {
        if (!id || !name ) {
            return;
        }

        this.setState({
            currentChildId: id,
            currentChildName: name
        });

        //this.forceUpdate();
    }

    onChildMessageClose() {
        // Force a reload of the page
        // https://davidwalsh.name/react-force-render
       
        this.setState({
            dialogMessage: null,
            dialogTitle: null
        });

        this.props.appState.refreshChildTasks();
    }

    onCompleteTask(id)
    {
        if (!id)
        {
            // didn't get a taskId, exit
            return;
        }

        let thisReferenceFromClass = this;

        // Create an AJAX/AXIOS call to the server to set this task as completed
        // https://www.educative.io/edpresso/how-to-make-an-axios-post-request
        axios.post('/api/taskcompleted', {
            taskId: id,
            childId: this.state.currentChildId
        }).then(function (response) {
            thisReferenceFromClass.setState({
                dialogMessage: "Yay!!! You finished another chore!",
                dialogTitle: "Great job!"
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
            thisReferenceFromClass.props.appState.refreshTasksByParent(thisReferenceFromClass.props.appState.user._id);
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
            );
        } else if (!this.props.appState.loggedIn && this.props.appState.children && 
                    this.props.appState.children.length > 0 && !this.state.currentChildName ) {
            // Need to show a screen for the kids to select which one they are
            let thisReferenceFromClass = this;
            const childrenSelectors = this.props.appState.children.map( child => {
                return (
                    <Button variant="primary" size="lg" className= 'kid-btn'
                        onClick={ () => {thisReferenceFromClass.onChildSelected(child._id, child.name)}}>{child.name}</Button>


                );
            });

            return (
                <div>
                    {/* <img style={imageStyle} src="{kidsRunningImg}"  /> */}
                    {childrenSelectors}
                </div>
            );

        } else {

            if(this.props.appState.loggedIn){

                // ----------------------
                // Parent home screen
                // ----------------------

                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                
                                <p className='lists' style={{fontSize: '1.5em', color: 'blue', fontFamily: 'arial'}} >
                                    
                                    List of incomplete chores: </p>

                                { /* Only render the task list if there is a list from the server, and passed by the App component*/}
                                { this.props.appState.tasks && 
                                    <ListTasks items={this.props.appState.tasks}
                                        incompleteOnly="true" 
                                        onDeleteTask={this.onDeleteTask} /> }

                            </div>
 
                            <div className="col-sm">
                                <p className='lists' style={{fontSize: '1.5em', color: 'blue', fontFamily: 'arial'}} >
                                    

                                    
                                    Create a new chore: </p>
                                <ChoreForm appState={this.props.appState} />
                                <p className='lists-create-child' style={{fontSize: '1.5em', color: 'blue', fontFamily: 'arial'}} >

                                   
                                    
                                    
                                    Create a new child: </p>
                                <ChildForm appState={this.props.appState} />
                           </div> 

                           <div className="col-sm">
                                
                                <p className='lists' style={{fontSize: '1.5em', color: 'blue', fontFamily: 'arial'}} >

                                    List of children and their completed chores: </p>

                                { this.props.appState.children &&
                                    <ChildrenChores appState={this.props.appState} />
                                }
                            </div>

                        </div>
                    </div>             
                );
            }
            else {

                // ----------------------
                // Children home screen
                // ----------------------

                // https://reactjs.org/docs/conditional-rendering.html
                if (this.state.currentChildName) {
                    return (
                        <div>
                            <img style={imageStyle} src={kidsRunningImg} />
                            <p className='hello-kid'>Hello {this.state.currentChildName}!!!</p>
                            {this.state.dialogMessage && 
                                <AlertDialogSlide message={this.state.dialogMessage} onClose={this.onChildMessageClose} title={this.state.dialogTitle}/>}
                            {this.props.appState.tasks && 
                                <ListTasks items={this.props.appState.tasks} onCompleteTask={this.onCompleteTask} />}
                        </div>
                    );
                }
                else {
                    return (null);
                }
            }
        }      
    }
}

export default Home;