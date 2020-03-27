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
import * as videoActions from "./../../actions/video";
import { Grid } from "@material-ui/core";
//firebase
import fire from "./../../config/Fire";

class DashBoard extends Component {
  toggleSiderBar() {
    const { uiActionsCreator } = this.props;
    const { showSiderBar } = uiActionsCreator;
    showSiderBar();
  }

  searchVideo = e => {
    const { value } = e.target;
    fire
      .firestore()
      .collection("videos")
      .get()
      .then(data => {
        let videos = [];
        data.forEach(doc => {
          videos.push({
            videoId: doc.id,
            email: doc.data().email,
            link: doc.data().link,
            nameVideo: doc.data().nameVideo,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status: doc.data().status,
            title: doc.data().title
          });
        });
        const { videoActionsCreator } = this.props;
        const { filterVideo } = videoActionsCreator;
        filterVideo(value, videos);
      })
      .catch(error => {
        let videos = [];
        const { videoActionsCreator } = this.props;
        const { filterVideo } = videoActionsCreator;
        filterVideo(value, videos);
        console.error(error);
      });
  };

  render() {
    const { classes, children, name, showSiderBar } = this.props;
    return (
      <div>
        {/* Header của trang web */}
        <Grid container className={classes.container}>
          <Grid item md={12} className={classes.header}>
            <Header
              searchVideo={e => this.searchVideo(e)}
              name={name}
              toggleSiderBar={() => this.toggleSiderBar()}
            />
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
    showSiderBar: state.ui.showSiderBar,
    listVideo: state.video.listVideo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uiActionsCreator: bindActionCreators(uiActions, dispatch),
    videoActionsCreator: bindActionCreators(videoActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DashBoard));
