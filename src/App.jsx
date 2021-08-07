import React from 'react'
import {Redirect,BrowserRouter,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'

import Head from './components/header'
import Home from './pages/home/home'
import Userguide from './pages/userguide/userguide'
import Class from './pages/class/class'

const {Footer, Header,Sider, Content } = Layout;
// import Login from './pages/login/login'

export default class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
      <Layout style={{height:'100%'}}>
        <Header style={{padding:'0'}}>
          <Head/>
        </Header>
        <Content style={{}}>
          <Switch>
            {/* exact一进入/地址就加载login界面 */} 
            <Route path='/home' component={Home}></Route>
            <Route path='/userguide' component={Userguide}></Route>
            <Route path='/' component={Class}></Route>
          </Switch> 
        </Content>
      </Layout>
      </BrowserRouter>

    )
  }
}
