import React from 'react'
import {Button} from 'antd'
import './home.less'

export default class Home extends React.Component {
  render(){
    return (
      <div className='home-content'>
          <dl className='home-content-script'>
            <dt>线代好助教</dt>
            <dd>用AI让班级管理变简单</dd>
          </dl>
          <Button type="primary" shape="round" size="large">课堂管理</Button>
      </div>

    )
  }
}