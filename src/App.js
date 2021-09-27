import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Switch>
        <Route to="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
