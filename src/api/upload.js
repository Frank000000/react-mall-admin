
import axios from "../Utils/axios";

class Upload{
    img(payload){
        let url='/mall/upload'
        return axios.post(url,payload)
    }
}

export default new Upload()