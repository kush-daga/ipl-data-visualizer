import React from "react";
import { Switch } from "react-router-dom";
import HomeAway from "../components/HomeAway";
import Route from "./Route";

const Routes = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Switch>
        <Route exact path="/" component={HomeAway} />
      </Switch>
    </div>
  );
};

export default Routes;
