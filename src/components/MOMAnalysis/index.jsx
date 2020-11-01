import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import SearchField from "react-search-field";
import { debounce } from "lodash";
import {
	divideDataYearWise,
	getMostMom,
	setMomDataHelper,
} from "../../utils/helpers";
import { SearchDropdown } from "./styles";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useCallback } from "react";
import { Card, Container } from "../../styles/globals";
import useWindowSize from "../../hooks/useWindowSize";
export default function MOMAnalysis() {
	const data = useSelector((state) => state.app.data);
	const [momData, setMomData] = useState({});
	const [maxMomData, setMaxMomData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [active, setActive] = useState(null);
	const [activeResult, setActiveResult] = useState(null);
	const windowSize = useWindowSize();
	useEffect(() => {
		if (data.length > 0) {
			const seasonWiseData = divideDataYearWise(data);
			// console.log("Season wise data:", seasonWiseData);
			setMomDataHelper(seasonWiseData, setMomData, produce);
		}
	}, [data]);

	useEffect(() => {
		// console.log("Mom data", momData);
		if (Object.keys(momData).length > 0) {
			//get data for maximum man of the matches
			var maxData = getMostMom(momData);
			// console.log("max data", maxData);
			maxData.forEach((d) => {
				setMaxMomData((y) => {
					return produce(y, (copy) => {
						copy.push({ name: d[0], matches: d[1] });
					});
				});
			});
		}
	}, [momData]);

	useEffect(() => {
		if (maxMomData.length > 0) {
			// console.log(maxMomData);
			maxMomData.map((player) =>
				setChartData((p) => {
					return produce(p, (copy) => {
						var newObj = { name: player.name, matches: [] };
						Object.keys(player.matches).forEach((year) => {
							if (year !== "total_moms") {
								newObj["matches"].push({
									name: year,
									value: player.matches[year],
								});
							}
						});
						copy.push(newObj);
					});
				})
			);
		}
	}, [maxMomData]);

	const handleChange = useCallback(
		(e) => {
			setActiveResult(null);
			setActive(null);
			// console.log(find(maxMomData, (o) => o.name.includes(e)));
			if (e !== "" && e !== " " && e) {
				// console.log(
				// 	maxMomData.filter((player) => {
				// 		var name = player.name.toLowerCase();
				// 		var query = e.trim().toLowerCase();
				// 		return name.includes(query);
				// 	})
				// );
				setSearchResults(
					maxMomData.filter((player) => {
						var name = player.name.toLowerCase();
						var query = e.trim().toLowerCase();
						return name.includes(query);
					})
				);
			} else {
				setSearchResults([]);
			}
		},
		[maxMomData]
	);

	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#FF00F1",
		"#FFF00F",
		"#6d6d53",
		"#33ffe4",
	];

	return (
		<div>
			{maxMomData.length > 0 ? (
				<div>
					<Container column>
						<Container>
							<Card>
								<div>
									<h2>Information</h2>
									<p>
										This is the analysis of the most Man of the matches bagged
										by a player ever. You can also search for player wise
										statistics from year <span>2008-2017</span>
									</p>
								</div>
							</Card>
							<Card>
								<div>
									<h2>Top 5 Players</h2>
									<p>
										{maxMomData.slice(0, 5).map((player, index) => {
											return (
												<>
													<span key={index}>{player.name} </span>-
													{player.matches.total_moms} man of the matches!
													<br />
												</>
											);
										})}
										<br />
										<span>Thier graphs are given below!</span>
									</p>
								</div>
							</Card>
						</Container>
						<Container>
							<Card wrap>
								{chartData.length > 0
									? chartData.slice(0, 5).map((player) => {
											return (
												<div
													style={{
														width: windowSize.width > 1000 ? "33%" : "100%",
														height: "300px",
													}}
													key={player.name}
												>
													<p>
														<span>{player.name}</span>
													</p>
													<ResponsiveContainer>
														<PieChart>
															<Pie
																isAnimationActive={true}
																data={player.matches}
																cx={100}
																cy={100}
																outerRadius={50}
																fill="#8884d8"
																label
															>
																{data.map((entry, index) => (
																	<Cell
																		key={`cell-${index}`}
																		fill={COLORS[index % COLORS.length]}
																	></Cell>
																))}
															</Pie>
															<Tooltip />
														</PieChart>
													</ResponsiveContainer>
												</div>
											);
									  })
									: "Loading"}
							</Card>
						</Container>
						<Container column>
							<h2 style={{ marginBottom: 0 }}>Search for any player</h2>
							<div
								style={{
									marginBottom: 0,
									width: "100% !important",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<SearchField
									placeholder="Search for Player"
									onChange={debounce(handleChange, 300)}
									style={{ marginBottom: 0, width: "100% !important" }}
								/>
								<SearchDropdown>
									{searchResults.slice(0, 5).map((result, index) => {
										return (
											<li
												style={{
													background: `${
														active === index ? "#f1f2f6" : "inherit"
													}`,
												}}
												onClick={() => {
													setSearchResults([]);
													setActive(index);
													setActiveResult(result);
												}}
												key={index}
											>
												{result.name}
											</li>
										);
									})}
								</SearchDropdown>
							</div>
						</Container>
						<Container>
							<Card>
								<div>
									<h2>Search for the player to view stats</h2>
									{activeResult !== null ? (
										<>
											<p>
												Results for <span>{activeResult.name}</span> <br />
												Total Man of the Matches:{" "}
												<span>{activeResult.matches.total_moms}</span> <br />
												<br />
												<br />
												<span>Man of the Match data year wise - </span> <br />
												<br />
											</p>
											{Object.keys(activeResult.matches).map((year) => {
												if (year !== "total_moms")
													return (
														<div key={year}>
															<p>
																Year: <span>{year}</span> ; Man of the matches:{" "}
																<span>{activeResult.matches[year]}</span>
																<br />
															</p>
														</div>
													);
											})}
										</>
									) : null}
								</div>
							</Card>
						</Container>
					</Container>
				</div>
			) : (
				"Loading"
			)}
		</div>
	);
}
