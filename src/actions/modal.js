import * as modalContanst from './../contanst/modal';
export const showModal = () =>{
    return {
        type : modalContanst.SHOW_MODAL
    }
}

export const hideModal = () =>{
    return {
        type : modalContanst.HIDE_MODAL
    }
}