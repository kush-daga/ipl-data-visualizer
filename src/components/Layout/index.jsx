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
import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
export default function Layout(props) {
	const [closed, setClosed] = useState(true);
	//Sidebar && Nav
	const windowSize = useWindowSize();
	const location = useLocation();
	const links = [
		{ name: "Home/Away Analysis", to: "/homeAway" },
		{ name: "Season Winners", to: "/seasonWinners" },
		{ name: "Home/Away influence on Toss", to: "/homeAwayToss" },
		{ name: "Man of the Match Analysis", to: "/manOfTheMatch" },
	];
	return (
		<Container>
			<Nav></Nav>
			<SubContainer>
				<Sidebar closed={closed}>
					<ul>
						{links.map((link, index) => {
							return (
								<SidebarLink active={location.pathname === link.to}>
									<Link to={`${link.to}`}>{link.name}</Link>
								</SidebarLink>
							);
						})}
					</ul>
					{windowSize.width < 1000 ? (
						<button
							onClick={() => {
								setClosed((closed) => !closed);
							}}
						>
							{closed ? ">" : "<"}
						</button>
					) : null}
				</Sidebar>
				<Content>
					<>
						<div>
							<button
								onClick={() => {
									setClosed((closed) => !closed);
								}}
							>
								{closed ? "Open" : "Close"}
							</button>
						</div>

						{props.children}
					</>
				</Content>
			</SubContainer>
		</Container>
	);
}
