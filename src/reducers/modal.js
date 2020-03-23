import * as modalContants from './../constants/modal';

const initialState = {
    showModal : false,
    component : null,
    title : ''
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

        case modalContants.CHANGE_MODAL_CONTENT :{
            const {component} = action.payload;
            return {
                ...state,
                component : component
            }
        }

        case modalContants.CHANGE_MODAL_TITLE :{
            const {title} = action.payload;
            return {
                ...state,
                title : title
            }
        }

        default : 
            return {
                ...state
            }
    };
};

export default reducer;