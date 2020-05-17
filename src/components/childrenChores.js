import React, { Component } from "react";
import ListTasks from "./ListTasks";
import AlertDialogSlide from './error-dialog';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class ChildrenChores extends Component {
    constructor(props) {
        super(props);

        this.onPaidTasks = this.onClearedTasks.bind(this);
    }

    onClearedTasks()
    {

    }

    render() {
        let totalValue = 0;
        const childrenAndChores = this.props.appState.children.map(child => {
            // build a list of the tasks that this child has completed, and calculate the total
            const childsTasks = this.props.appState.tasks.map(task => {
                if(task.completed === true && task.childId === child._id) {
                    totalValue += task.value;
                    return (task);
                }
            });

            return (
                <div>
                    {child.name}
                    {totalValue}
                    {
                        childsTasks.lenght > 0 && <ListTasks items={childsTasks} />
                    }
                </div>
            );
        });

        return(
            <div>
                {childrenAndChores}
            </div>
        );
    }

}

export default ChildrenChores;