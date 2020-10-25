import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions";
import { lightTheme } from "../../styles/theme.js";
import styled from "styled-components";
import history from "../../services/history";
import Routes from "../../routes";
import { HashRouter as Router } from "react-router-dom";
import Layout from "../Layout";

function App() {
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  // T̶O̶D̶O̶ -̶ G̶e̶t̶ d̶a̶t̶a̶ f̶r̶o̶m̶ H̶e̶r̶o̶k̶u̶ a̶n̶d̶ s̶t̶o̶r̶e̶ i̶n̶ r̶e̶d̶u̶x̶.̶

  useEffect(() => {
    //Get data from Heroku
    console.log(" -- Getting Data -- ");
    dispatch(actions.appActions.fetchData());
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      {loading ? (
        "Loading"
      ) : (
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
