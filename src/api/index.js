// 包含应用中所有接口请求函数的模块
// 函数返回值promise对象
import ajax from './ajax'

// export function reqLogin(){
//     return ajax('',{username,password},'POST')
// }

//登录
export const reqLogin = (username,password) =>ajax('/userdb',{username,password},'POST')

//查询用户创建的所有班级
export const reqClass = (parentID) =>ajax('/class',{parentID})
//添加新建的班级
export const reqAddClass = (cName,parentID) =>ajax('/add',{cName,parentID},'POST')
//更新班级名称
export const reqUpdateClass = ({cID,cName}) =>ajax('/add',{cID,cName},'POST')
//删除班级
export const reqDeleteClass = ({cID,cName}) =>ajax('/add',{cID,cName},'POST')