// 优化1：统一处理请求异常
// 1）在外层包一个自己创建的promise对象
// 2）在请求出错时，不reject(error)，而是显示错误提示（好处是调用时可以不进catch
//优化2：异步得到的不是response，而是response.data
//在请求成功resolve时：resolve(response.data)

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject) =>{
        let promise
        if(type==='GET'){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }

        promise.then(response =>{
            resolve(response.data)
        }).catch(error =>{
            message.error('请求出错'+ error.message)
        })
    })

}