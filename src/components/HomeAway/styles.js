import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
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
`;

export const GraphContainer = styled.div``;
