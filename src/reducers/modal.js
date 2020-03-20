import * as modalContants from './../contanst/modal';

const initialState = {
    showModal : false,
    component : null
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case modalContants.SHOW_MODAL :{
            return {
                ...state,
                showModal : true
            }
        }

        case modalContants.HIDE_MODAL :{
            return {
                ...state,
                showModal : false
            }
        }

        default : 
            return {
                ...state
            }
    };
};

export default reducer;