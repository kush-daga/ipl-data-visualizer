import styled from "styled-components";

export const Container = styled.div`
  max-height: 100vh;
`;

export const Sidebar = styled.div``;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  margin-top: 10vh;
  margin-left: 15vw;
  height: 90vh;
  overflow: auto;
  border-radius: 10px;
  padding: 2em;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.text};
`;
