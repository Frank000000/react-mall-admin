import axios from "../Utils/axios";

class Admin{
    login(payload){
        console.log('login');
        let url='/mall/admin/login'
        return axios.post(url,payload)
    }
}

export default new Admin()