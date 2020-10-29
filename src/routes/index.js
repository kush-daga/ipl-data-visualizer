import React from "react";
import { Switch } from "react-router-dom";
import HomeAway from "../components/HomeAway";
import SeasonWinners from "../components/SeasonWinners";
import TossVsHome from "../components/TossVsHome";
import MOMAnalysis from "../components/MOMAnalysis";

import Route from "./Route";

const Routes = () => {
	return (
		<div style={{ overflowX: "hidden" }}>
			<Switch>
				<Route exact path="/manOfTheMatch" component={MOMAnalysis} />
				<Route exact path="/homeAwayToss" component={TossVsHome} />
				<Route exact path="/seasonWinners" component={SeasonWinners} />
				<Route exact path="/homeAway" component={HomeAway} />
				<Route exact path="/" component={HomeDash} />
			</Switch>
		</div>
	);
};

export default Routes;

const HomeDash = () => {
	return <div>Hello</div>;
};
