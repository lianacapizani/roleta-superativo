import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Colors from "./styles/colors";
import RoletaSuperAtivo from "./components/RoletaSuperAtivo";

const Global = createGlobalStyle`
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(180deg, ${Colors.primary50}, ${Colors.background});
    color: ${Colors.neutral900};
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
`;

const Page = styled.main`
  min-height: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 40px;
`;

function App() {
  return (
    <>
      <Global />
      <Page>
        <RoletaSuperAtivo />
      </Page>
    </>
  );
}

export default App;
