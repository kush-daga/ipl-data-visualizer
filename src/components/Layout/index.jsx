import React from "react";
import Nav from "../Nav";
import { Container, Content, Sidebar, SubContainer } from "./styles";

export default function Layout(props) {
  //Sidebar && Nav
  return (
    <Container>
      <Nav></Nav>
      <SubContainer>
        <Sidebar>
          <ul>
            <li>Home/Away Analysis</li>
            <li>Season Winners </li>
            <li>Home/Away influence on Toss</li>
            <li>Win Statistice per Team</li>
            <li>Man of the Match Analysis</li>
            <li>Toss Result vs Actual Result</li>
          </ul>
        </Sidebar>
        <Content>{props.children}</Content>
      </SubContainer>
    </Container>
  );
}
