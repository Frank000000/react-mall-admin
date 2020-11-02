
import axios from "../Utils/axios";

class Goods{
    list( page=1,pagesSize=2){
        
        let url='/mall/goods'
        return axios.get(url,{params:{page,pagesSize}})
    }
    del(_id){
        let url=`/mall/goods/${_id}`
        return axios.delete(url)
    }
    putaway(_id,putaway){
        let url=`/mall/goods/${_id}/putaway`
        return axios.put(url,{putaway})
    }
    add(payload){
        let url='/mall/goods'
        return axios.post(url,payload)
    }
    Kindlist(){
        let url ='/mall/kind'
        return axios.get(url)
    }
    Kindadd(KindName){
        let url ='/mall/kind'
        return axios.post(url,{KindName})
    }
    Kindupdate(_id,KindName){
        let url ='/mall/kind/'+_id
        return axios.get(url)
    }
    Kinddel(_id){
        let url ='/mall/kind'+_id
        return axios.get(url)
    }
}

export default new Goods()