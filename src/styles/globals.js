import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: ${({ column }) => (!column ? "row" : "column")};
	flex-wrap: wrap;
	gap: 2em;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

//Facts
//info
//Graph
export const Card = styled.div`
	background-color: ${({ theme }) => theme.textSecondary};
	border: 3px solid ${({ theme }) => theme.info};
	color: ${({ theme }) => theme.backgroundSecondary};
	font-size: 1.2em;
	padding: 2em 2em;
	flex-direction: ${({ column }) => (column ? "column" : "row")};
	flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "")};
	display: flex;
	width: 25%;
	border-radius: 12px;
	flex-grow: 1;
	div {
		display: flex;
		flex-direction: column;
		h2 {
			text-transform: uppercase;
			margin: 0;
			margin-bottom: 1em;
			color: ${({ theme }) => theme.info};
		}
		p {
			flex: 1 0 auto;
			span {
				font-weight: 600;
				color: ${({ theme }) => theme.info};
			}
		}
		h3 {
			flex: 1 0 auto;
			font-size: 1em;
			margin: 0;
			font-weight: 400;
			span {
				font-weight: 600;
				color: ${({ theme }) => theme.info};
			}
		}
	}

	@media (max-width: 768px) {
		width: 100%;
		font-size: 1em;
	}
`;

export const GraphContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
