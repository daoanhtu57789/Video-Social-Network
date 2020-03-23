import React, { Component } from "react";
//Thanh trên cùng
import Header from "./Header/index";
//Thanh bên
import SiderBar from "./SiderBar/index";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//cn để gộp nhiều class
import cn from "classnames";
class DashBoard extends Component {
  render() {
    const { classes, children, name } = this.props;
    return (
      <div>
        {/* Header của trang web */}
        <Header name={name} />

        {/* Content của trang web */}
        <div className={classes.wrapper}>
          {/* slider bên trái */}
          <SiderBar />

          {/* content bên trong */}
          <div
            className={cn(classes.wrapperContent, {
              //tạo class mới với điều kiện
              [classes.shirtLeft]: true === false
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DashBoard);
