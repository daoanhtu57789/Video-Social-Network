import axios from 'axios';

//node js
class axiosService {
    constructor(){
        //tạo ra đối tượng axios
        const instance = axios.create();
        //Response interceptor nhận hai đối số
        // đối số đầu tiên là một response callback và câu lệnh thứ hai là response error
        instance.interceptors.response.use(this.handleSuccess,this.handleError);
        //gán instance cho thành global
        this.instance = instance;
    }
    
    handleSuccess(resp){
        return resp;
    }

    handleError(error){
        return Promise.reject(error);
    }

    //thực hiện hàm lấy dữ liệu
    get(url){
        return this.instance.get(url);
    }
}

export default new axiosService();