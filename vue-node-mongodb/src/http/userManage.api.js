// import { rpcCall } from './rpcapi'
// import { BSCP_SYSTEM_MASSAGE, BSCP_SYSTEM_SETTING, BSCP_EVENT, BSCP_NETWORK, BSCP_EQUIPMENT, BSCP_YUNTAI } from '../store/constants'

// 获取用户列表
export const userList = () => {
  console.log('这是API文件')
}

// 用户添加
// export const userAdd = ({ session, count, users }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.add'
//   const params = {
//     count,
//     users
//   }
//   return rpcCall(url, method, params, true)
// }

// // 用户删除
// export const userDelete = ({ session, count, users }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.del'
//   const params = {
//     count,
//     users
//   }
//   return rpcCall(url, method, params, true)
// }

// // 用户修改密码
// export const userEditor = ({ session, count, users }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.edit'
//   const params = {
//     count,
//     users
//   }
//   return rpcCall(url, method, params, true)
// }

// // 获取角色远程访问权限
// export const getRmtPrivilege = ({ session }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.Role.getRmtPrivilege'
//   const params = {}
//   return rpcCall(url, method, params, true)
// }

// // 设置角色远程访问权限
// export const setRmtPrivilege = ({ session }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.Role.setRmtPrivilege'
//   const params = {}
//   return rpcCall(url, method, params, true)
// }

// // 获得普通用户权限
// export const getOrdinaryUserPrivilege = ({ session, user }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.getPrivilege'
//   const params = {
//     user
//   }
//   return rpcCall(url, method, params, true)
// }

// // 设置普通用户权限
// export const setOrdinaryUserPrivilege = ({ session, name, priv }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.setPrivilege'
//   const params = {
//     name,
//     priv
//   }
//   return rpcCall(url, method, params, true)
// }

// // 用户修改口令（密码）
// export const editorUserPasswd = ({ session, count, users }) => {
//   const url = '/rest/2.0/res/auth_token?session=' + session
//   const method = 'Security.User.passwd'
//   const params = {
//     count,
//     users
//   }
//   return rpcCall(url, method, params, true)
// }

// // 系统信息权限
// export const tgtIdsHasSystemInfo = (tgtIds) => {
//   return tgtIds & BSCP_SYSTEM_MASSAGE
// }

// export const setTgtIdsHasSystemInfo = (tgtIds) => {
//   return tgtIds | BSCP_SYSTEM_MASSAGE
// }

// // 系统设置权限
// export const tgtIdsHasSystemSettings = (tgtIds) => {
//   return tgtIds & BSCP_SYSTEM_SETTING
// }

// export const setTgtIdsHasSystemSettings = (tgtIds) => {
//   return tgtIds | BSCP_SYSTEM_SETTING
// }

// // 事件管理权限
// export const tgtIdsHasEventManage = (tgtIds) => {
//   return tgtIds & BSCP_EVENT
// }

// export const setTgtIdsHasEventManage = (tgtIds) => {
//   return tgtIds | BSCP_EVENT
// }

// // 网络设置权限
// export const tgtIdsHasNetwork = (tgtIds) => {
//   return tgtIds & BSCP_NETWORK
// }

// export const setTgtIdsHasNetwork = (tgtIds) => {
//   return tgtIds | BSCP_NETWORK
// }

// // 设备管理权限
// export const tgtIdsHasEquipment = (tgtIds) => {
//   return tgtIds & BSCP_EQUIPMENT
// }

// export const setTgtIdsHasEquipment = (tgtIds) => {
//   return tgtIds | BSCP_EQUIPMENT
// }

// // 云台控制权限
// export const tgtIdsHasYuntai = (tgtIds) => {
//   return tgtIds & BSCP_YUNTAI
// }

// export const setTgtIdsHasYuntai = (tgtIds) => {
//   return tgtIds | BSCP_YUNTAI
// }
