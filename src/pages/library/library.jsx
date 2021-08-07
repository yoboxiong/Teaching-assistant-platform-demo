import React from 'react'
import './library.less'
//import {Redirect,BrowserRouter,Route,Switch} from 'react-router-dom'
import problem from '../../assets/images/1.png'
import answer from '../../assets/images/2.png'
// import Login from './pages/login/login'

export default class Library extends React.Component {
  
  state = {
    isMathjaxConfig:false // 防止重复调用Config，造成性能损耗
  }
  initMathjaxConfig = () => {
    if (!window.MathJax) {
      return;
    }         
    window.MathJax.Hub.Config({
      //loader: {load: ["input/tex", "output/chtml"]},
      loader: {load: ['[tex]/textmacros']},
      tex: {packages: {'[+]': ['textmacros']}},
      showProcessingMessages: false, //关闭js加载过程信息
      messageStyle: "none", //不显示信息
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]], //行内公式选择符
        displayMath: [["$$", "$$"], ["\\[", "\\]"]], //段内公式选择符
        skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a",'annotation', 'annotation-xml'], //避开某些标签
        ignoreClass: 'crayon-.*|comment-content"|"head-class'
      },
      TeX: {
        extensions: ["AMSmath.js", "AMSsymbols.js","mhchem.js","boldsymbol.js","color.js","extpfeil.js","AMScd.js"],
        equationNumbers: {
        autoNumber: ["AMS"],
        useLabelIds: true
        },
        Macros: {
          hfill: "{}"
        }
      },
      "HTML-CSS": {
        availableFonts: ["STIX", "TeX"], //可选字体
        showMathMenu: false //关闭右击菜单显示
      }
    });
    this.setState({
      isMathjaxConfig: true
    }) 
  };
  render(){
    const {isMathjaxConfig} = this.state
    if (isMathjaxConfig === false) { // 如果：没有配置MathJax
      this.initMathjaxConfig();
    }
    window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]);
    return (
      <div className='library-sheet'>
         <img alt='问题' src={problem}></img>
         <br/>
         <img alt='答案' src={answer}></img>
         
        $$\int_a^bf(x)dx 你好\sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}$$
        $$\int_a^bf(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}$$
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block" >
  <mtext> (4) </mtext>
  <msub>
    <mi>D</mi>
    <mrow>
      <mi>n</mi>
    </mrow>
  </msub>
  <mo>=</mo>
  <mrow data-mjx-texclass="INNER">
    <mo data-mjx-texclass="OPEN">|</mo>
    <mtable columnalign="center center center center center" columnspacing="1em" rowspacing="4pt">
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mo>⋯</mo>
        </mtd>
        <mtd>
          <mn>1</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>2</mn>
        </mtd>
        <mtd>
          <mn>2</mn>
        </mtd>
        <mtd>
          <mo>⋯</mo>
        </mtd>
        <mtd>
          <mn>2</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>2</mn>
        </mtd>
        <mtd>
          <mn>3</mn>
        </mtd>
        <mtd>
          <mo>⋯</mo>
        </mtd>
        <mtd>
          <mn>3</mn>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mrow>
            <mo>⋮</mo>
          </mrow>
        </mtd>
        <mtd>
          <mrow>
            <mo>⋮</mo>
          </mrow>
        </mtd>
        <mtd>
          <mrow>
            <mo>⋮</mo>
          </mrow>
        </mtd>
        <mtd>
          <mo>⋱</mo>
        </mtd>
        <mtd>
          <mrow>
            <mo>⋮</mo>
          </mrow>
        </mtd>
      </mtr>
      <mtr>
        <mtd>
          <mn>1</mn>
        </mtd>
        <mtd>
          <mn>2</mn>
        </mtd>
        <mtd>
          <mn>3</mn>
        </mtd>
        <mtd>
          <mo>⋯</mo>
        </mtd>
        <mtd>
          <mi>n</mi>
        </mtd>
      </mtr>
    </mtable>
    <mo data-mjx-texclass="CLOSE">|</mo>
  </mrow>
</math>
{/* 行列式第$i$行，第$j$列元素的余子式记为${{M}_{ij}}$，代数余子式记为${{A}_{ij}}$.若$\text{D=}\left| \begin{matrix}5 & 2 & 5 & -1  \\5 & -1 & 0 & 0  \\-4 & 0 & 1 & 0  \\2 & 0 & 0 & -1  \\\end{matrix} \right|$ ，则${{M}_{11}}+{{M}_{12}}+{{M}_{13}}+{{M}_{14}}=(\quad )\ $ . */}

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