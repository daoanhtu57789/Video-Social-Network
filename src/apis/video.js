//import để lấy các hàm của axios
import axiosService from './../commons/axiosService';
//http://localhost:3000
import {API_ENDPOINT} from './../constants/index';
//import query-string để chuyển đổi
import queryString from 'query-string';
const url = 'videos';

export const getVideos = (param = {}) =>{
    let queryParams = '';
    //kiểm tra param nhận vào
    if(Object.keys(param).length > 0){
        queryParams = `?${queryString.stringify(param)}`;
        //VD
        // parsed.foo = 'unicorn';
        // parsed.ilike = 'pizza';
        
        // const stringified = queryString.stringify(parsed);
        //=> 'foo=unicorn&ilike=pizza'
    }
    return axiosService.get(`${API_ENDPOINT}/${url}/${queryParams}`);
}