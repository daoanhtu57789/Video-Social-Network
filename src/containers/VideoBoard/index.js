import React, { Component } from "react";
//styles
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//
import { Button, Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
//component
import SearchBox from "../../components/SearchBox/index";
import VideoList from "../../components/VideoList/index";
import VideoForm from "./../VideoForm/index";
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
import fire from "./../../config/Fire";
//thông báo xóa thành công hoặc thất bại
import { toastError, toastSuccess } from "./../../helpers/toastHelpers";
class VideoBoard extends Component {
  //lấy dữ liệu khi mở trang
  componentDidMount() {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const { fetchVideoSuccess, fetchVideoFailed } = videoActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    //showLoading
    showLoading();
    //lấy dữ liệu trên firebase có database là videos
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
            name: doc.data().name,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status : doc.data().status
          });
        });
        fetchVideoSuccess(videos);
        setTimeout(hideLoading, 1000);
        toastSuccess("Lấy dữ liệu thành công =) .");
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        setTimeout(hideLoading, 1000);
        toastError("Lấy dữ liệu thất bại :(");
      });
  }
  //Thanh tìm kiếm
  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox />;
    return xhtml;
  };

  //click button up video
  openForm = () => {
    const { modalActionsCreator } = this.props;
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionsCreator;
    showModal();
    changeModalTitle("Thêm Mới Link Video");
    changeModalContent(<VideoForm />);
  };

  //click button load video
  loadVideo = () => {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const { fetchVideoSuccess, fetchVideoFailed } = videoActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    //showLoading
    showLoading();
    
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
            name: doc.data().name,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status : doc.data().status
          });
        });
        fetchVideoSuccess(videos);
        setTimeout(hideLoading, 1000);
        toastSuccess("Lấy dữ liệu thành công .");
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        setTimeout(hideLoading, 1000);
        toastError("Lấy dữ liệu thất bại.");
      });
  };

  //Hiện Form xác nhận xóa video
  onClickDelete = video => {
    const { modalActionsCreator } = this.props;
    const {
      hideModal,
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionsCreator;
    showModal();
    changeModalTitle("Xóa Video");
    changeModalContent(
      <Grid container>
        <Grid item md={12}>
          Bạn có chắc muốn xóa <strong>{video.description}</strong> không?
        </Grid>
        <Grid item md={12}>
          {/* flexDirection="row-reverse" Đảo ngược vị trí button ở trong */}
          <Box display="flex" flexDirection="row-reverse" mt={2}>
            <Box>
              <Button ml={2} variant="contained" onClick={hideModal}>
                Hủy Bỏ
              </Button>
            </Box>

            <Button
              // Nếu nhập đúng theo validate thì sẽ bấm được còn ko thì ẩn nút Lưu Lại
              // disabled={invalid || submitting}

              variant="contained"
              color="primary"
              onClick={() => this.handleDelete(video)}
            >
              Đồng Ý
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  //Xóa Video
  handleDelete = video => {
    const {
      videoActionsCreator,
      uiActionsCreator,
      modalActionsCreator
    } = this.props;
    const { deleteVideoSuccess, deleteVideoFailed } = videoActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    const { hideModal } = modalActionsCreator;
    //đóng form
    hideModal();
    //showLoading
    showLoading();
    //gọi get api
    apis
      .deleteVideo(video.id)
      .then(res => {
        if (res.status === 200) {
          deleteVideoSuccess(video.id);
          setTimeout(hideLoading, 1000);
          toastSuccess("Xóa dữ liệu thành công =) ");
        }
      })
      .catch(err => {
        console.log(err);
        deleteVideoFailed(err);
        setTimeout(hideLoading, 1000);
        toastError("Xóa dữ liệu thất bại :(");
      });
  };

  //Edit Video
  onClickEdit = video => {
    const { modalActionsCreator, videoActionsCreator } = this.props;
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionsCreator;
    const { setVideoEditing } = videoActionsCreator;
    //truyền video cần xét vào
    setVideoEditing(video);
    showModal();
    changeModalTitle("Sửa Thông Tin Video");
    changeModalContent(<VideoForm video={video} />);
  };
  //phần nội dung bên trong
  renderBoard = () => {
    const { listVideo, showSiderBar } = this.props;
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
              onClickDelete={this.onClickDelete}
              onClickEdit={this.onClickEdit}
              showSiderBar={showSiderBar}
            />
          );
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
    listVideo: state.video.listVideo,
    showSiderBar: state.ui.showSiderBar
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
