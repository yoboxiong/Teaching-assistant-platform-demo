//进行local数据存储管理的工具模块
import store from 'store'
const USER_KEY ='user_key'

const saveUser = (user) =>{
    //localStorage.serItem(USER_KEY,JSON.stringify(user))
    store.set(USER_KEY,user)
}
const getUser=()=>{
    //return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
    return store.get(USER_KEY) || {}
}
const removeUser=()=>{
    //localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
}

export{
    saveUser,
    getUser,
    removeUser
}
