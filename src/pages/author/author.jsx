import React from 'react'
import {Redirect} from 'react-router-dom'
import {Button,Avatar} from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons';
import './author.less'
import memoryUtils from '../../utils/memoryUtils'

export default class Author extends React.Component {
  render(){
    const user = memoryUtils.user
    return (
        <div className='author-css' >
          <Button className='author-css-title' type="primary" shape="round" size="large">
            <Avatar size={64} src={user.avatar} alt='U' />
            <span id='nickname' >{user.username} </span>
          </Button>
          <br/>
          <div className='author-css-content' >
            <Button  type="primary" shape="round" size="large">
              课堂签到
            </Button>
            <Button  type="primary" shape="round" size="large">
              邀请好友
            </Button>
            <Button  type="primary" shape="round" size="large">
              随堂测验
            </Button>
            <Button  type="primary" shape="round" size="large">
              联系客服
            </Button>
          </div>
          
        </div>

    )
  }
}