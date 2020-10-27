import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  divideDataYearWise,
  getTeamwiseData,
  getGroundwiseData,
} from "../../utils/helpers";
import produce from "immer";
export default function SeasonWinners() {
  //gfet data
  const data = useSelector((state) => state.app.data);
  const [yearWiseTeamData, setYearWiseTeamData] = useState({});
  const [yearWiseGroundData, setYearWiseGroundData] = useState({});
  const [yearWiseMaxWins, setYearWiseMaxWins] = useState({});
  const [yearWiseMaxLosses, setYearWiseMaxLosses] = useState({});

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
    // console.log(yearWiseTeamData);
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

  //Not needed as  sometimes max matches in a ground can be same..

  // useEffect(() => {
  //   console.log(yearWiseGroundData);
  //   Object.keys(yearWiseGroundData).forEach((year) => {
  //     let arr = Object.values(yearWiseGroundData[year]);
  //     let max = Math.max(...arr);
  //     console.log(max);
  //   });
  // }, [yearWiseGroundData]);

  useEffect(() => {
    console.log(yearWiseMaxWins);
  }, [yearWiseMaxWins]);

  useEffect(() => {
    console.log(yearWiseMaxLosses);
  }, [yearWiseMaxLosses]);

  return <div>Season Winners</div>;
}
