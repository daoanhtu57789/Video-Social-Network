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
  handleSubmitForm = dataVideo => {
    //phải dùng errow function
    const {
      videoActionsCreator,
      modalActionsCreator,
      uiActionsCreator,
      videoEditing
    } = this.props;
    const {
      addVideoSuccess,
      addVideoFailed,
      updateVideoSuccess,
      updateVideoFailed,
      fetchVideoSuccess
    } = videoActionsCreator;
    const { hideModal } = modalActionsCreator;
    const { showLoading, hideLoading } = uiActionsCreator;
    let dateNow = new Date();
    const toStringDate = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()} ${dateNow.getDate()} thg${dateNow.getMonth()} ${dateNow.getFullYear()}`;

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
          } else if(videoEditing.email === localStorage.getItem('user')){
            videoDocument.update({
              videoId: videoEditing.videoId,
              email: videoEditing.email,
              description: dataVideo.description,
              link: videoEditing.link,
              status: dataVideo.status,
              likeCount: videoEditing.likeCount,
              shareCount: videoEditing.shareCount,
              createdAt: videoEditing.createdAt,
              name: dataVideo.name
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
              name: dataVideo.name
            });
            //post xong thì đóng loading
            setTimeout(hideLoading, 1000);
            //thông báo update thành công
            toastSuccess("Cập nhật thông tin thành công.");  
          }
          else{
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
      const newVideo = {
        email: localStorage.getItem("user"),
        link: dataVideo.link,
        name: dataVideo.name,
        createdAt: toStringDate,
        shareCount: 0,
        likeCount: 0,
        description: dataVideo.description,
        status: 0
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
          //lấy dữ liệu từ doc về
          doc.get().then(data => {
            //post dữ liệu lên;
            addVideoSuccess(data.data());
          });
          //post xong thì đóng loading
          setTimeout(hideLoading, 1000);
          //thông báo thêm thành công
          toastSuccess("Thêm thông tin thành công.");
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
                status: doc.data().status
              });
            });
            fetchVideoSuccess(videos);
          })
        })
        .catch(err => {
          hideModal();
          showLoading();
          console.error(err);
          addVideoFailed(err);
          setTimeout(hideLoading, 1000);
          toastError("Thêm thông tin thất bại.");
        });
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
              id="name"
              label="Tên Video"
              multiline
              rowmax="4"
              margin="normal"
              name="name"
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
            <Grid item md={12}>
              <Field
                id="link"
                label="Link Video"
                multiline
                rowmax="4"
                margin="normal"
                name="link"
                className={classes.textField}
                component={renderTextField}
              />
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
      name: state.video.videoEditing ? state.video.videoEditing.name : null,
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
