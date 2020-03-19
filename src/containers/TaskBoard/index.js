import React, { Component } from "react";
//styles
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
//component
import SearchBox from "./../../components/SearchBox/index";
import VideoList from "./../../components/VideoList/index";
//contans
import { STATUSES } from "./../../contanst/index";
class TaskBoard extends Component {
  //Thanh tìm kiếm
  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox />;
    return xhtml;
  };
  //phần nội dung bên trong
  renderBoard = () => {
    let xhtml = null;

    xhtml = (
      <Grid container spacing={2} style={{paddingTop:'10px'}}>
        {STATUSES.map(status => {
          return <VideoList key={status.value} status={status} />;
        })}
      </Grid>
    );
    return xhtml;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: "10px"
          }}
          className={classes.button}
        >
          <LoopIcon />
          Load Video
        </Button>

        <Button variant="contained" color="primary" className={classes.button}>
          <AddIcon />
          Up Video
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);
