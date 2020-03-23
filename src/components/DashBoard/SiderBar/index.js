import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { NavLink } from "react-router-dom";
import { ListItem, List, Drawer, ListItemText } from "@material-ui/core";
import { PAGE_ROUTES } from "./../../../constants/index";
class SiderBar extends Component {
  renderListSiderBar = () => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div">
          {PAGE_ROUTES.map(route => (
            <NavLink
              key={route.path}
              to={route.path}
              exact={route.exact}
              className={classes.link}
              activeClassName={classes.menuLinkActive}
            >
              <ListItem button key={route.path} className={classes.menuItem}>
                <ListItemText primary={route.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );
    return xhtml;
  };

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="persistent"
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {this.renderListSiderBar()}
      </Drawer>
    );
  }
}

export default withStyles(styles)(SiderBar);
