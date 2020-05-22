import React, { Component } from "react";
import ListTasks from "./ListTasks";
import AlertDialogSlide from './error-dialog';
import axios from 'axios';
import { FaDollarSign } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

class ChildrenChores extends Component {
    constructor(props) {
        super(props);

        this.onClearedTasks = this.onClearedTasks.bind(this);
        this.onDeletedChild = this.onDeletedChild.bind(this);
    }

    onDeletedChild(tasksToDelete, childId)
    {
        if(childId !== 0) {
            // need to send multiple requests to the server, and only at the end refresh the screen
            // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
            let referenceFromClass = this;
            let allRequests = [];

            if((typeof tasksToDelete !== 'undefined') && tasksToDelete.length > 0) {
                allRequests = tasksToDelete.map( task => {
                    console.log("onClearedTasks sending server /api/taskdeleted call for task: " + task.task);                 
                    let request = axios.post('/api/taskdeleted', {
                        taskId: task._id
                    });
                    return (request);});
            }
            // Need now to add the axios request to delete the child
            // https://stackoverflow.com/questions/6254050/how-to-add-an-object-to-an-array
            let delChildRequest = axios.post('/api/childdeleted', {
                    childId: childId
                });

            allRequests.push(delChildRequest);

            axios.all(allRequests).then( ()=> {
                // now call the refresh at the home, so the appState is up-to-date
                console.log("onDeletedChild calling refreshTasksByParent...");
                referenceFromClass.props.appState.refreshTasksByParent(this.props.appState.user._id);
                referenceFromClass.props.appState.refreshChildrenByParent(this.props.appState.user._id);
                console.log("onDeletedChild refreshTasksByParent completed...");
            });
        }
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
            let childId = child._id;
            // build a list of the tasks that this child has completed, and calculate the total
            const childTasks = this.props.appState.tasks.filter(task => {
                if(task.completed === true && task.childId === child._id) {
                    totalValue += task.value;
                    return (task);
                }
            });

            return (
                <div>
                     <form>
                        <div className="form-row">
                            <div className="col-7">
                                <input type="text" value={child.name} readOnly/>    
                            </div>

                            <FaMinus className="faicons" id={childId} onClick={ () => {thisReferenceFromClass.onDeletedChild(childTasks, childId)}} />
                            
                            <div className="col">
                                <input type="text" className='total-points' value={totalValue} readOnly />
                            </div>

                            <FaDollarSign className="faicons" onClick={ () => {thisReferenceFromClass.onClearedTasks(childTasks)}} />

                        </div>


                        {  (childTasks.length > 0) && <ListTasks items={childTasks} /> }

                    </form>
                </div>
                
                
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