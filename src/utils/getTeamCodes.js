//Map team names to team codes...
const teamToCodeMap = {};

//Returns a map for team names to a corresponding integer code.
export const mapTeamToCode = (data) => {
  console.log("Daata:", data);
  var currentIndex = 0;
  data.forEach((match) => {
    if (teamToCodeMap[match.team1] === undefined) {
      if (match.team1 === "Rising Pune Supergiant") {
        var temp = "Rising Pune Supergiants";
        if (teamToCodeMap[temp] === undefined) {
          teamToCodeMap[temp] = currentIndex++;
        }
      } else {
        teamToCodeMap[match.team1] = currentIndex++;
      }
    }
    if (teamToCodeMap[match.team2] === undefined) {
      if (match.team2 === "Rising Pune Supergiant") {
        var temp = "Rising Pune Supergiants";
        if (teamToCodeMap[temp] === undefined) {
          teamToCodeMap[temp] = currentIndex++;
        }
      } else {
        teamToCodeMap[match.team2] = currentIndex++;
      }
    }
  });
  return teamToCodeMap;
};
