import React, { Component } from "react";
import ListTasks from "./ListTasks";
import AlertDialogSlide from './error-dialog';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class ChildrenList extends Component {
    constructor(props) {
        super(props);

        this.onPaidTasks = this.onClearedTasks.bind(this);
    }

    onClearedTasks()
    {

    }
    render() {
        return(
            <div></div>
        );
    }
}

export default ChildrenList;