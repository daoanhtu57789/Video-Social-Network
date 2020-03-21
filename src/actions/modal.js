import * as modalConstants from './../constants/modal';
export const showModal = () =>{
    return {
        type : modalConstants.SHOW_MODAL
    }
}

export const hideModal = () =>{
    return {
        type : modalConstants.HIDE_MODAL
    }
}