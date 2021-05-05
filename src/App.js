import React from "react";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
{/*import Resume from "./Resume";*/}

const App =() => {

  return (
    <>	

    <Switch>

		<Route exact to="/" component={Home} />  	
	{/*<Route to="/resume" component={Resume} />  */}

    </Switch>
      
    </>
  );
}

export default App;
