import styled from "styled-components";

export const Container = styled.div`
	max-height: 100vh;
	width: 100vw;
`;

export const SubContainer = styled.div`
	display: flex;
	width: 100vw;
	padding-top: 1vh;
`;

export const Sidebar = styled.div`
	min-width: ${({ closed }) => (closed ? 0 : "25vw")};
	width: ${({ closed }) => (closed ? "0vw" : "25vw")};
	display: flex;
	flex-direction: column;
	align-items: left;
	transition: all 0.5s ease-in-out;
	padding-left: 1.5em;
	color: ${({ theme }) => theme.textSecondary};
	ul {
		margin-top: 3em;
		transition: all 0.5s ease-in-out;
	}
	button {
		border: 1px solid ${({ theme }) => theme.background};
		background-color: ${({ theme }) => theme.info};
		border-radius: 5px;
		padding: 15px 20px;
		font-size: 1.2em;
		margin-bottom: 2em;
		font-family: "Commissioner", Helvetica-Neue, Helvetica, Arial, sans-serif;
		margin-right: 10px;
	}
	@media (max-width: 768px) {
		min-width: ${({ closed }) => (closed ? 0 : "100vw")};
		width: ${({ closed }) => (closed ? "0vw" : "100vw")};
		padding: ${({ closed }) => (closed ? "0vw" : "2em")};
		ul,
		button {
			display: ${({ closed }) => (closed ? "none" : "")};
		}
	}
`;

export const SidebarLink = styled.li`
	font-size: 1em;
	margin-bottom: 0.7em !important;
	font-weight: ${({ active }) => (active ? "800" : "600")};
	color: ${({ theme, active }) => (active ? theme.text : theme.textSecondary)};
	text-transform: uppercase;
	letter-spacing: 1px;
	line-height: 1.5em;
	cursor: pointer;
	a {
		color: ${({ theme, active }) =>
			active ? theme.text : theme.textSecondary};
		font-weight: ${({ active }) => (active ? "800" : "600")};
		&:hover {
			color: ${({ theme }) => theme.text};
			font-weight: 800;
		}
	}
`;

export const Content = styled.div`
	flex: 1;
	background-color: ${({ theme }) => theme.backgroundSecondary};
	/* margin-left: 15vw; */
	height: 89vh;
	overflow: auto;
	border-radius: 10px;
	padding: 2em;
	box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	color: ${({ theme }) => theme.text};
	button {
		border: 1px solid ${({ theme }) => theme.background};
		background-color: ${({ theme }) => theme.info};
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 1em;
		margin-bottom: 2em;
		font-family: "Commissioner", Helvetica-Neue, Helvetica, Arial, sans-serif;
		margin-right: 10px;
	}
	@media (max-width: 768px) {
		padding: 0.8em;
		padding-top: 2em;
		padding-bottom: 5em;
	}
`;
