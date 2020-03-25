import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//import PropTypes from 'prop-types';
import AppIcon from "../../assets/images/corgi.jpg";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
//thông báo khi lỗi
import {toastError,toastSuccess} from './../../helpers/toastHelpers';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//kết nối store
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiActions from "./../../actions/ui";
import { CircularProgress } from "@material-ui/core";
//firebase
import fire from './../../config/Fire';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { uiActionCreators } = this.props;
    const { showLoadingSignup,hideLoadingSignup} = uiActionCreators;
    showLoadingSignup();
    if(this.state.password === this.state.confirmPassword ){
      fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        toastSuccess("Đăng kí thành công");
        hideLoadingSignup();
      })
      .catch((error) =>{
          console.log(error);
          toastError("Tài khoản đã tồn tại.");
          hideLoadingSignup();
      });
    }else{
      toastError("Mật khẩu không giống nhau hoặc ít hơn 6 kí tự");
      hideLoadingSignup();
    }
  };

  render() {
    const { classes,showLoadingSignup } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="corgi" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={showLoadingSignup}
            >
              SignUp
              {showLoadingSignup && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoadingSignup: state.ui.showLoadingSignup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uiActionCreators: bindActionCreators(uiActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Signup)));
