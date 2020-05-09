import React, { Component } from "react";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import ReactDOM from "react-dom";

library.add(faTrash);

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };

    // This is test code just to see if we can create a new item in the list
    this.state.currentItem.key = "Test";
    this.state.currentItem.text = "This is a test task";
    // get the current item as the user has modified it
    const newItem = this.state.currentItem;
    //https://stackoverflow.com/questions/26505064/what-is-the-best-way-to-add-a-value-to-an-array-in-state
    const updatedItems = [...this.state.items, newItem];
    this.state = {
      items: updatedItems,
      currentItem: {
        text: "",
        key: "",
      },
    };

    console.log("number of items: " + this.state.items.length);
  }


render() {
    const imageStyle = {
      width: 300,
    };

    return (
      <div>
        <p> This is the main screen for our Child Chores app</p>

        <img style={imageStyle} src="../resources/ClipartKey_643659.png" />

        <ListItems items={this.state.items} />

      </div>
    );
  }
}

export default Home;
