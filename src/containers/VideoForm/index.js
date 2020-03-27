import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//redux-form
import { Field, reduxForm } from "redux-form";
import renderTextField from "./../../components/FormHelpers/TextField/index";
import renderSelectField from "./../../components/FormHelpers/SelectField/index";
//redux
import { compose } from "redux";
//kêt nối với store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import * as modalActions from "./../../actions/modal";
import * as videoActions from "./../../actions/video";
import * as uiActions from "./../../actions/ui";
//firebase
import fire from "./../../config/Fire";
//template ui
import { Grid, Button, Box, MenuItem } from "@material-ui/core";

//thông báo xóa thành công hoặc thất bại
import { toastError, toastSuccess } from "./../../helpers/toastHelpers";
class VideoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      url: "",
      progress: 0
    };
  }

  handleSubmitForm = dataVideo => {
    //phải dùng errow function
    const {
      videoActionsCreator,
      modalActionsCreator,
      uiActionsCreator,
      videoEditing
    } = this.props;
    const {
      addVideoFailed,
      updateVideoSuccess,
      updateVideoFailed,
      fetchVideoSuccess
    } = videoActionsCreator;
    const { hideModal } = modalActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    let dateNow = new Date();
    const toStringDate = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()} ${dateNow.getDate()} thg${dateNow.getMonth()} ${dateNow.getFullYear()}`;
    //update file xong trước mới update database

    //cập nhật database
    if (videoEditing && videoEditing.videoId) {
      //lấy video đang edit
      const videoDocument = fire
        .firestore()
        .collection("videos")
        .doc(`/${videoEditing.videoId}`);

      videoDocument
        .get()
        .then(doc => {
          //kiểm tra xem video lấy có tồn tại không
          if (doc.exists) {
            return videoDocument.get();
          } else {
            return toastError("Video not found");
          }
        })
        .then(data => {
          if (!data) {
            toastError("Video not data");
          } else if (videoEditing.email === localStorage.getItem("user")) {
            videoDocument.update({
              //update cái gì thì cho cái đó vào
              description: dataVideo.description,
              status: dataVideo.status,
              title: dataVideo.title
            });
            //ẩn form nhập
            hideModal();
            //hiện loading chờ
            showLoading();
            //post dữ liệu lên
            updateVideoSuccess({
              videoId: videoEditing.videoId,
              email: videoEditing.email,
              description: dataVideo.description,
              link: videoEditing.link,
              status: dataVideo.status,
              likeCount: videoEditing.likeCount,
              shareCount: videoEditing.shareCount,
              createdAt: videoEditing.createdAt,
              nameVideo: videoEditing.nameVideo,
              title: dataVideo.title
            });
            //post xong thì đóng loading
            setTimeout(hideLoading, 500);
            //thông báo update thành công
            toastSuccess("Updated Success.");
          } else {
            hideModal();
            toastError("This is not your video");
          }
        })
        .catch(err => {
          hideModal();
          showLoading();
          updateVideoFailed(err);
          setTimeout(hideLoading, 1000);
          console.error(err);
          toastError(err.code);
        });
    } else {
      //thêm mới video
      const { video } = this.state;

      const uploadTask = fire
        .storage()
        .ref(`${video.name}`)
        .put(video);

      uploadTask.on(
        "state_changed",
        snapshot => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          fire
            .storage()
            .ref()
            //tìm video có tên là video.name rồi lấy link
            .child(video.name)
            .getDownloadURL()
            .then(link => {
              const newVideo = {
                email: localStorage.getItem("user"),
                link: link,
                nameVideo: video.name,
                createdAt: toStringDate,
                shareCount: 0,
                likeCount: 0,
                description: dataVideo.description,
                status: 0,
                title: dataVideo.title
              };

              //kết nối database với tên là videos trên firebase
              fire
                .firestore()
                .collection("videos")
                //thêm mới video
                .add(newVideo)
                //thành công trả về 1 doc
                .then(doc => {
                  //ẩn form nhập
                  hideModal();
                  //hiện loading chờ
                  showLoading();
                  //lấy dữ liệu về store

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
                    });
                  //post xong thì đóng loading
                  setTimeout(hideLoading, 1000);
                  //thông báo thêm thành công
                  toastSuccess("Add Video Success.");
                })
                .catch(err => {
                  hideModal();
                  showLoading();
                  console.error(err);
                  addVideoFailed(err);
                  setTimeout(hideLoading, 1000);
                  toastError("Add Video Failed.");
                });
              //--------------------------
            });
        }
      );
      ///////////////////////////
    }
  }; //ngoài cùng

  handleChange = event => {
    if (event.target.files[0]) {
      const video = event.target.files[0];
      this.setState({ video });
    }
  };

  renderStatusSelection() {
    let xhtml = null;
    const { classes, videoEditing } = this.props;
    if (videoEditing && videoEditing.videoId) {
      xhtml = (
        <Field
          id="status"
          label="Trạng Thái"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>NOT SEEN</MenuItem>
          <MenuItem value={1}>WATCHING</MenuItem>
          <MenuItem value={2}>WATCHED</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

  render() {
    //handleSubmit là hàm mà redux-form nó cung cấp cho
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      videoEditing
    } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
      //onSubmit sẽ truyền value của Field có name là link và description vào hàm handleSubmitForm
      <form
        className={classes.root}
        onSubmit={handleSubmit(this.handleSubmitForm)}
      >
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              label="Tiêu Đề"
              multiline
              rowmax="4"
              margin="normal"
              name="title"
              className={classes.textField}
              component={renderTextField}
            />
          </Grid>

          <Grid item md={12}>
            <Field
              id="description"
              label="Mô tả video"
              margin="normal"
              className={classes.textField}
              component={renderTextField}
              name="description"
            />
          </Grid>

          {videoEditing && videoEditing.videoId ? (
            this.renderStatusSelection()
          ) : (
            // <Grid item md={12}>
            //   <Field
            //     id="link"
            //     label="Link Video"
            //     multiline
            //     rowmax="4"
            //     margin="normal"
            //     name="link"
            //     className={classes.textField}
            //     component={renderTextField}
            //   />
            // </Grid>
            <Grid item md={12}>
              <progress
                value={this.state.progress}
                max="100"
                style={{ marginBottom: "10px" }}
              />
              <input type="file" onChange={this.handleChange} />
            </Grid>
          )}
          {/* phần button */}
          <Grid item md={12}>
            {/* flexDirection="row-reverse" Đảo ngược vị trí button ở trong */}
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>
                  Hủy Bỏ
                </Button>
              </Box>

              <Button
                // Nếu nhập đúng theo validate thì sẽ bấm được còn ko thì ẩn nút Lưu Lại
                // disabled={invalid || submitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                Lưu Lại
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoEditing: state.video.videoEditing,
    //initialValues truyền giá trị vào redux Form
    initialValues: {
      description: state.video.videoEditing
        ? state.video.videoEditing.description
        : null,
      title: state.video.videoEditing ? state.video.videoEditing.title : null,
      status: state.video.videoEditing ? state.video.videoEditing.status : null
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //bắt sự kiện hiện form nhập liệu
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    //bắt các hành động tác động lên video
    videoActionsCreator: bindActionCreators(videoActions, dispatch),
    //bắt sự kiện hiển thị loading
    uiActionsCreator: bindActionCreators(uiActions, dispatch)
  };
};

//kết nối với redux-form
const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
  form: FORM_NAME
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withReduxForm
)(VideoForm);
