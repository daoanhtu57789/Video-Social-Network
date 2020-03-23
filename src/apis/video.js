//import để lấy các hàm của axios
import axiosService from './../commons/axiosService';
//http://localhost:3000
import {API_ENDPOINT} from './../constants/index';
//import query-string để chuyển đổi
import queryString from 'query-string';
const url = 'videos';

export const getVideos = (params = {}) =>{
    let queryParams = '';
    //kiểm tra param nhận vào
    if(Object.keys(params).length > 0){
        queryParams = `?${queryString.stringify(params)}`;
        //VD
        // parsed.foo = 'unicorn';
        // parsed.ilike = 'pizza';
        
        // const stringified = queryString.stringify(parsed);
        //=> 'foo=unicorn&ilike=pizza'
    }
    return axiosService.get(`${API_ENDPOINT}/${url}/${queryParams}`);
};

export const postVideo = (data) =>{
    return axiosService.post(`${API_ENDPOINT}/${url}`,data);
}

export const deleteVideo = (idVideo) =>{
    return axiosService.delete(`${API_ENDPOINT}/${url}/${idVideo}`);
}


export const updateVideo = (idVideo,data) =>{
    return axiosService.update(`${API_ENDPOINT}/${url}/${idVideo}`,data);
}