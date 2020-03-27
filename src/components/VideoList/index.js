import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//component
import Video from "../Video/index";
import { Grid, Box } from "@material-ui/core";
class VideoList extends Component {
  render() {
    const {
      status,
      classes,
      filterVideoList,
      listLike,
      onClickDelete,
      onClickEdit,
      showSiderBar,
      onClickLike,
      onClickUnLike
    } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={1} mb={1}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wapperListTask}>
          {filterVideoList.map((video, index) => {
            let color = "disabled";
            listLike.forEach(like => {
              if (like.videoId === video.videoId) {
                color = "secondary";
              }
            });
            return (
              <Video
                key={index}
                status={status}
                video={video}
                onClickDelete={() => onClickDelete(video)}
                onClickEdit={() => onClickEdit(video)}
                onClickLike={() => onClickLike(video)}
                onClickUnLike={() => onClickUnLike(video)}
                showSiderBar={showSiderBar}
                color={color}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoList);
