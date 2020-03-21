import React, { Component } from 'react';
//css 
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
//img
import loadingIcon from './../../assets/images/loading.gif';
//kết nối với store
import {connect} from 'react-redux';

class GlobalLoading extends Component {
    render() {
        const {classes , showLoading} = this.props;
        let xhtml = null;
        if(showLoading){
            xhtml = (
                <div className={classes.loading}>
                    <img src={loadingIcon} alt="Loading" className={classes.icon}></img>
                </div>
            );
        }
        return xhtml;
    }
};

const mapStateToProps = (state) =>{
    return {
        showLoading : state.ui.showLoading
    }
}

export default connect(mapStateToProps,null)(withStyles(styles)(GlobalLoading));