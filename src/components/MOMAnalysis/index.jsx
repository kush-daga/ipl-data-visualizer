import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import SearchField from "react-search-field";
import { find } from "lodash";
import {
  divideDataYearWise,
  getMostMom,
  setMomDataHelper,
} from "../../utils/helpers";
import { useCallback } from "react";
export default function MOMAnalysis() {
  const data = useSelector((state) => state.app.data);
  const [momData, setMomData] = useState({});
  const [maxMomData, setMaxMomData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const seasonWiseData = divideDataYearWise(data);
      // console.log(seasonWiseData);
      setMomDataHelper(seasonWiseData, setMomData, produce);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(momData).length > 0) {
      //get data for maximum man of the matches
      getMostMom(momData).then((data) => {
        const newData = [];
        data.forEach((d) => {
          newData.push({ name: d[0], totalMom: d[1] });
        });
        setMaxMomData(newData);
      });
    }
  }, [momData]);

  useEffect(() => {
    if (maxMomData !== null) console.log(maxMomData.splice(0, 5));
  }, [maxMomData]);

  const handleChange = useCallback(
    (e) => {
      // console.log(find(maxMomData, (o) => o.name.includes(e)));
      if (e !== "" && e !== " " && e) {
        console.log(
          maxMomData.filter((player) => {
            var name = player.name.toLowerCase();
            var query = e.toLowerCase();
            return name.includes(query);
          })
        );
      }

      // maxMomData.forEach((player) => {
      //   var name = player.name.toLowerCase();
      //   var query = e.toLowerCase();
      //   if (query === "" || query === " ") {
      //     setSearchResults([]);
      //   }
      //   if (name.includes(query)) {
      //     setSearchResults((searchResults) => {
      //       searchResults.push(player);
      //       return searchResults;
      //     });
      //   }
      // });
    },
    [maxMomData]
  );

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  return (
    <div>
      Man of the match analysis
      {maxMomData !== null ? (
        <div>
          <h1>Hello</h1>
          <SearchField
            placeholder="Search for Player"
            onChange={handleChange}
          />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
