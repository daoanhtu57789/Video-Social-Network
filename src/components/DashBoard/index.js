import React, { Component } from 'react';
//Thanh trên cùng
import Header from './Header/index';
//Thanh bên
//import SiderBar from './SiderBar/index';

import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
class DashBoard extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className = {classes.wrap}>
                <Header />
            </div>
        );
    }
}

export default withStyles(styles)(DashBoard) ;