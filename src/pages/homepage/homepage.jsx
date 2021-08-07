import React from 'react'
import './homepage.less'
//import {Redirect,BrowserRouter,Route,Switch} from 'react-router-dom'

// import Login from './pages/login/login'

export default class Homepage extends React.Component {
  render(){
    return (
      <div className='homepage-content'>
          <dl className='homepage-content-script'>
            <dt>线性代数：</dt>
            <dd>&emsp;&emsp;线性代数是数学的一个分支，它的研究对象是向量，
              向量空间（或称线性空间），线性变换和有限维的线性方程组。
              向量空间是线代数学的一个重要课题；因此，线性代数被广泛地应用于抽象代数和泛函分析中；
              通过解析几何，线性代数得以被具体表示。</dd>
          </dl>
      </div>
    //   <BrowserRouter>
    //   <Switch>
    //     {/* exact一进入/地址就加载login界面 */} 
    //     {/* <Route path='/login' component={Login}></Route> */}
        
    //     {/* <Redirect to='/login'/> */} 
    //   </Switch>
    // </BrowserRouter>
    )
  }
}