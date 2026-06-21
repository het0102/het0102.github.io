import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CustomCursor from "./CustomCursor";

const App = () => {
  return (
    <>
      <CustomCursor />
      <Switch>
        <Route to="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
