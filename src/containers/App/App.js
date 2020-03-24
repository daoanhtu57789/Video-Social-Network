import React, { Component } from "react";

//lấy theme để truyền
import theme from "../../commons/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
//thông báo khi làm gì thành công hay thất bại toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//truyền component
import CommonModal from "./../../components/Modal/index";
import GlobalLoading from "./../../components/GlobalLoading/index";
//import Provider để kết nối với store
import { Provider } from "react-redux";

//import để reset css
import CssBaseline from "@material-ui/core/CssBaseline";
//cài đặt route
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import {PAGE_ROUTES} from './../../constants/index';
import AdminLayoutRoute from './../../commons/Layout/AdminLayoutRoute';
//chaỵ configureStore() để lấy được store
import configureStore from "./../../redux/configureStore";
const store = configureStore();
class App extends Component {
  //hàm trả về các componet khi nhận đúng route
  renderAdminRoutes = () =>{
    let xhtml = null;

    xhtml = PAGE_ROUTES.map(route => {
      return (
        <AdminLayoutRoute 
          key = {route.path}
          component = {route.component}
          path = {route.path}
          exact = {route.exact}
          name = {route.name}
        />
      );
    });
    return xhtml;
  };

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CommonModal />
            <GlobalLoading />
            <ToastContainer autoClose={2000} />
            <Switch>
              {this.renderAdminRoutes()}
              {/* phải load được các component rồi mới chuyển trang login 
                Redirect điều hướng đến /admin khi load xong trang
              */}
              <Redirect to="/admin" />
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
