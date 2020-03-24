import * as uiConstants from './../constants/ui';

//có 2 cách viết
//cách 1 
// export const showLoading = () =>({
//     type : uiConstants.SHOW_LOADING
//});
//cách 2
export const showLoading = () =>{
    return {
        type : uiConstants.SHOW_LOADING
    }
};

export const hideLoading = () =>{
    return {
        type : uiConstants.HIDE_LOADING
    }
};

export const showSiderBar = () =>{
    return {
        type : uiConstants.SHOW_SIDERBAR
    }
};

export const showLoadingLogin = () =>{
    return {
        type : uiConstants.SHOW_LOADING_LOGIN
    }
};

export const hideLoadingLogin = () =>{
    return {
        type : uiConstants.HIDE_LOADING_LOGIN
    }
};


export const showLoadingSignup = () =>{
    return {
        type : uiConstants.SHOW_LOADING_SIGNUP
    }
};

export const hideLoadingSignup = () =>{
    return {
        type : uiConstants.HIDE_LOADING_SIGNUP
    }
};