import React, { Component } from "react";
//styles
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
//component
import SearchBox from "../../components/SearchBox/index";
import VideoList from "../../components/VideoList/index";
//contans
import { STATUSES } from "../../constants/index";
//kêt nối với store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import * as modalActions from "./../../actions/modal";
import * as videoActions from "./../../actions/video";
import * as uiActions from "./../../actions/ui";
//apis
import * as apis from "./../../apis/video";
class VideoBoard extends Component {
  //lấy dữ liệu khi mở trang
  componentDidMount() {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const { fetchVideoSuccess, fetchVideoFailed } = videoActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    //showLoading
    showLoading();
    //gọi get api
    apis
      .getVideos()
      .then(res => {
        fetchVideoSuccess(res.data);
        hideLoading();
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        hideLoading();
      });
  }
  //Thanh tìm kiếm
  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox />;
    return xhtml;
  };
  //phần nội dung bên trong
  renderBoard = () => {
    const { listVideo } = this.props;
    let xhtml = null;

    xhtml = (
      <Grid container spacing={2} style={{ paddingTop: "10px" }}>
        {STATUSES.map(status => {
          const filterVideoList = listVideo.filter(
            video => video.status === status.value
          );
          return (
            <VideoList
              key={status.value}
              status={status}
              filterVideoList={filterVideoList}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  };

  openForm = () => {
    const { modalActionsCreator } = this.props;
    const { showModal } = modalActionsCreator;
    showModal();
  };

  loadVideo = () => {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const { fetchVideoSuccess, fetchVideoFailed } = videoActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    //showLoading
    showLoading();
    //gọi get api
    apis
      .getVideos()
      .then(res => {
        fetchVideoSuccess(res.data);
        hideLoading();
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        hideLoading();
      });
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
          onClick={this.loadVideo}
        >
          <LoopIcon />
          Load Video
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon />
          Up Video
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listVideo: state.video.listVideo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    videoActionsCreator: bindActionCreators(videoActions, dispatch),
    uiActionsCreator: bindActionCreators(uiActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VideoBoard));
