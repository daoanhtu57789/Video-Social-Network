import React, { Component } from "react";

//lấy theme để truyền
import theme from "../../commons/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

//truyền component
import VideoBoard from "./../VideoBoard/index";
import CommonModal from './../../components/Modal/index';
import GlobalLoading from './../../components/GlobalLoading/index'
//import Provider để kết nối với store
import { Provider } from 'react-redux';
//import để reset css
import CssBaseline from "@material-ui/core/CssBaseline";
import configureStore from "./../../redux/configureStore";
//chaỵ configureStore() để lấy được store
const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <VideoBoard />
          <CommonModal />
          <GlobalLoading />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
