import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import './index.less'
import { Menu, Input,Button, message,Modal,Form,Avatar,Row,Col} from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons';
import LinkButton from '../link-button'
import logo from '../../assets/images/logo.jpg'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import {saveUser,removeUser} from '../../utils/storageUtils'
const { SubMenu } = Menu;
const { Search } = Input;

const onSearch = value => console.log(value);

class Head extends React.Component{
  formRefLogin1 = React.createRef()
  formRefLogin2 = React.createRef()
  formRefRegister = React.createRef()
  state = {
    showStatus:0,//标识创建/更改班级确认框是否显示，0：都不显示，1：显示登录，2：显示注册
    loading: 0,//倒计时标识，0：都未发送验证码，1：登录验证，2：注册验证
    yztime: 60,
  }

  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if(!item.children){
        return(
        <Menu.Item key={item.key} style={{padding:'0 50px'}} icon={item.icon}>
          <Link to={item.key}>{item.title}</Link>
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

  //倒计60s
  count = () => {
    let { yztime } = this.state;
    let siv = setInterval(() => {
      this.setState({ yztime: (--yztime) }, () => {
        if (yztime <= -1) {
          clearInterval(siv);　　//倒计时( setInterval() 函数会每秒执行一次函数)，用 clearInterval() 来停止执行:
          this.setState({ loading: 0, yztime: 60 })
        }
      });
    }, 1000);
  }

  verifiedSubmitLogin = () => {
    this.setState({ loading: 1 });
    //e.preventDefault();
    if (this.state.yztime !== 0) {
      this.count();
    }
    //发送验证码
    //let verify = { phone: values.accountname, gettype: 1 }
      //this.props.dispatch({ type: '***/***', payload: { verify } });
  }

  verifiedSubmitRegister = () => {
    this.setState({ loading: 2 });
    //e.preventDefault();
    if (this.state.yztime !== 0) {
      this.count();
    }
    //发送验证码
  }

  //响应点击取消：隐藏确认框
  handleCancel = () =>{
    //清除输入数据
    if(this.state.showStatus===1){
      this.formRefLogin1.current.resetFields();
      this.formRefLogin2.current.resetFields();
    }
    if(this.state.showStatus===2){
      this.formRefRegister.current.resetFields();
    }
    this.setState({
      showStatus:0
    })
  }

  showLogin = ()=>{
    this.setState({
      showStatus:1
    })
  }

  showRegister = ()=>{
    this.setState({
      showStatus:2
    })
  }

  vercodeSheet = ()=>{
    document.getElementById('loginsheet1').style.display = 'none'
    document.getElementById('loginsheet2').style.display = 'inline'
  }

  passwordSheet = ()=>{
    document.getElementById('loginsheet1').style.display = 'inline'
    document.getElementById('loginsheet2').style.display = 'none'
  }

  handleSubmit = async (value) =>{
    const{username,password} = value
    //跟接口的参数名字一致 
    // reqLogin(username,password).then(response=>{
    //   console.log('成功了',response.data)
    // }).catch(error =>{
    //   console.log('失败了',error)
    // })
    const result = await reqLogin(username,password)
    //console.log('请求成功',response.data)
    //const result = response.data
    if(result.status===true){
      message.success('登陆成功')
      document.getElementById('login1').style.display = 'none'
      document.getElementById('login2').style.display = 'flex'

      memoryUtils.user = result.data //保存到内存
      saveUser(result.data) //保存到local

      this.props.history.replace('/')
      this.formRefLogin1.current.resetFields();
      this.setState({
        showStatus:0,
      })
    }else{
      message.error(result.msg)
    }
  }
  
  login1 = async ()=>{
    try {
	    const values = await this.formRefLogin1.current.validateFields();
      console.log('Success:', values);
      this.handleSubmit(values)
	    //message.success('提交校验成功')
	  } catch (errorInfo) {
	    console.log('Failed:', errorInfo);
	    //message.warn('提交校验失败')
	  }
  }

  login2 = async ()=>{
    try {
	    const values = await this.formRefLogin2.current.validateFields();
	    console.log('Success:', values);
	    //message.success('提交校验成功')
	  } catch (errorInfo) {
	    console.log('Failed:', errorInfo);
	    //message.warn('提交校验失败')
	  }
  }
  
  //
  showAuthor = () =>{
    this.props.history.push('/author')
  }
  quit = () =>{
    document.getElementById('login1').style.display = 'flex'
    document.getElementById('login2').style.display = 'none'
    
    removeUser()//清除内存user数据
    window.location.reload()//强制刷新页面
  }


  componentWillMount(){ //第一次render之前 
    this.menuNodes = this.getMenuNodes(menuList)
  }

  componentDidMount(){
    const user = memoryUtils.user
    if(!user.username){
      document.getElementById('login1').style.display = 'flex'
      document.getElementById('login2').style.display = 'none'
    }else{
      document.getElementById('login1').style.display = 'none'
      document.getElementById('login2').style.display = 'flex'
    }
  }


  render(){
    //得到当前请求的路由路径
    const path = this.props.location.pathname
    const openKey = this.openKey
    const {showStatus,loading,yztime} = this.state
    const user = memoryUtils.user
    //const identityname = this.identityname
    //const avatar = this.avatar

    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} alt="logo"/>
                <h1>线代好助教</h1>
            </div>
            <div className="header-middle">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                    this.menuNodes
                    }
                </Menu>
            </div>
            <div className="header-right">
                <Search 
                    placeholder="请输入搜索内容" 
                    allowClear 
                    onSearch={onSearch} 
                    style={{ width: 250, margin: '0 50px' }}
                    size="large" 
                    enterButton />
                {/* <div><input type="button" value="登录" onClick={this.LoginDialog()} className='header-right-button' /></div> */}
                <div id='login1'>
                  <div><input type="button" value="登录" onClick={this.showLogin} className='header-right-button' /></div>
                  <div><input type="button" value="注册" onClick={this.showRegister} className='header-right-button' /></div>  
                </div>
                <div id='login2'>
                {/* icon={<UserOutlined /> }*/}
                  <Avatar style={{marginTop:'15px'}} size="large" src={user.avatar} alt='U' />
                  <div><input type="button" value={user.username} onClick={this.showAuthor} className='header-right-button' /></div>
                  <div><input type="button" value="退出" onClick={this.quit} className='header-right-button' /></div>
                </div>
            </div>
            <Modal
              centered
              visible={showStatus===1}
              bodyStyle={{height:'450px'}}
              wrapClassName={'login-css'}
              onCancel={this.handleCancel}
              footer = {null}
              closable = {false}
              width={400}
            >
              <div className='login-css-sheet'>
                <div className='login-css-sheet-title'>登录</div>
                <div id='loginsheet1'>
                  <Form ref={this.formRefLogin1}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: '请输入用户名/手机号！',
                        },
                      ]}
                    >
                      {
                        <Input placeholder='用户名或手机号' />
                      }
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码！',
                        },
                      ]}
                    >
                      {
                        <Input placeholder='请输入密码' />
                      }
                    </Form.Item>
                  </Form> 
                  <LinkButton onClick={this.vercodeSheet}>验证码登录</LinkButton>
                  <LinkButton style={{float:'right'}} >忘记密码</LinkButton>
                  <br/><br/>
                  <Button 
                    type='primary'
                    onClick={this.login1}
                    style={{width:'100%',borderRadius:'20px',height:'40px',backgroundColor:'#5F53B4'}}
                  >
                    登录
                  </Button>
                  <br/><br/>
                  <LinkButton onClick={this.showRegister} style={{float:'right'}} >注册账户</LinkButton>
                </div>

                <div id='loginsheet2'>
                  <Form ref={this.formRefLogin2}>
                    <Form.Item
                      name="phonenum"
                      rules={[
                        {
                          required: true,
                          message: '请输入手机号！',
                        },
                      ]}
                    >
                      {
                        <Input placeholder='手机号' />
                      }
                    </Form.Item>
                    <Form.Item
                      name="vericode"
                      rules={[
                        {
                          required: true,
                          message: '请输入验证码！',
                        },
                      ]}
                    >
                      <Row gutter={13}> 
                        <Col span={15}>
                          {
                          <Input placeholder='验证码' />
                          }
                        </Col>
                        <Col span={9}>
                          <Button 
                          type='primary'
                          onClick={this.verifiedSubmitLogin}
                          style={{borderRadius:'20px',height:'40px',backgroundColor:'#FFFFFF',color:'#A5BADF',borderColor:'#A5BADF'}}
                          >
                            {loading===2 ? yztime + '秒' : '获取验证码'}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form> 
                  <Button 
                    type='primary'
                    onClick={this.login2}
                    style={{width:'100%',borderRadius:'20px',height:'40px',backgroundColor:'#5F53B4'}}
                  >
                    登录
                  </Button>
                  <br/><br/>
                  <LinkButton onClick={this.passwordSheet}>账号登录</LinkButton>
                  <LinkButton onClick={this.showRegister} style={{float:'right'}} >注册账户</LinkButton>
                </div>
                
              </div> 
            </Modal>
            <Modal
              visible={showStatus===2}
              bodyStyle={{height:'630px'}}
              wrapClassName={'register-css'}
              onCancel={this.handleCancel}
              footer = {null}
              closable = {false}
              width={400}
            >
              <div className='register-css-sheet'>
                <div className='register-css-sheet-title'>注册</div>
              
                <Form ref={this.formRefRegister}>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '请输入用户名!',
                      },
                    ]}
                  >
                    {
                      <Input placeholder='用户名' />
                    }
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入密码!',
                      },
                    ]}
                  >
                    {
                      <Input placeholder='密码' />
                    }
                  </Form.Item>
                  <Form.Item
                    name="invitecode"
                    rules={[
                      {
                        required: true,
                        message: '请输入邀请码!',
                      },
                    ]}
                  >
                    {
                      <Input placeholder='请输入邀请码' />
                    }
                  </Form.Item>
                  <Form.Item
                    name="school"
                    rules={[
                      {
                        required: true,
                        message: '请输入学校!',
                      },
                    ]}
                  >
                    {
                      <Input placeholder='请输入学校' />
                    }
                  </Form.Item>
                  <Form.Item
                    name="phonenum"
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号！',
                      },
                    ]}
                  >
                    {
                      <Input placeholder='手机号' />
                    }
                  </Form.Item>
                  <Form.Item
                    name="vericode"
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码!',
                      },
                    ]}
                  >
                    <Row gutter={13}> 
                      <Col span={15}>
                        {
                        <Input placeholder='验证码' />
                        }
                      </Col>
                      <Col span={9}>
                        <Button 
                        type='primary'
                        onClick={this.verifiedSubmitRegister}
                        style={{borderRadius:'20px',height:'40px',backgroundColor:'#FFFFFF',color:'#A5BADF',borderColor:'#A5BADF'}}
                        >
                          {loading===2 ? yztime + '秒' : '获取验证码'}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type='primary'
                      htmlType='submit'
                      // onClick={this.Login}
                      style={{width:'100%',borderRadius:'20px',height:'40px',backgroundColor:'#5F53B4'}}
                    >
                      注册
                    </Button>
                  </Form.Item>
                </Form>
                <LinkButton onClick={this.showLogin} style={{display:'block',margin:'0 auto' }}>已有账号，点击登录</LinkButton>
              </div> 
            </Modal>
        </div>
        
    )
  }
}


// withRouter高阶组件：
// 包装非路由组件，返回一个新的组件
// 新的组件向非路由组件传递3个属性：history/location/match
export default withRouter(Head)