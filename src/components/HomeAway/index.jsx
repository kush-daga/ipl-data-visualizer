import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTeamHomeWinsData } from "../../utils/helpers";
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
import { Container, Card, GraphContainer } from "./styles";

export default function Home() {
  const data = useSelector((state) => state.app.data);
  const [teamHomeWinsData, setTeamHomeWinsData] = useState([]);
  const [teamWithMaxHomeWins, setTeamWithMaxHomeWins] = useState(null);
  const [teamWithMaxHomeLosses, setTeamWithMaxHomeLosses] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //We got team code for each team.
    //We got homeGroundToTeam code map
    //Filter Data ...
    // console.log(homeGroundToTeamCodeMap, teamNameToCodeMap);

    //This will populate teamHomeWinsData
    getTeamHomeWinsData(
      data,
      homeGroundToTeamCodeMap,
      teamNameToCodeMap,
      setTeamHomeWinsData
    );
  }, [data]);

  //Set Max Home wins and Max Home losses data
  useEffect(() => {
    setLoading(true);
    if (teamHomeWinsData.length > 0) {
      //get Stats ...
      console.log(teamHomeWinsData);

      // getTeamWithMaxHomeWins();
      let currentTeamCodeWins = 0;
      let currentMaxWins = 0;
      let currentWinPercent = 0;
      teamHomeWinsData.forEach((team) => {
        if (team.homeWins > currentMaxWins) {
          currentMaxWins = team.homeWins;
          currentTeamCodeWins = team.code;
          currentWinPercent = (team.homeWins / team.homeMatches) * 100;
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
      teamHomeWinsData.forEach((team) => {
        if (team.homeLosses > currentMaxLosses) {
          currentMaxLosses = team.homeLosses;
          currentTeamCodeLosses = team.code;
          currentLossPercent = (team.homeLosses / team.homeMatches) * 100;
        }
      });
      setTeamWithMaxHomeLosses({
        code: currentTeamCodeLosses,
        losses: currentMaxLosses,
        percentLosses: currentLossPercent,
      });
    }
  }, [teamHomeWinsData]);

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
                  This is an overview on how home ground affects the game of a
                  team, and which teams performed the best in thier home grounds
                  and which performed the worst.
                </p>
              </div>
            </Card>
            <Card>
              <div>
                <h2>Max Wins in Home Ground</h2>
                <h3>
                  Team Name:{" "}
                  <span>
                    {!!teamWithMaxHomeWins &&
                      teamCodeToNameMap[teamWithMaxHomeWins.code]}
                  </span>
                </h3>
                <h3>
                  Number Of Wins in Home Ground:{" "}
                  <span>
                    {!!teamWithMaxHomeWins && teamWithMaxHomeWins.wins}
                  </span>
                </h3>
                <h3>
                  % Won out of all matches played at Home:{" "}
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
                <h2>Max Losses in Home Ground</h2>
                <h3>
                  Team Name:{" "}
                  <span>
                    {!!teamWithMaxHomeLosses &&
                      teamCodeToNameMap[teamWithMaxHomeLosses.code]}
                  </span>
                </h3>
                <h3>
                  Number Of Losses in Home Ground:{" "}
                  <span>
                    {!!teamWithMaxHomeLosses && teamWithMaxHomeLosses.losses}
                  </span>
                </h3>
                <h3>
                  % Loss out of all matches played at Home:{" "}
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
                data={teamHomeWinsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />

                <Bar
                  name="Losses in home"
                  dataKey="homeLosses"
                  stackId="a"
                  fill="#82ca9d"
                ></Bar>
                <Bar
                  name="Wins in home"
                  dataKey="homeWins"
                  stackId="a"
                  fill="#8884d8"
                >
                  <LabelList dataKey="name" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GraphContainer>
        </>
      )}
    </div>
  );
}
