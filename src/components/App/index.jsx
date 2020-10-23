import React from "react";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions";
import { lightTheme } from "../../styles/theme.js";
import styled from "styled-components";
import history from "../../services/history";
import Routes from "../../routes";
import { HashRouter as Router } from "react-router-dom";

function App() {
  // const theme = useSelector((state) => state.app.theme);
  // const dispatch = useDispatch();
  return (
    <ThemeProvider theme={lightTheme}>
      <Text>Hello WOrlld</Text>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;

const Text = styled.h1`
  color: ${({ theme }) => theme.text};
`;
