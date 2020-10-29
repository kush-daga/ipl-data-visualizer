import styled from "styled-components";

export const SearchDropdown = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	border: 1px solid ${({ theme }) => theme.text};
	border-top: none;
	border-bottom: none;
	background-color: ${({ theme }) => theme.background};
	li {
		border-bottom: 1px solid ${({ theme }) => theme.text};
		padding: 1em;
		font-weight: 600;
		cursor: pointer;
	}
`;
