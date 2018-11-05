// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

exports.call = async (event, context) => {
    const openId = event.userInfo.openId
    const isManager = event.isManager
    const config = {}
    config.status = event.status
    
    if(!isManager) {
        config.openId = openId
    }

    try {
        const result = await db.collection('orders').where(config).get()
        const res = {
            code: 0, 
            data: result.data,
            msg: 'success'
        }
        return res

    }catch(e) {
        return e
    }
}