import React, { Component } from "react";
//styles
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//
import { Button, Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
//component
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
//kết nối vs firebase
import fire from "./../../config/Fire";
//thông báo xóa thành công hoặc thất bại
import { toastError, toastSuccess } from "./../../helpers/toastHelpers";
class VideoBoard extends Component {
  //lấy dữ liệu khi mở trang
  componentDidMount() {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const {
      fetchVideoSuccess,
      fetchVideoFailed,
      fetchLikeSuccess,
      fetchLikeFailed
    } = videoActionsCreator;
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
            nameVideo: doc.data().nameVideo,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status: doc.data().status,
            title: doc.data().title
          });
        });
        fetchVideoSuccess(videos);
        setTimeout(hideLoading, 200);
        toastSuccess("Load Success.");
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        setTimeout(hideLoading, 200);
        toastError("Load Failed.");
      });
    //lấy dữ danh sách đã like
    fire
      .firestore()
      .collection("likes")
      .where("email", "==", localStorage.getItem("user"))
      .get()
      .then(likeData => {
        let likes = [];
        likeData.forEach(doc => {
          likes.push({
            likeId: doc.id,
            email: doc.data().email,
            videoId: doc.data().videoId
          });
        });
        fetchLikeSuccess(likes);
      })
      .catch(err => {
        fetchLikeFailed(err);
        console.log(err);
      });
  }

  //click button up video
  openForm = () => {
    const { modalActionsCreator, videoActionsCreator } = this.props;

    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionsCreator;
    const { setVideoEditing } = videoActionsCreator;
    //truyền video cần xét vào
    setVideoEditing(null);
    showModal();
    changeModalTitle("Thêm Mới Video");
    changeModalContent(<VideoForm />);
  };

  //click button load video
  loadVideo = () => {
    const { videoActionsCreator, uiActionsCreator } = this.props;
    const {
      fetchVideoSuccess,
      fetchVideoFailed,
      fetchLikeSuccess,
      fetchLikeFailed
    } = videoActionsCreator;
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
            nameVideo: doc.data().nameVideo,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status: doc.data().status,
            title: doc.data().title
          });
        });
        fetchVideoSuccess(videos);
        setTimeout(hideLoading, 200);
        toastSuccess("Load Success .");
      })
      .catch(err => {
        console.log(err);
        fetchVideoFailed(err);
        setTimeout(hideLoading, 200);
        toastError("Load Failed.");
      });

    //lấy dữ danh sách đã like
    fire
      .firestore()
      .collection("likes")
      .where("email", "==", localStorage.getItem("user"))
      .get()
      .then(likeData => {
        let likes = [];
        likeData.forEach(doc => {
          likes.push({
            likeId: doc.id,
            email: doc.data().email,
            videoId: doc.data().videoId
          });
        });
        fetchLikeSuccess(likes);
      })
      .catch(err => {
        fetchLikeFailed(err);
        console.log(err);
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
          Bạn có chắc muốn xóa <strong>{video.title}</strong> không?
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
    //gọi get xóa database
    const document = fire
      .firestore()
      .collection("videos")
      .doc(`/${video.videoId}`);
    document
      .get()
      .then(doc => {
        if (!doc.exists) {
          deleteVideoFailed(null);
          setTimeout(hideLoading, 500);
          return toastError("Video not found");
        }
        if (doc.data().email !== localStorage.getItem("user")) {
          deleteVideoFailed(null);
          setTimeout(hideLoading, 500);
          toastError("This is not your video.");
        } else {
          deleteVideoSuccess(video.videoId);
          setTimeout(hideLoading, 500);
          toastSuccess("video deleted successfully");
          //Xóa Video trong firebase
          fire
            .storage()
            .ref(`${video.nameVideo}`)
            .delete();
          //Xóa like của mn
          fire
            .firestore()
            .collection("likes")
            .where("videoId", "==", video.videoId)
            .get()
            .then(doc => {
              doc.forEach(data => {
                fire.firestore().collection('likes').doc(`${data.id}`).delete();
              })
            }).catch(error => {
              console.error(error);
            })
          document.delete();
        }
      })
      .catch(err => {
        console.error(err);
        toastError(err.code);
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
  //Like Video

  onClickLike = video => {
    const { videoActionsCreator } = this.props;
    const {
      fetchVideoSuccess,
      fetchLikeSuccess,
      fetchLikeFailed
    } = videoActionsCreator;

    //thêm vào database likes
    fire
      .firestore()
      .collection("likes")
      .add({ email: localStorage.getItem("user"), videoId: video.videoId })
      .then(doc => {})
      .catch(error => {
        console.error(error);
      });
    //lấy dữ liệu danh sách đã like
    fire
      .firestore()
      .collection("likes")
      .where("email", "==", localStorage.getItem("user"))
      .get()
      .then(likeData => {
        let likes = [];
        likeData.forEach(doc => {
          likes.push({
            likeId: doc.id,
            email: doc.data().email,
            videoId: doc.data().videoId
          });
        });
        fetchLikeSuccess(likes);
      })
      .catch(err => {
        fetchLikeFailed(err);
        console.log(err);
      });

    fire
      .firestore()
      .collection("videos")
      .doc(`/${video.videoId}`)
      .update({
        //update cái gì thì cho cái đó vào
        likeCount: video.likeCount + 1
      });

    fire
      .firestore()
      .collection("videos")
      .get()
      .then(data => {
        let videos = [];
        data.forEach(doc => {
          videos.push({
            videoId: doc.id,
            nameVideo: doc.data().nameVideo,
            email: doc.data().email,
            link: doc.data().link,
            title: doc.data().title,
            createdAt: doc.data().createdAt,
            shareCount: doc.data().shareCount,
            likeCount: doc.data().likeCount,
            description: doc.data().description,
            status: doc.data().status
          });
        });
        fetchVideoSuccess(videos);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //unlike video
  onClickUnLike = video => {
    const { videoActionsCreator, listLike } = this.props;
    const { fetchVideoSuccess, fetchLikeSuccess } = videoActionsCreator;
    //lọc ra video cần unLike
    listLike.forEach(like => {
      if (like.videoId === video.videoId) {
        //thêm vào database likes
        fire
          .firestore()
          .collection("likes")
          .doc(`${like.likeId}`)
          .delete();
      }
    });

    //lấy dữ liệu danh sách đã like
    fire
      .firestore()
      .collection("likes")
      .where("email", "==", localStorage.getItem("user"))
      .get()
      .then(likeData => {
        let likes = [];
        likeData.forEach(doc => {
          likes.push({
            likeId: doc.id,
            email: doc.data().email,
            videoId: doc.data().videoId
          });
        });
        fetchLikeSuccess(likes);
      })
      .catch(err => {
        console.log(err);
      });

    fire
      .firestore()
      .collection("videos")
      .doc(`/${video.videoId}`)
      .update({
        //update cái gì thì cho cái đó vào
        likeCount: video.likeCount - 1
      });

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
        fetchVideoSuccess(videos);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //phần nội dung bên trong
  renderBoard = () => {
    const { listVideo, showSiderBar, listLike } = this.props;
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
              onClickLike={this.onClickLike}
              onClickUnLike={this.onClickUnLike}
              showSiderBar={showSiderBar}
              listLike={listLike}
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
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listVideo: state.video.listVideo,
    showSiderBar: state.ui.showSiderBar,
    listLike: state.video.listLike
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
