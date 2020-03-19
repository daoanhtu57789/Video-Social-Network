import React from "react";

//lấy theme để truyền
import theme from "../../commons/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

//truyền component
import TaskBoard from './../TaskBoard/index';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaskBoard />
    </ThemeProvider>
  );
}

export default App;
