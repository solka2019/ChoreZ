import React, { Component } from "react";
import ListTasks from "./ListTasks";
import AlertDialogSlide from './error-dialog';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FaDollarSign } from 'react-icons/fa';

class ChildrenChores extends Component {
    constructor(props) {
        super(props);

        this.onClearedTasks = this.onClearedTasks.bind(this);
    }

    onClearedTasks(tasksToDelete)
    {
        console.log("onClearedTasks called");
        if((typeof tasksToDelete !== 'undefined') && tasksToDelete.length > 0) {
            // need to send multiple requests to the server, and only at the end refresh the screen
            // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
            let referenceFromClass = this;
            let allRequests = tasksToDelete.map( task => {
                console.log("onClearedTasks sending server /api/taskdeleted call for task: " + task.task);                 
                let request = axios.post('/api/taskdeleted', {
                    taskId: task._id
                });

                return (request);});

            axios.all(allRequests).then( ()=> {
                // now call the refresh at the home, so the appState is up-to-date
                console.log("onClearedTasks calling refreshTasksByParent...");
                referenceFromClass.props.appState.refreshTasksByParent(this.props.appState.user._id);
                console.log("onClearedTasks refreshTasksByParent completed...");
            });
        }
    }

    render() {

        // the following reference for the class' "this" is needed inside the annonymous method, since it
        // will not "know" if we simply use this. there!
        let thisReferenceFromClass = this; 

        const childrenAndChores = this.props.appState.children.map(child => {
            let totalValue = 0;
            // build a list of the tasks that this child has completed, and calculate the total
            const childTasks = this.props.appState.tasks.filter(task => {
                if(task.completed === true && task.childId === child._id) {
                    totalValue += task.value;
                    return (task);
                }
            });

            return (
                <form>
                    <div className="form-row">
                        <div className="col-7">
                        <input type="text"  value={child.name} readOnly/>    
                        </div>

                        <div className="col">
                        <input type="text" className='total-points' value={totalValue} readOnly/>
                        </div>
                    

                 <div>
                    
                    <FaDollarSign className="faicons" onClick={ () => {thisReferenceFromClass.onClearedTasks(childTasks)}}/>
                    {  (childTasks.length > 0) && <ListTasks items={childTasks} /> }
                 </div>
                 </div>
                 </form>   
            );
        });
       
        // After we build the individual list of chores per child, we return it for the browser to render
        return(
            <div>
                {childrenAndChores}
            </div>
        );
    }

}

export default ChildrenChores;