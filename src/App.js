import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";
import "./App.css";
const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;