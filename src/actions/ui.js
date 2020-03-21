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