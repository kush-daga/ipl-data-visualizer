import { FETCH_DATA, DATA_FETCH_SUCCESS, DATA_FETCH_FAIL } from "./types";
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case DATA_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DATA_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};

export default appReducer;
