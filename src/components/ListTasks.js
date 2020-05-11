import React from 'react';
import './ListTasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';

function ListTasks(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return (
       <div className="list" key={item.taskId}>
            <p>
            <input type="text" id={"task"+item.taskId} value={item.task} onChange={(e)=>{
                props.setUpdate(e.target.value,item.key)}}/>
            <input type="text" id={"value"+item.taskId} value={item.value} onChange={(e)=>{
                props.setUpdate(e.target.value,item.key)}}/>
            <span>  
                <FontAwesomeIcon className="faicons" onClick={() => {
                    props.deleteItem(item.key)
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