import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTeamHomeTossWinsData } from "../../utils/helpers";
import {
	homeGroundToTeamCodeMap,
	teamNameToCodeMap,
	teamCodeToNameMap,
} from "../../utils/maps";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LabelList,
	ResponsiveContainer,
} from "recharts";
import { Container, Card, GraphContainer } from "../../styles/globals";
import useWindowSize from "../../hooks/useWindowSize";

export default function TossVsHome() {
	const data = useSelector((state) => state.app.data);
	const [teamHomeTossWinsData, setTeamHomeTossWinsData] = useState([]);
	const [teamWithMaxHomeWins, setTeamWithMaxHomeWins] = useState(null);
	const [teamWithMaxHomeLosses, setTeamWithMaxHomeLosses] = useState(null);
	const [loading, setLoading] = useState(false);
	const windowSize = useWindowSize();
	useEffect(() => {
		//We got team code for each team.
		//We got homeGroundToTeam code map
		//Filter Data ...
		// console.log(homeGroundToTeamCodeMap, teamNameToCodeMap);

		//This will populate teamHomeWinsData
		getTeamHomeTossWinsData(
			data,
			homeGroundToTeamCodeMap,
			teamNameToCodeMap,
			setTeamHomeTossWinsData
		);
	}, [data]);

	//Set Max Home wins and Max Home losses data
	useEffect(() => {
		setLoading(true);
		if (teamHomeTossWinsData.length > 0) {
			//get Stats ...
			console.log(teamHomeTossWinsData);

			// getTeamWithMaxHomeWins();
			let currentTeamCodeWins = 0;
			let currentMaxWins = 0;
			let currentWinPercent = 0;
			teamHomeTossWinsData.forEach((team) => {
				if (team.homeTossWins > currentMaxWins) {
					currentMaxWins = team.homeTossWins;
					currentTeamCodeWins = team.code;
					currentWinPercent = (team.homeTossWins / team.homeMatches) * 100;
				}
			});
			setTeamWithMaxHomeWins({
				code: currentTeamCodeWins,
				wins: currentMaxWins,
				percentWins: currentWinPercent,
			});

			// getTeamWithMaxHomeLosses();
			let currentTeamCodeLosses = 0;
			let currentMaxLosses = 0;
			let currentLossPercent = 0;
			teamHomeTossWinsData.forEach((team) => {
				if (team.homeTossLosses > currentMaxLosses) {
					currentMaxLosses = team.homeTossLosses;
					currentTeamCodeLosses = team.code;
					currentLossPercent = (team.homeTossLosses / team.homeMatches) * 100;
				}
			});
			setTeamWithMaxHomeLosses({
				code: currentTeamCodeLosses,
				losses: currentMaxLosses,
				percentLosses: currentLossPercent,
			});
		}
	}, [teamHomeTossWinsData]);

	useEffect(() => {
		if (teamWithMaxHomeLosses !== null && teamWithMaxHomeWins !== null) {
			console.log(teamWithMaxHomeWins);
			setLoading(false);
		}
	}, [teamWithMaxHomeLosses, teamWithMaxHomeWins]);
	//Make Ui
	return (
		<div>
			{loading ? (
				"Loading"
			) : (
				<>
					<Container>
						<Card>
							<div>
								<h2>Info</h2>
								<p>
									This is an overview on how home ground affects the toss result
									of a team, and which teams won the toss in thier home grounds
									and which did not. <br />
									<span>TL;DR -</span> There is no real affect of Home ground as
									you can see the ratio is almost 50:50 for each team. <br />
									<span>P.S. </span>Probability is real, chintu.
								</p>
							</div>
						</Card>
						<Card>
							<div>
								<h2>Max Toss Wins in Home Ground</h2>
								<h3>
									Team Name:{" "}
									<span>
										{!!teamWithMaxHomeWins &&
											teamCodeToNameMap[teamWithMaxHomeWins.code]}
									</span>
								</h3>
								<h3>
									Number Of Toss Wins in Home Ground:{" "}
									<span>
										{!!teamWithMaxHomeWins && teamWithMaxHomeWins.wins}
									</span>
								</h3>
								<h3>
									% Toss Won out of all matches played at Home:{" "}
									<span>
										<span>
											{!!teamWithMaxHomeWins &&
												teamWithMaxHomeWins.percentWins.toFixed(2)}{" "}
											%
										</span>
									</span>
								</h3>
							</div>
						</Card>
						<Card>
							<div>
								<h2>Max Toss Losses in Home Ground</h2>
								<h3>
									Team Name:{" "}
									<span>
										{!!teamWithMaxHomeLosses &&
											teamCodeToNameMap[teamWithMaxHomeLosses.code]}
									</span>
								</h3>
								<h3>
									Number Of Toss Losses in Home Ground:{" "}
									<span>
										{!!teamWithMaxHomeLosses && teamWithMaxHomeLosses.losses}
									</span>
								</h3>
								<h3>
									% Toss Loss out of all matches played at Home:{" "}
									<span>
										{" "}
										{!!teamWithMaxHomeLosses &&
											teamWithMaxHomeLosses.percentLosses.toFixed(2)}{" "}
										%
									</span>
								</h3>
							</div>
						</Card>
					</Container>
					<GraphContainer>
						<ResponsiveContainer width="100%" height={500}>
							<BarChart
								data={teamHomeTossWinsData}
								margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend verticalAlign="top" height={36} />

								<Bar
									name="Toss Losses in home"
									dataKey="homeTossLosses"
									stackId="a"
									fill="#ff4757"
								></Bar>
								<Bar
									name="Toss Wins in home"
									dataKey="homeTossWins"
									stackId="a"
									fill="#3742fa"
								>
									{windowSize.width > 1000 ? (
										<LabelList dataKey="name" position="top" />
									) : (
										""
									)}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</GraphContainer>
				</>
			)}
		</div>
	);
}
