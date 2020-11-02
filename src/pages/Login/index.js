import React,{Component} from 'react';
// import axios from '../../Utils/axios'
import api from '../../api/index'

console.log(api);
// import {HashRouter,Link,Router,Switch,Redirect} from 'react-router-dom'
class Login extends Component{
    state={}
    constructor(){
      super()
      this.state={
        userName:'',
        passWord:''
      }
    }

    login=async()=>{
      // console.log(this.state);
      let {userName,passWord}=this.state
      // let url='/mall/admin/login'
      let result= await api.login({userName,passWord})
      console.log('rusult');
      // axios.post(url,{userName,passWord}
      //   .then((data)=>{
      //   console.log(data);
      // })
      //   .catch((err)=>{
      //     console.log(err);
      //   }) 
      // )

    }


    // 或者用promise的链式调用
    
    // login=()=>{
    //   let {userName,passWord}=this.state
    //   api.login({userName,passWord})
    //   .then((data)=>{
    //       console.log(data);
    //     })
    //       .catch((err)=>{
    //         console.log(err);
    //       }) 
    // }

  render(){

    let {userName,passWord}=this.state
    
    return(

        <div>
          用户名：<input type='text' value={userName} onChange={(e)=>{
            this.setState({userName:e.target.value})
          }}></input>
          密码：<input type='password' value={passWord} onChange={(e)=>{
            this.setState({passWord:e.target.value})
          }}></input><br/>
          <button onClick={this.login.bind(this)}>登录</button>
        </div>
    );
  }
}


export default Login;
