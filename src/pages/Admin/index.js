import React,{Component} from 'react';
import { Layout } from 'antd';
import style from './index.module.less'
import CustomNav from '../../components/CustomNav'
import HeaderNav from '../../components/HeaderNav'
import goodsApi from '../../api/goods'
const { Header, Content, Footer, Sider } = Layout;


class Admin extends Component{
 async componentDidMount(){
   let result=await goodsApi.Kindlist()
   console.log(result);
   
  }
    state={ }
  render(){  
    return(
    <Layout className={style.wrapper}>

      <Sider>
        <div className="logo" />
        <CustomNav></CustomNav>    
      </Sider>
      
      <Layout>
        <Header style={{background:'darkblue'}}>
          <HeaderNav></HeaderNav>
        </Header>
        <Content>
           
          {this.props.children}
        </Content>
        <Footer >Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    )
}
}

export default Admin;
