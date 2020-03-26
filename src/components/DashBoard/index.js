import React, { Component } from "react";
//Thanh trên cùng
import Header from "./Header/index";
//Thanh bên
import SiderBar from "./SiderBar/index";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//cn để gộp nhiều class
import cn from "classnames";
//kết nối với store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiActions from "./../../actions/ui";
import { Grid } from "@material-ui/core";

class DashBoard extends Component {
  toggleSiderBar() {
    const { uiActionsCreator } = this.props;
    const { showSiderBar } = uiActionsCreator;
    showSiderBar();
  }

  render() {
    const { classes, children, name, showSiderBar } = this.props;
    return (
      <div>
        {/* Header của trang web */}
        <Grid container className={classes.container}>
          <Grid item md={12}  className={classes.header}>
            <Header name={name} toggleSiderBar={() => this.toggleSiderBar()} />
          </Grid>
          <Grid item md={12} className={classes.content}>
            {/* Content của trang web */}
            <div className={classes.wrapper}>
              {/* slider bên trái */}
              <SiderBar showSiderBar={showSiderBar} />

              {/* content bên trong */}
              <div
                className={cn(classes.wrapperContent, {
                  //tạo class mới với điều kiện
                  [classes.shirtLeft]: showSiderBar === false
                })}
              >
                {children}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showSiderBar: state.ui.showSiderBar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uiActionsCreator: bindActionCreators(uiActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DashBoard));
