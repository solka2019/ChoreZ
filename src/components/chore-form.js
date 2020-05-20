import React, { Component } from "react";
import AlertDialogSlide from './error-dialog';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

class ChoreForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: '',
            value: 0,
            parentId: null,
            message: null
        };

        this.onChoreSubmit = this.onChoreSubmit.bind(this);
        this.setUpdateTask = this.setUpdateTask.bind(this);
        this.onChoreCreateMessageClose = this.onChoreCreateMessageClose.bind(this);
    }

    onChoreCreateMessageClose()
    {
        this.setState({
            message: null
        });
    }

    onChoreSubmit()
    {
        if((typeof this.state.task === 'undefined') || this.state.task.length === 0 ||
           (typeof this.state.task === 'undefined') || this.state.value.lenght === 0) {
            return;
        }

        let parentId = this.props.appState.user._id;
        let task = this.state.task;
        let value = this.state.value;

        let referenceFromClass = this;

        let newTask = {
            task: task,
            value: value,
            parentId: parentId
        };

        // Create a new child in the server
        axios.post('/api/createtask', { 
            task: newTask
          }).then(function (response) {

                console.log("onChoreSubmit response: " + response );
                if (response.data.error) {
                    referenceFromClass.setState({
                        task: '',
                        value: 0,
                        parentId: null,
                        message: response.data.error
                    });

                    // return and don't refresh the lists because nothing was added
                    return;                   
                }

                referenceFromClass.setState({
                    task: '',
                    value: 0,
                    parentId: null
                });

                // Refresh the parent screen, which will re-load the other components
                referenceFromClass.props.appState.refreshListForParentScreen(parentId);
        });
    }

    setUpdateTask(text){
        this.setState({
            task: text
        });  
    }

    setUpdateValue(text){
        this.setState({
            value: text
        });  
    }

    render() {
        // the following reference for the class' "this" is needed inside the annonymous method, since it
        // will not "know" if we simply use this. there!
        let thisReferenceFromClass = this; 

        return(
            
            <div>
                { this.state.message && <AlertDialogSlide message={this.state.message} onClose={this.onChoreCreateMessageClose} title="Error!"/>}

                {/* <p>Enter the new chore information:</p> */}
                
                <p>chore:</p>
                <input type="text"  value={this.state.task} onChange={(e)=>{
                     this.setUpdateTask(e.target.value)}}/>

                <p>value:</p>
                <input type="text"  value={this.state.value} onChange={(e)=>{
                     this.setUpdateValue(e.target.value)}}/>
    
                <FaPlus className="faicons" onClick={ () => {thisReferenceFromClass.onChoreSubmit()}}/>
            
            </div>
        );
    }
}
export default ChoreForm;