import React, { Component } from "react";
import DatePickerPage from './component/DatePickerPage'
import NavbarPage from './component/NavbarPage';
// import { TodoProvider } from "./component/utils/GlobalState";


// import Login from './component/Form/Login';

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import "./App.css";
import Chores from "./component/Chores";

function App() {
  return (
    <div>
      <NavbarPage></NavbarPage>
      <DatePickerPage></DatePickerPage>
      <Chores></Chores>
    </div>
    // <Router>
    //   <div>
    //     {/* <TodoProvider>
    //       <NavbarPage />
          
    //       <Switch>
    //         {/* <Route exact path="/" component={Home} />
    //         <Route exact path="/home" component={Home} /> */}
    //         {/* <Route exact path="/chores" component={myChores} />
    //         <Route exact path="/login/:id" component={Login} /> */}
            
    //       </Switch>
    //     </TodoProvider> */}
    //     <
    //   </div>
    // </Router>
  );
}


export default App;
