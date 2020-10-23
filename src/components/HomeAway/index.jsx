import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { homeGroundToTeamCodeMap, teamNameToCodeMap } from "../../utils/maps";
export default function Home() {
  const data = useSelector((state) => state.app.data);
  useEffect(() => {
    //Filter Data ...
    console.log(homeGroundToTeamCodeMap, teamNameToCodeMap);
  }, []);

  return <div>Home Away Analysis</div>;
}
