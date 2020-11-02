import React,{Component} from 'react';
import style from './index.module.less'
import {Card, message} from 'antd'
import uploadApi from '../../../api/upload'
import config from '../../../config'
import goodsApi from '../../../api/goods'
// import {HashRouter,Link,Router,Switch,Redirect} from 'react-router-dom'
class GoodsAdd extends Component{
    state={
      'name':'默认名字',
      'desc':'超好吃超好吃超好吃超好吃超好吃超好吃',
      'path':'sdfsdfdadf',
      'link':'http://example.com/movies.json',
      'putaway':0,
      'stock':0,
      'price':0,
      'unit':'件',
    }
    submit=async()=>{
      if(!this.state.path){
        message.info('请先上传图片')
      }
      let {code,msg}=await goodsApi.add(this.state)
      // console.log(result);
      if(code){
        return message.error(msg)
      }
      this.props.history.replace('/admin/goods')

    }
  
    upload= async ()=>{
      let file=this.refs.img.files[0]
      if(!file){
        return message.error('请先选一张图片')
      }

      let {size,type}=file
      let types=[
        'jpg','jpeg','gif','png'
      ]
      if(size>1000000){
        return message.warning('图片超过1m')
      }
      if(types.indexOf(type.split('/')[1])===-1){
        return message.warning('只允许jpg,jpeg,gif,png')
      }
      let formdata=new FormData()
      formdata.append('hehe',file)
      let result=await uploadApi.img()
      // console.log('看看formdata',formdata);
      let {code,msg,path}=await uploadApi.img(formdata)
      if(code){
        return message.error(msg)
      }
      this.setState({path})
    }

  render(){
    let {name,desc,path,link,putaway,stock,price,unit}=this.state
    return(
        <div className={style.box}>你好，金金
          <card title='商品添加'>
            名称：<input type='text' value={name} onChange={(e)=>{
              this.setState({name:e.target.value})
            }} /><br/>
            
            描述：<input type='text' value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
            }} /><br/>
            
            跳转链接：<input type='text' value={link} onChange={(e)=>{
              this.setState({link:e.target.value})
            }} /><br/>
            
            库存：<input type='number' value={stock} onChange={(e)=>{
              this.setState({stock:e.target.value})
            }} /><br/>
            
            发布状态：<select value={putaway} onChange={(e)=>{
              this.setState({putaway:Number(e.target.value)})
            }}></select>
              <option value={-1}>下架</option>
              <option value={0}>未上架</option>
              <option value={1}>上架</option>
            <br/>
            
            价格：<input type='number' value={price} onChange={(e)=>{
              this.setState({price:e.target.value})
            }} /><br/>
            
            件：<input type='text' value={unit} onChange={(e)=>{
              this.setState({unit:e.target.value})
            }} /><br/>
            <input type='file' ref='img' /><button onClick={this.upload}>上传图片</button>
            {/* 缩略图 */}
            {config.serverIp}
            <img width='120' height='80' src={config.serverIp+path} alt='' />

            <button onClick={this.submit}>添加</button>
            
          </card>
        </div>
    );
  }
}


export default GoodsAdd;
