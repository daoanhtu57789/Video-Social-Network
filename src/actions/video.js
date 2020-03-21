import * as videoConstants from './../constants/videos';
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