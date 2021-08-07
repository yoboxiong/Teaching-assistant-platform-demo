import React from 'react'
//import {Redirect,BrowserRouter,Route,Switch} from 'react-router-dom'
import { Button,Card,Table,message,Modal,Input,Form} from 'antd';
import {
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import qrimg from '../../assets/images/qrcode.png'
// import Login from './pages/login/login'
import {reqClass,reqAddClass,reqUpdateClass,reqDeleteClass} from '../../api'
import LinkButton from '../../components/link-button'
import './classroom.less'

import QRCode from 'qrcode.react'

const { confirm } = Modal;

export default class Classroom extends React.Component {
  formRefUpdate = React.createRef()
  formRefAdd = React.createRef()
  state = {
    loading:false,
    classes:[],
    showStatus:0,//标识创建/更改班级确认框是否显示，0：都不显示，1：显示创建，2：显示更改
    showQrStatus:false,//二维码
  }

  //初始化Table所有列的数组
  initColumns = () =>{
    this.columns = [
      {
        title: '班级',
        dataIndex: 'cName',
        key: 'cName',
      },
      {
        title: '学生人数',
        dataIndex: 'cNum',
        key: 'cNum',
      },
      {
        title: '操作',
        //width:600,
        render: (category) => (
          <span className='operate'>
            <LinkButton>↑</LinkButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <LinkButton>↓</LinkButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <LinkButton onClick={() =>this.showUpdate(category)}>重命名</LinkButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <LinkButton onClick={() =>this.showConfirm(category)}>删除</LinkButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        )
      },
      {
        title: '邀请码',
        width:200,
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '二维码',
        render: (category) => (
          <span className='operate'>
            <input onClick={() =>this.showQrcode(category)} type="image" src={qrimg} alt='qrcode' width="25px" height="25px" style={{outline:'none'}} />
          </span>
        )
      },
    ];
  }
  //请求班级列表
  getClass = async() =>{
    this.setState({loading:true})
    const result = await reqClass('0')
    this.setState({loading:false})
    if(result.status===true){
      const classes = result.data
      this.setState({
        classes
      })
    }else{
      message.error('获取班级列表失败')
    }
  }
  //响应点击取消：隐藏确认框
  handleCancel = () =>{
    //清除输入数据
    if(this.state.showStatus===1){
      this.formRefAdd.current.resetFields();
    }
    if(this.state.showStatus===2){
      this.formRefUpdate.current.resetFields();
    }
    
    this.setState({
      showStatus:0,
      showQrStatus:false
    })
  }
  //显示创建确认框
  showAdd =()=>{
    this.setState({
      showStatus:1
    })
  }
  //创建班级
  addClass = async ()=>{
    this.setState({
      showStatus:0
    })
    const cName = this.formRefAdd.current.getFieldValue('cName')
    const parentID = '0'
    //清除输入数据
    this.formRefUpdate.current.resetFields();
    //发请求创建班级
    const result = await reqAddClass({cName,parentID})
    if (result.status===0){
      this.getClass()
    }
  }
  //显示更改名称确认框
  showUpdate = (category) =>{
    this.category = category
    this.setState({
      showStatus:2
    })
  }
  //更改班级名称
  updateClass = async () =>{
    this.setState({
      showStatus:0
    })

    const cID = this.category.code
    const cName = this.formRefUpdate.current.getFieldValue('cName')
    //清除输入数据
    this.formRefUpdate.current.resetFields();
    //发请求更改名称
    const result = await reqUpdateClass({cID,cName})
    if (result.status===0){
      this.getClass()
    }
  }
  //删除班级
  showConfirm = (category) => {
    confirm({
      title: '是否删除\''+category.cName+'\'?',
      icon: <ExclamationCircleOutlined />,
      centered:true,
      content: '温馨提示：删除后数据无法恢复！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk (){
        const cID = category.code
        const cName = category.cName

        //发请求删除班级
        const result = await reqDeleteClass({cID,cName})
        if (result.status===0){
          message.success('删除成功！')
          this.getClass()
        }  
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //显示二维码
  showQrcode = (category)=>{
    this.qrcategory = category
    this.setState({
      showQrStatus:true,
    })
  }
  //一键复制
  copy = () =>{
    const copyEle = document.querySelector('.qrsheet-content-title') // 获取要复制的节点
    const range = document.createRange(); // 创造range
    window.getSelection().removeAllRanges(); //清除页面中已有的selection
    range.selectNode(copyEle); // 选中需要复制的节点
    window.getSelection().addRange(range); // 执行选中元素
    const copyStatus = document.execCommand("Copy"); // 执行copy操作
    // 对成功与否定进行提示
    if (copyStatus) {
      message.success('复制成功');
    } else {
      message.fail('复制失败');
    }
    window.getSelection().removeAllRanges(); //清除页面中已有的selection
  }

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getClass()
  }

  render(){
    const {classes,loading,showStatus,showQrStatus} = this.state
    const category = this.category
    const qrcategory = this.qrcategory
    const qrcontent = "qrcode:" + JSON.stringify(this.qrcategory)


    const title= (
        <Button 
        type='primary'
        onClick={this.showAdd}
        style={{height:'50px',borderRadius:'20px',padding:'0 20px'}} >
        <PlusOutlined />
        新建班级
      </Button>
    )

    return (
    <Card title={title} extra={<a href="#">More</a>}>
      <Table 
       rowKey='code'
       loading={loading}
       dataSource={classes} 
       columns={this.columns} />
      <Modal
        title="新建班级"
        centered
        visible={showStatus===1}
        onOk={this.addClass}
        onCancel={this.handleCancel}
        okText="完成"
        cancelText="取消"
      >
        <Form ref={this.formRefAdd}>
          <Form.Item
            label="班级名称"
            name="cName"
            rules={[
              {
                required: true,
                message: '请输入班级名称!',
              },
            ]}
          >
            {
               <Input placeholder='请输入班级名称' />
            }
          </Form.Item>
        </Form>  
      </Modal>
      <Modal
        title="更改名称"
        centered
        visible={showStatus===2}
        onOk={this.updateClass}
        onCancel={this.handleCancel}
        okText="完成"
        cancelText="取消"
      >
        <Form ref={this.formRefUpdate}>
          <Form.Item
            label="班级名称"
            name="cName"
            initialValue={category===undefined?'':category.cName}
            rules={[
              {
                required: true,
                message: '请输入班级名称!',
              },
            ]}
          >
            {
               <Input placeholder='请输入班级名称' />
            }
          </Form.Item>
        </Form>  
      </Modal>
      <Modal
        //title="更改名称"
        centered
        visible={showQrStatus}
        bodyStyle={{height:'500px'}}
        wrapClassName={'qrsheet'}
        onCancel={this.handleCancel}
        footer = {null}
        width={450}
        //closable = {false}
      >
        <div className='qrsheet-content' >
          <span className='qrsheet-content-title'>邀请码:{qrcategory===undefined?'':qrcategory.code} </span>
          <LinkButton id='copybutton' onClick={this.copy} >一键复制</LinkButton>
          <br/>
          {/* <QRCode id='qrbutton' size={350} value='http://facebook.github.io/react/'/> */}
          <QRCode id='qrbutton' size={350} value={qrcontent}/>
        </div>
        
      </Modal>
    </Card>
    
    )
  }
}