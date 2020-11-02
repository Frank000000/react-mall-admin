import React,{Component} from 'react';
import {HashRouter,Link,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
import Administrator from '../src/pages/Administrator'
import GoodsList from './pages/Goods/GoodsList'
import GoodsAdd from './pages/Goods/GoodsAdd'
// import Goods from './pages/Goods/goods'


class App extends Component{
  render(){
    return(
      <HashRouter>
        <Route path='/login' component={Login}></Route>
        <Route path='/admin' render={()=>{
          return(
            <Admin>
              <Route path='/admin/user' component={User}></Route>
              {/* <Route path='/admin/goods' component={Goods}></Route> */}
              <Route path='/admin/administrator' component={Administrator}></Route>
              <Route path='/admin/goodsList' component={GoodsList}></Route>
              <Route path='/admin/goodsAdd' component={GoodsAdd}></Route>

            </Admin>
          )
        }}
        
        ></Route>

      </HashRouter>
    );
  }
}


export default App;
