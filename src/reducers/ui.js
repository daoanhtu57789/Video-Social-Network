import * as uiConstants from './../constants/ui';

const initialState = {
    showLoading : false,
    showSiderBar : true
};

const reducer = (state = initialState , action) => {
    switch(action.type){

        case uiConstants.SHOW_LOADING :{
            return {
                ...state,
                showLoading : true
            }
        }

        case uiConstants.HIDE_LOADING :{
            return {
                ...state,
                showLoading : false
            }
        }

        case uiConstants.SHOW_SIDERBAR :{
            return {
                ...state,
                showSiderBar : !state.showSiderBar
            }
        }


        default : {
            return {
                ...state
            }
        }
    };
};

export default reducer;