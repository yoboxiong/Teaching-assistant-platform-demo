import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import menuList from '../../config/leftnavConfig'
import './index.less'
import { Menu, Input,Button } from 'antd'
import {
    AppstoreOutlined,
  } from '@ant-design/icons';

const { SubMenu } = Menu;

class Leftnav extends React.Component{
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if(!item.children){
        return(
        <Menu.Item key={item.key} style={{paddingLeft:'10px',padding:'20px 0px 65px 30px',fontSize:'20px'}} icon={item.icon}>
          <Link to={item.key} style={{paddingLeft:'16px'}}>{item.title}</Link>
        </Menu.Item>
        )
      }else{
        //查找一个与当前请求路径匹配的子Item
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => cItem.key===path)
        if(cItem){
          this.openKey = item.key
        }
        
        return(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }

    })
  }

  componentWillMount(){ //第一次render之前 
    this.menuNodes = this.getMenuNodes(menuList)
  }


  render(){
    //得到当前请求的路由路径
    const path = this.props.location.pathname
    const openKey = this.openKey
    

    return (
        <div className="leftnav">
            <div className="leftnav-top">
                <Button type="primary" shape="round" size="large">
                <Link to='/homepage' style={{}}>线性代数主页</Link>
                </Button>
                <h1 className='leftnav-top-h1'>线性代数2020</h1>
            </div>
            <div className="leftnav-botttom" >
                <Menu
                    mode="inline"
                    //theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    
                >
                    <Menu.Item key='/classroom' style={{fontSize:'20px',paddingLeft:'10px',padding:'20px 0px 70px 30px'}} icon={<AppstoreOutlined />}>
                        <Link to='/classroom' style={{}}>班级活动</Link>
                    </Menu.Item>
                    <div style={{border:'1px solid #dcdcdc'}}></div>
                    {
                    this.menuNodes
                    }
                </Menu>
            </div>
        </div>   
    )
  }
}


// withRouter高阶组件：
// 包装非路由组件，返回一个新的组件
// 新的组件向非路由组件传递3个属性：history/location/match
export default withRouter(Leftnav)