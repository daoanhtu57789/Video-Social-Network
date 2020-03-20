import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import VideoForm from "./../../containers/VideoForm";
import CloseIcon from "@material-ui/icons/Clear";
//kêt nối với store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import * as modalActions from "./../../actions/modal";
class CommonModal extends Component {
  render() {
    const { classes, showModal, modalActionsCreator } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
      //open là true thì mới hiện form nhập
      //onClose laf khi di chuột ra ngoài thì sẽ gọi hideModal
      <Modal open={showModal} onClose={hideModal}>
        <div className={classes.modal}>
          {/* phần header của form */}
          <div className={classes.header}>
            <span className={classes.title}>Thêm Mới Link Video</span>
            {/* Icon X ở bên phải */}
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </div>
          {/* Phần nhập của Modal tức là Form  */}
          <div className={classes.content}>
            <VideoForm />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.modal.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommonModal));
