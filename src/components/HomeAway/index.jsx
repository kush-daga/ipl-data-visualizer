import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTeamHomeWinsData } from "../../utils/helpers";
import { homeGroundToTeamCodeMap, teamNameToCodeMap } from "../../utils/maps";
export default function Home() {
  const data = useSelector((state) => state.app.data);
  const [teamHomeWinsData, setTeamHomeWinsData] = useState([]);

  useEffect(() => {
    //We also got team code for each team.
    //We got homeGroundToTeam code map
    //Filter Data ...
    console.log(homeGroundToTeamCodeMap, teamNameToCodeMap);
    getTeamHomeWinsData(
      data,
      homeGroundToTeamCodeMap,
      teamNameToCodeMap,
      setTeamHomeWinsData
    );
  }, [data]);

  useEffect(() => {
    console.log(teamHomeWinsData);
  }, [teamHomeWinsData]);

  //Create a new ds to Store teams homewins vs homelosses.
  //S̶a̶v̶e̶ t̶h̶a̶t̶ i̶n̶ R̶e̶d̶u̶x̶?̶

  return <div>Home Away Analysis</div>;
}
