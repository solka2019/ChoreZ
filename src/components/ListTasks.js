import React from "react";
import "./ListTasks.css";
import FlipMove from "react-flip-move";

// icons: https://react-icons.github.io/react-icons/#/icons/fa
// https://stackoverflow.com/questions/56351531/how-to-find-icon-names-for-font-awesome-to-import-with-react
// find the names to use here: https://react-icons.github.io/react-icons/#/
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function ListTasks(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    let addItem = true;

    if (
      typeof props.incompleteOnly !== "undefined" &&
      props.incompleteOnly &&
      item.completed === true
    ) {
      addItem = false;
    }

    if (
      typeof props.completeOnly !== "undefined" &&
      props.completeOnly &&
      item.completed === false
    ) {
      addItem = false;
    }

    if (addItem) {
      return (
        <div
          className="text-truncate"
          contentEditable="true"
          key={item._id}
          style={{
            fontSize: "2.2em",
            color: "blue",
            fontFamily: "arial",
            display: "inline-block",
            minWidth: "100px",
            maxWidth: "500px",
          }}
          data-toggle="tooltip"
          data-placement="top"
          title={item.task}
        >
          <p>
              {item.task}
            {typeof props.onDeleteTask !== "undefined" && (
              <FaTrash
                className="faicons"
                onClick={() => {
                  props.onDeleteTask(item._id);
                }}
              />
            )}
          </p>

          <p>
            <input className= 'points'
              type="text"
              id={"value" + item._id}
              value={item.value}
              readOnly
            />

            <span>
              {typeof props.onCompleteTask !== "undefined" && (
                <FaCheckCircle
                  className="faicons"
                  onClick={() => {
                    props.onCompleteTask(item._id);
                  }}
                />
              )}
            </span>
          </p>
        </div>
      );
    }
  });

  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListTasks;
