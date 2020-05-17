import React from 'react';
import './ListTasks.css';
import FlipMove from 'react-flip-move';

// icons: https://react-icons.github.io/react-icons/#/icons/fa
// https://stackoverflow.com/questions/56351531/how-to-find-icon-names-for-font-awesome-to-import-with-react
import { FaCheckCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function ListTasks(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return (
       <div className="list" key={item._id}>
            <p>
                <input type="text" id={"task"+item._id} value={item.task} readOnly/>
                <input type="text" id={"value"+item._id} value={item.value} readOnly/>
                <span>
                    { 
                        (typeof props.onCompleteTask !== 'undefined') && <FaCheckCircle onClick={() => {
                            props.onCompleteTask(item._id)
                        }} />
                    }  
                    
                    { 
                        (typeof props.onDeleteTask !== 'undefined') && <FaTrash onClick={() => {
                            props.onDeleteTask(item._id)
                        }} />
                    }  

                </span>
            </p>
     
    </div>);
   });

    return ( 
        <div>
            <FlipMove duration={300} easing="ease-in-out">
                {listItems}
            </FlipMove>
        </div>);
  }

  export default ListTasks;