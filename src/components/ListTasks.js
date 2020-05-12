import React from 'react';
import './ListTasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';

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
                <FontAwesomeIcon className="faicons" onClick={() => {
                    props.onCompleteTask(item._id)
                }} icon="trash" />

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