import React, { Component } from 'react';
//css 
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'
class Login extends Component {
    render() {
        return (
            <div>
                Đăng Nhập
            </div>
        );
    }
}

export default withStyles(styles)(Login);  