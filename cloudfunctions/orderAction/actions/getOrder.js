// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

exports.call = async (event, context) => {
    const openId = event.userInfo.openId

    try {
        const result = await db.collection('orders').where({
            openId: openId, // 填入当前用户 openid
            status: event.status
        }).get()

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