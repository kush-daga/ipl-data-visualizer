import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions";
import { lightTheme } from "../../styles/theme.js";
import styled from "styled-components";
import history from "../../services/history";
import Routes from "../../routes";
import { HashRouter as Router } from "react-router-dom";

function App() {
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  //TODO - Get data from Heroku and store in redux.

  useEffect(() => {
    //Get data from Heroku
    console.log(" -- Getting Data -- ");
    dispatch(actions.appActions.fetchData());
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Text>Hello WOrlld</Text>
      {loading ? (
        "Loading"
      ) : (
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
          <Routes />
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;

const Text = styled.h1`
  color: ${({ theme }) => theme.text};
`;
