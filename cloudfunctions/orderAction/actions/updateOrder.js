// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const utils = require('../tools/utils')
exports.call = async (event, context) => {
  const data = event.data
  try {
    const result = await db.collection('orders').where({
        orderId: data.id
      })
      .update({
        data
      })
    const res = {
      code: 0,
      msg: 'success'
    }
    return res
  } catch (e) {
    return e
  }
}
