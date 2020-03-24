import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//component
import Video from "../Video/index";
import { Grid, Box } from "@material-ui/core";
class VideoList extends Component {
  render() {
    const { status, classes, filterVideoList, onClickDelete,onClickEdit,showSiderBar } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={1} mb={1}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wapperListTask}>
          {filterVideoList.map((video, index) => {
            return (
              <Video
                key={index}
                status={status}
                video={video}
                onClickDelete={() => onClickDelete(video)}
                onClickEdit={() => onClickEdit(video)}
                showSiderBar={showSiderBar}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoList);
