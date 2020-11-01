import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	divideDataYearWise,
	getTeamwiseData,
	getGroundwiseData,
} from "../../utils/helpers";
import produce from "immer";
import { Card, Container } from "../../styles/globals";
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import useWindowSize from "../../hooks/useWindowSize";
export default function SeasonWinners() {
	//gfet data
	const data = useSelector((state) => state.app.data);
	const [yearWiseTeamData, setYearWiseTeamData] = useState({});
	const [yearWiseGroundData, setYearWiseGroundData] = useState({});
	const [yearWiseMaxWins, setYearWiseMaxWins] = useState({});
	const [yearWiseMaxLosses, setYearWiseMaxLosses] = useState({});
	const [yearWiseTeamChartData, setYearWiseTeamChartData] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedYear, setSelectedYear] = useState("2008");
	useEffect(() => {
		if (data.length > 0) {
			//Data loaded

			/*-[x] Get year wise data
				- [x]  Get team wise data
					- [x] Wins
					- [x] Losses
				- [x] Get Ground data
					- [x] Frequency of City
				- [x] Get team with most wins
				- [̶]̶ G̶e̶t̶ t̶h̶e̶ g̶r̶o̶u̶n̶d̶ m̶o̶s̶t̶ p̶l̶a̶y̶e̶d̶ o̶n̶
				- [] Create Ui
		 */

			const seasonWiseData = divideDataYearWise(data);
			Object.keys(seasonWiseData).forEach((year) => {
				setYearWiseTeamData((y) => {
					return produce(y, (copy) => {
						copy[year] = getTeamwiseData(seasonWiseData[year]);
					});
				});
				setYearWiseGroundData((y) => {
					return produce(y, (copy) => {
						copy[year] = getGroundwiseData(seasonWiseData[year]);
					});
				});
			});
		}
	}, [data]);

	useEffect(() => {
		// console.log("Team Data", yearWiseTeamData);
		if (Object.keys(yearWiseTeamData).length > 0) {
			Object.keys(yearWiseTeamData).forEach((year) => {
				// console.log(yearWiseTeamData[year]);
				let temp = [];
				Object.keys(yearWiseTeamData[year]).forEach((team) => {
					// console.log(yearWiseTeamData[year][team]);
					const wins = yearWiseTeamData[year][team].wins;
					const matches = yearWiseTeamData[year][team].matches;
					const losses = yearWiseTeamData[year][team].losses;
					temp.push({
						...yearWiseTeamData[year][team],
						wins: ((wins / matches) * 100).toFixed(2),
						losses: ((losses / matches) * 100).toFixed(2),
					});
				});
				setYearWiseTeamChartData((data) => {
					return { ...data, [year]: temp };
				});
			});
		}
		Object.keys(yearWiseTeamData).forEach((year) => {
			var maxWins = 0;
			var teamWithMaxWins;
			var maxLosses = 0;
			var teamWithMaxLosses;
			Object.keys(yearWiseTeamData[year]).forEach((team) => {
				if (yearWiseTeamData[year][team].wins > maxWins) {
					maxWins = yearWiseTeamData[year][team].wins;
					teamWithMaxWins = yearWiseTeamData[year][team];
				}
			});
			Object.keys(yearWiseTeamData[year]).forEach((team) => {
				if (yearWiseTeamData[year][team].losses > maxLosses) {
					maxLosses = yearWiseTeamData[year][team].wins;
					teamWithMaxLosses = yearWiseTeamData[year][team];
				}
			});
			// console.log(maxWins, teamWithMaxWins);
			setYearWiseMaxWins((y) => {
				return produce(y, (copy) => {
					copy[year] = { teamWithMaxWins };
				});
			});

			setYearWiseMaxLosses((y) => {
				return produce(y, (copy) => {
					copy[year] = { teamWithMaxLosses };
				});
			});
		});
	}, [yearWiseTeamData]);

	useEffect(() => {
		console.log(yearWiseTeamChartData);
	}, [yearWiseTeamChartData]);

	useEffect(() => {
		if (
			Object.keys(yearWiseMaxLosses).length > 0 &&
			Object.keys(yearWiseMaxWins).length > 0 &&
			Object.keys(yearWiseGroundData).length > 0 &&
			Object.keys(yearWiseTeamData).length > 0
		)
			setLoading(false);
	}, [
		yearWiseMaxLosses,
		yearWiseMaxWins,
		yearWiseGroundData,
		yearWiseTeamData,
	]);

	const windowSize = useWindowSize();
	return (
		<div>
			<Container>
				<Card>
					<div>
						<h2>Info</h2>
						<p>
							This page is to analyze season wise data of winners from 2008-2017
							and various other analytics data related to Teams and Cities for
							matches.
						</p>
					</div>
				</Card>
				<Card>
					<div>
						<h2>Season Wise Winner Data</h2>
						<p>
							<span>2008 -</span> Rajasthan Royals
							<span> 2009 -</span> Deccan Chargers
							<br />
							<span>2010 -</span> Chennai Super Kings
							<span> 2011 -</span> Chennai Super Kings
							<br />
							<span>2012 -</span> Kolkata Knight Riders
							<span> 2013 -</span> Mumbai Indians
							<br />
							<span>2014 -</span> Kolkata Knight Riders
							<span> 2015 -</span> Mumbai Indians
							<br />
							<span>2016 -</span> Sunrisers Hyderabad
							<span> 2017 -</span> Mumbai Indians
							<br />
							<br />
							<br />
							Most Ipl Winning Team - <span>Mumbai Indians</span>
						</p>
					</div>
				</Card>
			</Container>
			<Container style={{ marginTop: "2em" }}>
				<Card>
					<div style={{ width: "100%" }}>
						<h2>Year Wise Team Data Graph</h2>
						<div style={{ width: "100%" }}>
							<p>
								<span>Choose Year</span>
							</p>
							<select
								id="yearSelector"
								value={selectedYear}
								style={{ padding: "0.5em" }}
								onChange={(e) => setSelectedYear(e.target.value)}
							>
								{Object.keys(yearWiseTeamChartData).map((key) => {
									return <option style={{ padding: "0.5em" }}>{key}</option>;
								})}
							</select>
							<div
								style={{
									width: windowSize.width > 1000 ? "80%" : "100%",
									minHeight: "600px",
									margin: "auto",
								}}
							>
								<ResponsiveContainer width="100%" height="100%">
									<ComposedChart
										data={yearWiseTeamChartData[selectedYear]}
										margin={{ top: 50, bottom: 20, left: 0 }}
									>
										<CartesianGrid stroke="#ffa502" />
										<XAxis dataKey="name" hide stroke="#ffa502" />
										<YAxis stroke="#ffa502" />
										<Tooltip contentStyle={{ color: "black" }} />
										<Legend verticalAlign="top" height={36} />
										<Bar
											dataKey="wins"
											name="win %"
											barSize={20}
											fill="#ffa502"
										/>
										<Area dataKey="matches" fill="#3742fa" stroke="#8884d8" />

										<Line dataKey="losses" name="loss %" stroke="#ff4757" />
									</ComposedChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>
				</Card>
			</Container>
			<Container style={{ marginTop: "2em" }}>
				<Card>
					<div>
						<h2>Year Wise Data of Teams with Maximum Wins</h2>
						<ul>
							{!loading &&
								Object.keys(yearWiseMaxWins).map((year) => {
									return (
										<li>
											<p>
												<span>{year}</span> <br />
												{yearWiseMaxWins[year].teamWithMaxWins.name} -{" "}
												{yearWiseMaxWins[year].teamWithMaxWins.wins} wins
											</p>
										</li>
									);
								})}
						</ul>
					</div>
				</Card>
				<Card>
					<div>
						<h2>Year Wise Data of Teams with Maximum Losses</h2>
						<ul>
							{!loading &&
								Object.keys(yearWiseMaxLosses).map((year) => {
									return (
										<li>
											<p>
												<span>{year}</span> <br />
												{yearWiseMaxLosses[year].teamWithMaxLosses.name} -{" "}
												{yearWiseMaxLosses[year].teamWithMaxLosses.losses}{" "}
												losses
											</p>
										</li>
									);
								})}
						</ul>
					</div>
				</Card>
			</Container>
		</div>
	);
}
