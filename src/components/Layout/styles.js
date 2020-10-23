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
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 1.5em;
  color: ${({ theme }) => theme.textSecondary};
  ul {
    margin-top: 3em;
    li {
      font-size: 1em;
      margin-bottom: 0.7em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 1.5em;
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.text};
        font-weight: 800;
      }
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
`;
