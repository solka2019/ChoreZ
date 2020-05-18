import React, { Component } from "react";
import AlertDialogSlide from './error-dialog';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

class ChildForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: null
        };

        this.onChildSubmit = this.onChildSubmit.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
        this.onChildCreateMessageClose = this.onChildCreateMessageClose.bind(this);
    }

    setUpdate(text){
        this.setState({
            name: text
        });  
    }

    onChildCreateMessageClose()
    {
        this.setState({
            message: null
        });
    }

    onChildSubmit()
    {
        if((typeof this.state.name === 'undefined') || this.state.name.length === 0) {
            return;
        }

        let parentId = this.props.appState.user._id;
        let name = this.state.name;
        let referenceFromClass = this;

        // Create a new child in the server
        axios.post('/api/createchild', { 
            name: name,
            parentId: parentId
          }).then(function (response) {

                console.log("onChildSubmit response: " + response );
                if (response.data.error) {
                    referenceFromClass.setState({
                        name:'',
                        message: response.data.error
                    });
                    // return and don't refresh the lists because nothing was added
                    return;                   
                }

                referenceFromClass.setState({
                    name:''
                });

                // Refresh the parent screen, which will re-load the other components
                referenceFromClass.props.appState.refreshListForParentScreen(parentId);
        });

    }

    render() {
        // the following reference for the class' "this" is needed inside the annonymous method, since it
        // will not "know" if we simply use this. there!
        let thisReferenceFromClass = this; 

        return(
            
            <div>
                { this.state.message && <AlertDialogSlide message={this.state.message} onClose={this.onChildCreateMessageClose} title="Error!"/>}

                <p>Enter the new child name:</p>
                
                <input type="text"  value={this.state.name} onChange={(e)=>{
                     this.setUpdate(e.target.value)}}/>
                
                <FaPlus className="faicons" onClick={ () => {thisReferenceFromClass.onChildSubmit()}}/>
            
            </div>
        );
    }
}

export default ChildForm;