import { teamCodeToNameMap, teamNameToCodeMap } from "./maps";
import { groupBy } from "lodash";

export const getTeamHomeWinsData = (
  data,
  getHomeGround,
  getTeamCode,
  setNewData
) => {
  const temp = [
    { code: 0, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 1, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 2, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 3, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 4, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 5, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 6, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 7, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 8, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 9, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 10, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 11, homeWins: 0, homeLosses: 0, homeMatches: 0 },
    { code: 12, homeWins: 0, homeLosses: 0, homeMatches: 0 },
  ];
  /* 
    temp = [
        {code: 0, homeWins: 0, homeLosses: 0, homeMatches: 0},

    ]
  */
  temp.forEach((team) => {
    let teamName = teamCodeToNameMap[team.code];
    team["name"] = teamName;
  });
  data.forEach((match) => {
    let team1Code = getTeamCode[match.team1];
    let team2Code = getTeamCode[match.team2];
    let winningTeamCode = getTeamCode[match.winner];
    let ground = match.city;
    let homeGroundTeam1 = getHomeGround[team1Code]; // Team 1 home grounds
    let homeGroundTeam2 = getHomeGround[team2Code]; //Team 2 home grounds
    let isTeam1Home = homeGroundTeam1.includes(ground); //Get if it was home for team 1
    let isTeam2Home = homeGroundTeam2.includes(ground); //get if it was home for team 2
    let isTeam1Winner = team1Code === winningTeamCode;
    let isTeam2Winner = team2Code === winningTeamCode;
    //IF TEAM 1 WAS THE HOME TEAM
    if (isTeam1Home) {
      //IF TEAM 1 WAS WINNER
      if (isTeam1Winner) {
        // Winning team Home ground
        temp.forEach((team) => {
          if (team.code === team1Code) {
            team.homeWins = team.homeWins + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      } else {
        // Losing team Home ground
        temp.forEach((team) => {
          if (team.code === team1Code) {
            team.homeLosses = team.homeLosses + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      }
    } else if (isTeam2Home) {
      //IF TEAM 2 WAS WINNER
      if (isTeam2Winner) {
        // Winning team Home ground
        temp.forEach((team) => {
          if (team.code === team2Code) {
            team.homeWins = team.homeWins + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      } else {
        // Losing team Home ground
        temp.forEach((team) => {
          if (team.code === team2Code) {
            team.homeLosses = team.homeLosses + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      }
    } else {
      //   console.log("No team Home?");
      return;
    }
  });
  setNewData(temp);
};

//Get analysis of Home ground vs toss result
export const getTeamHomeTossWinsData = (
  data,
  getHomeGround,
  getTeamCode,
  setNewData
) => {
  const temp = [
    { code: 0, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 1, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 2, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 3, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 4, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 5, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 6, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 7, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 8, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 9, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 10, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 11, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
    { code: 12, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0 },
  ];
  /* 
    temp = [
        {code: 0, homeTossWins: 0, homeTossLosses: 0, homeMatches: 0},
    ]
  */
  temp.forEach((team) => {
    let teamName = teamCodeToNameMap[team.code];
    team["name"] = teamName;
  });
  data.forEach((match) => {
    let team1Code = getTeamCode[match.team1];
    let team2Code = getTeamCode[match.team2];
    let winningTeamCode = getTeamCode[match.toss_winner];
    let ground = match.city;
    let homeGroundTeam1 = getHomeGround[team1Code]; // Team 1 home grounds
    let homeGroundTeam2 = getHomeGround[team2Code]; //Team 2 home grounds
    let isTeam1Home = homeGroundTeam1.includes(ground); //Get if it was home for team 1
    let isTeam2Home = homeGroundTeam2.includes(ground); //get if it was home for team 2
    let isTeam1Winner = team1Code === winningTeamCode;
    let isTeam2Winner = team2Code === winningTeamCode;
    //IF TEAM 1 WAS THE HOME TEAM
    if (isTeam1Home) {
      //IF TEAM 1 WAS WINNER
      if (isTeam1Winner) {
        // Winning team Home ground
        temp.forEach((team) => {
          if (team.code === team1Code) {
            team.homeTossWins = team.homeTossWins + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      } else {
        // Losing team Home ground
        temp.forEach((team) => {
          if (team.code === team1Code) {
            team.homeTossLosses = team.homeTossLosses + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      }
    } else if (isTeam2Home) {
      //IF TEAM 2 WAS WINNER
      if (isTeam2Winner) {
        // Winning team Home ground
        temp.forEach((team) => {
          if (team.code === team2Code) {
            team.homeTossWins = team.homeTossWins + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      } else {
        // Losing team Home ground
        temp.forEach((team) => {
          if (team.code === team2Code) {
            team.homeTossLosses = team.homeTossLosses + 1;
            team.homeMatches = team.homeMatches + 1;
          }
        });
      }
    } else {
      //   console.log("No team Home?");
      return;
    }
  });
  setNewData(temp);
};

export const divideDataYearWise = (data) => {
  //Re validating data
  if (data.length > 0) {
    /*
     * USe lodash :)
     */

    //Get list of all the seasons.
    // const seasons = [...new Set(data.map((item) => item.season))].sort(
    //   (a, b) => a - b
    // ); // [2008,2009 ...]

    //Get object of arrays containing season wise data
    // {2008: [..], 2009: [..], ...}
    const seasonWise = groupBy(data, "season");
    return seasonWise;
  }
};

export const getTeamwiseData = (data) => {
  /*
		return - 
		{ 
			teamCode: {
				wins: 20,
				losses: 100,
				draws: 100,
				matches: 220,
			}
		}
	*/
  var teamData = {};
  if (data.length > 0) {
    data.forEach((match) => {
      const team1Code = teamNameToCodeMap[match.team1];
      const team2Code = teamNameToCodeMap[match.team2];
      const winningTeamCode = teamNameToCodeMap[match.winner];
      const isTeam1Winner = team1Code === winningTeamCode;
      const isTeam2Winner = team2Code === winningTeamCode;
      if (isTeam1Winner) {
        addWins(teamData, team1Code);
        addLosses(teamData, team2Code);
      } else if (isTeam2Winner) {
        addWins(teamData, team2Code);
        addLosses(teamData, team1Code);
      } else {
        addDraws(teamData, team1Code);
        addDraws(teamData, team2Code);
      }
    });
    return teamData;
  }
};

export const getGroundwiseData = (data) => {
  /*
		return - 
		{ 
			groundName: frequency
		}
	*/
  var groundData = {};
  if (data.length > 0) {
    data.forEach((match) => {
      const ground = match.city;
      groundData[ground] =
        typeof groundData[ground] === "undefined" ? 1 : groundData[ground] + 1;
    });
    return groundData;
  }
};

const addWins = (teamData, teamCode) => {
  if (teamData[teamCode]) {
    teamData[teamCode].wins += 1;
    teamData[teamCode].matches += 1;
  } else {
    teamData[teamCode] = {
      wins: 1,
      losses: 0,
      matches: 1,
      draws: 0,
      name: teamCodeToNameMap[teamCode],
    };
  }
};

const addLosses = (teamData, teamCode) => {
  if (teamData[teamCode]) {
    teamData[teamCode].losses += 1;
    teamData[teamCode].matches += 1;
  } else {
    teamData[teamCode] = {
      wins: 0,
      losses: 1,
      matches: 1,
      draws: 0,
      name: teamCodeToNameMap[teamCode],
    };
  }
};

const addDraws = (teamData, teamCode) => {
  if (teamData[teamCode]) {
    teamData[teamCode].draws += 1;
    teamData[teamCode].matches += 1;
  } else {
    teamData[teamCode] = {
      wins: 0,
      losses: 0,
      matches: 1,
      draws: 1,
      name: teamCodeToNameMap[teamCode],
    };
  }
};
