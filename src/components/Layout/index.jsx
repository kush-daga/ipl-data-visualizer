import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import {
  Container,
  Content,
  Sidebar,
  SubContainer,
  SidebarLink,
} from "./styles";
import { useLocation } from "react-router-dom";
export default function Layout(props) {
  //Sidebar && Nav
  const location = useLocation();
  const links = [
    { name: "Home/Away Analysis", to: "/homeAway" },
    { name: "Season Winners", to: "/seasonWinners" },
    { name: "Home/Away influence on Toss", to: "/homeAwayToss" },
    { name: "Man of the Match Analysis", to: "/manOfTheMatch" },
    { name: "Toss Result vs Actual Result", to: "/tossVsActual" },
  ];
  return (
    <Container>
      <Nav></Nav>
      <SubContainer>
        <Sidebar>
          <ul>
            {links.map((link, index) => {
              return (
                <SidebarLink active={location.pathname === link.to}>
                  <Link to={`${link.to}`}>{link.name}</Link>
                </SidebarLink>
              );
            })}
          </ul>
        </Sidebar>
        <Content>{props.children}</Content>
      </SubContainer>
    </Container>
  );
}
