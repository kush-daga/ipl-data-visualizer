//All the home ground data mapped with the team code of the teams.

export const homeGroundToTeamCodeMap = {
  0: ["Hyderabad"],
  1: ["Bangalore"],
  2: ["Mumbai"],
  3: ["Pune"],
  4: ["Rajkot"],
  5: ["Kolkata"],
  6: ["Indore", "Chandigarh"],
  7: ["Delhi"],
  8: ["Chennai"],
  9: ["Jaipur"],
  10: ["Hyderabad"],
  11: ["Kochi"],
  12: ["Pune"],
};

//Generated using script in ./getTeamCodes.js
//Some data have "Rising Pune Supergiants" whereas some have" Rising Pune Supergiant"
//So giving them the same code...

export const teamNameToCodeMap = {
  "Chennai Super Kings": 8,
  "Deccan Chargers": 10,
  "Delhi Daredevils": 7,
  "Gujarat Lions": 4,
  "Kings XI Punjab": 6,
  "Kochi Tuskers Kerala": 11,
  "Kolkata Knight Riders": 5,
  "Mumbai Indians": 2,
  "Pune Warriors": 12,
  "Rajasthan Royals": 9,
  "Rising Pune Supergiants": 3,
  "Rising Pune Supergiant": 3,
  "Royal Challengers Bangalore": 1,
  "Sunrisers Hyderabad": 0,
};

export const teamCodeToNameMap = {
  0: "Sunrisers Hyderabad",
  1: "Royal Challengers Bangalore",
  2: "Mumbai Indians",
  3: "Rising Pune Supergiants",
  4: "Gujarat Lions",
  5: "Kolkata Knight Riders",
  6: "Kings XI Punjab",
  7: "Delhi Daredevils",
  8: "Chennai Super Kings",
  9: "Rajasthan Royals",
  10: "Deccan Chargers",
  11: "Kochi Tuskers Kerala",
  12: "Pune Warriors",
};
