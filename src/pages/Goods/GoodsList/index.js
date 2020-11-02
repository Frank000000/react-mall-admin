import React,{Component} from 'react';
// import {HashRouter,Link,Router,Switch,Redirect} from 'react-router-dom'
import style from './index.module.less'
import { Card, message,Table,Tag, Button,Pagination,Popconfirm} from 'antd';
import goodsApi from '../../../api/goods'

const { Meta } = Card
class GoodsList extends Component{
    state={
      pages:1,
      pageSize:2,
      list:[],
      count:0,
      columns:[
        
          {title: '_id',dataIndex: '_id',key: '_id',width:120,fixed:'left'},
          {title: '库存',dataIndex: 'stock',key: 'stock',width:120},
          {title: '价格',dataIndex: 'price',key: 'price',width:80},
          {title: '名称',dataIndex: 'name',key: 'name',width:120},
          {title: '缩略图',dataIndex: 'path',key: 'path',render(path) {
            // return(<img height='80' width='80' src={rootPath+path}></img>)
          },width:150},
          {title: '单位',dataIndex: 'unit',key: 'unit',width:80},
          {title: '状态',dataIndex: 'putaway',key: 'putaway',width:80,render(putaway){
            let obj={'-1':{color:'red',msg:'已下架'},'0':{color:'yellow',msg:'未上架'},'1':{color:'green',msg:'已上架'}}
            return(
            <Tag color={obj[putaway].color}>{obj[putaway].msg}</Tag>
            )
            console.log(putaway);
          }},
          {title: '描述',dataIndex: 'desc',key: 'desc',width:200},
          {title: '操作',key: 'action',width:120,fixed:'right',render:(recode)=> {
            return(
              <div>
                <Popconfirm title='你确定要删除这条数据吗？'
                  onConfirm={()=>{this.delGodds(recode._id)}}
                >
                  <Button type='danger' size='small'>删除</Button>
                </Popconfirm>
                <Popconfirm title='你确定要上架该商品吗' onConfirm={()=>{this.putAwayGodds(recode._id,recode.putaway)}}>
                  <Button type='warn' size='small'>上/下架</Button>
                </Popconfirm>
                
                
                <Button type='primary' size='small'>修改</Button>
                
              </div>
            )
          },},
      ]
    }
    componentDidMount(){
      this.getListData()
    }

    putAwayGodds=async(_id,putaway)=>{
      if(putaway===0||putaway===-1){putaway=1}
      else{putaway=0}
      let {code,msg}=await goodsApi.putaway(_id,putaway)
      if(code){return message.error(msg)}
      this.getListData()
      console.log(code,msg);
    }

    delGodds=async(_id)=>{
      let {code,msg}=await goodsApi.del(_id)
      if(code){return message.error(msg)}
      this.getListData()
      console.log(code,msg);
    }

    getListData=async()=>{
      let{page,pageSize}=this.state
      let {code,msg,list,count}=await goodsApi.list(page,pageSize)
      if (code!==0) {
        return message.error(msg)
      }
      this.setState({list,count})
    }
  render(){
    let {list,columns,count,pageSize,page}=this.state
    return(
      <div className={style.box}>
        <Card title='商品列表' className={style.card}>
          <Button type='primary' onClick={()=>{
            this.props.history.push('/admin/goodsadd')
          }}>商品添加</Button>
          <Table pagination={false} scroll={{y:300,x:840}} columns={columns} dataSource={list} rowKey='_id'></Table>
          <Pagination current={page} total={count} showQuickJumper pageSize={pageSize} onChange={(page,pageSize)=>{
            console.log(page);
            this.setState({page},()=>{this.getListData()})
            
          }}
          
          />
        </Card>
    
      </div>
      
    );
  }
}


export default GoodsList;
