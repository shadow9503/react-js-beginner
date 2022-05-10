import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { darkTheme, lightTheme } from "./theme/theme.js";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./theme/GlobalStyle";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Routes>
          <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

const S = {};

S.Main = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.bgColor};
`;
