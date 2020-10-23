import React from "react";
import { Switch } from "react-router-dom";
import Home from "../components/Home";
import Route from "./Route";

const Routes = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Routes;
