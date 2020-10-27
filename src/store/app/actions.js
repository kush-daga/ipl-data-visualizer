import { FETCH_DATA, DATA_FETCH_SUCCESS, DATA_FETCH_FAIL } from "./types";
import axios from "axios";

export const fetchData = () => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // const url = `https://ipl-data-atlan.herokuapp.com/db`;
  const url = `http://localhost:5000/db`;

  dispatch({
    type: FETCH_DATA,
  });

  axios
    .get(url, config)
    .then((res) => {
      dispatch({
        type: DATA_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DATA_FETCH_FAIL,
        payload: err,
      });
    });
};

const appActions = {
  fetchData,
};

export default appActions;
