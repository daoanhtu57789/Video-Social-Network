import React, { Component } from "react";
//css
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { TextField } from "@material-ui/core";
class SearchBox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            autoComplete="off"
            id="search"
            label="Tìm Kiếm"
            type="text"
            margin="normal"
            placeholder="Nhập Từ Khóa"
            className={classes.textField}
          />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBox);
