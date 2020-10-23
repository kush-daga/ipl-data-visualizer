import styled from "styled-components";

export const NavContainer = styled.div`
  height: 10vh;
  display: flex;
  padding: 0 1.5em;
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2.5em;
    margin-bottom: 0;
    margin: 0;
    font-weight: 900;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.text};
  }
  h3 {
    font-size: 1.5em;
    margin-bottom: 0;
    margin: 0;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;
