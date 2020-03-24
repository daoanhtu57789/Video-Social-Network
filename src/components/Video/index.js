import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import {
  Card,
  Avatar,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
  Fab
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

class Video extends Component {

  render() {
    const { status, classes, video,onClickDelete , onClickEdit,showSiderBar } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          {/* grid ngoài cùng phải có container ko thì sẽ ko chạy */}
          <Grid container justify="space-between">
            <Grid item md={8}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    Đ
                  </Avatar>
                }
                title="Đào Anh Tú"
                style={{ padding: "0" }}
                subheader={video.date}
              />
            </Grid>
            <Grid item md={4}>
              {status.label}
            </Grid>
          </Grid>
        </CardContent>

        <iframe
          title="ads"
          width={showSiderBar? "360" : "420"}
          height="300"
          src={video.link}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={classes.iframe}
        ></iframe>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {video.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" >
            <FavoriteIcon color="secondary" /> {video.likeCount}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon /> {video.shareCount}
          </IconButton>
          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            className={classes.fab}
            onClick={() => onClickEdit(video)}
          >
            <EditIcon fontSize="small" />
          </Fab>
          <Fab
            color="secondary"
            aria-label="delete"
            size="small"
            className={classes.fab}
          >
            <DeleteIcon
              fontSize="small"
              //khi click vào button thì sẽ gọi hàm onClickDelete mà ở TaskList truyền vào
              onClick={() => onClickDelete(video)}
            />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Video);
