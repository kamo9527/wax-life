// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const uuid = require('node-uuid')

exports.call = async (event, context) => {
    const data = event.data
    const create_time = new Date().getTime()
    data.openId = event.userInfo.openId,
    data.orderId = uuid.v1() 
    data.create_time = create_time
    data.update_time = create_time

    try {
        await db.collection('orders').add({
          data: data
        })

        const res = {
            code: 0, 
            msg: 'success'
        }
        return res
    }catch(e) {
        return e
    }
}