import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import AppIcon from './../../assets/images/corgi.jpg';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from "@material-ui/core";
//kết nối store
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from './../../actions/ui';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    const {uiActionCreators} = this.props;
    const {showLoadingLogin} = uiActionCreators;
    showLoadingLogin(); 
  }
  render() {
    const { classes,showLoadingLogin } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        {/*  */}
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="corgi" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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
              disabled={showLoadingLogin}
            >
              Login
              {showLoadingLogin && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    showLoadingLogin : state.ui.showLoadingLogin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    uiActionCreators : bindActionCreators(uiActions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login));
