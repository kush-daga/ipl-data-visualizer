import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";
import {
  divideDataYearWise,
  getMostMom,
  setMomDataHelper,
} from "../../utils/helpers";
export default function MOMAnalysis() {
  const data = useSelector((state) => state.app.data);
  const [momData, setMomData] = useState({});
  const [maxMomData, setMaxMomData] = useState(null);

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

  return <div>Man of the match analysis</div>;
}
