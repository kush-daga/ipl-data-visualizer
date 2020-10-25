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
