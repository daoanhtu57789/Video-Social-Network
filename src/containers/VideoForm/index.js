import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//redux-form
import { Field, reduxForm } from 'redux-form'
import renderTextField from './../../components/FormHelpers/TextField/index';
//redux
import {compose} from 'redux';
//kêt nối với store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import * as modalActions from "./../../actions/modal";
import { Grid, Button, Box } from "@material-ui/core";
class VideoForm extends Component {
  render() {
    const { classes,modalActionsCreator } = this.props;
    const {hideModal} = modalActionsCreator;
    return (
      <form className={classes.root} >
        <Grid container>
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
          {/* phần button */}
          <Grid item md={12}>
            {/* flexDirection="row-reverse" Đảo ngược vị trí button ở trong */}
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>Hủy Bỏ</Button>
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
};


const mapDispatchToProps = dispatch => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch)
  };
};


//kết nối với redux-form
const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
    form: FORM_NAME
});

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  ),
  withReduxForm
)(VideoForm);
