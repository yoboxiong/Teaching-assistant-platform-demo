import React from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout, message } from 'antd';
import Leftnav from '../../components/left-nav'

import Homepage from '../homepage/homepage'
import Classroom from '../classroom/classroom'
import Homework from '../homework/homework'
import Source from '../source/source'
import Task from '../task/task'
import Chapter from '../chapter/chapter'
import Library from '../library/library'
import Tool from '../tool/tool'
import Author from '../author/author'
import memoryUtils from '../../utils/memoryUtils'

const {Footer, Sider, Content } = Layout;

export default class Class extends React.Component {
  render(){
    const user = memoryUtils.user
    if(!user.username){
      message.error('请先登录！')
      //render中实现跳转使用Redirect，事件回调函数中实现跳转使用history
      return <Redirect to='/home' />
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider style={{backgroundColor:'#fff',border:'1px solid #dcdcdc'}}>
          <Leftnav/>
        </Sider>
        <Content style={{margin:20,backgroundColor:'#fff',borderRadius:'15px',border:'1px solid #dcdcdc'}}>
          <Switch>
            {/* 一进入/地址就加载homepage界面  */}
            <Route path='/homepage' component={Homepage}/>
            <Route path='/classroom' component={Classroom}/>
            <Route path='/homework' component={Homework}/>
            <Route path='/source' component={Source}/>
            <Route path='/task' component={Task}/>
            <Route path='/chapter' component={Chapter}/>
            <Route path='/library' component={Library}/>
            <Route path='/tool' component={Tool}/> 
            <Route path='/author' component={Author}/> 
            <Redirect to='/homepage'/> 
          </Switch>
        </Content>
      </Layout>
    )
  }
}