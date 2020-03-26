import * as videoConstants from './../constants/videos';
//Load Video
export const fetchVideo = (params = {}) =>{
    return {
        type : videoConstants.FETCH_VIDEO,
        payload:{
            params
        }
    }
}

export const fetchVideoSuccess = (data) =>{
    return {
        type : videoConstants.FETCH_VIDEO_SUCCESS,
        payload:{
            data
        }
    }
}

export const fetchVideoFailed = (error) =>{
    return {
        type : videoConstants.FETCH_VIDEO_FAILED,
        payload:{
            error
        }
    }
}

//Post Video
export const addVideo = () =>{
    return {
        type : videoConstants.ADD_VIDEO
    }
}

export const addVideoSuccess = (data) =>{
    return {
        type : videoConstants.ADD_VIDEO_SUCCESS,
        payload:{
            data
        }
    }
}

export const addVideoFailed = (error) =>{
    return {
        type : videoConstants.ADD_VIDEO_FAILED,
        payload:{
            error
        }
    }
}

//Delete Video
export const deleteVideo = () =>{
    return {
        type : videoConstants.DELETE_VIDEO
    }
}

export const deleteVideoSuccess = (videoId) =>{
    return {
        type : videoConstants.DELETE_VIDEO_SUCCESS,
        payload:{
            videoId
        }
    }
}

export const deleteVideoFailed = (error) =>{
    return {
        type : videoConstants.DELETE_VIDEO_FAILED,
        payload:{
            error
        }
    }
}


//update Video
export const updateVideo = () =>{
    return {
        type : videoConstants.UPDATE_VIDEO
    }
}

export const updateVideoSuccess = (data) =>{
    return {
        type : videoConstants.UPDATE_VIDEO_SUCCESS,
        payload:{
            data
        }
    }
}

export const updateVideoFailed = (error) =>{
    return {
        type : videoConstants.UPDATE_VIDEO_FAILED,
        payload:{
            error
        }
    }
}

//đặt lại dữ liệu khi edit
export const setVideoEditing = (data) =>{
    return {
        type : videoConstants.SET_VIDEO_EDITING,
        payload:{
            data
        }
    }
}