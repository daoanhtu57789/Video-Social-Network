import React from 'react';
import {FormControl, InputLabel, Select } from '@material-ui/core';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import styles from './styles';
//có 2 cách viết component là function component và class component
//đây là viết function component,cách này ko sử dụng được lifecricle hoặc các state local
const renderSelectField = ({
    label,
    classes,
    input,
    meta: { touched, invalid, error },
    children,
    //ngoài 3 thằng trên thì tất cả các props đều đi vào ...custom
    ...custom
  }) => (
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          {...input}
          {...custom}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={input.value}
        >
          {children}
        </Select>
      </FormControl>
);

renderSelectField.propTypes = {
    label : propTypes.string,
    input : propTypes.object,
    meta : propTypes.object,
    chrildren : propTypes.object,
    classes : propTypes.object
}

export default withStyles(styles)(renderSelectField);
