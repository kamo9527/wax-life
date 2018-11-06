// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const utils = require('../tools/utils')
exports.call = async (event, context) => {
  const time = Date.now() + (8 * 60 * 60 * 1000)
  const updataInfo = { // 需要修改的字段
    courier: event.courier,
    status: 'sending',
    fh_time: utils.formatTime(time, 'yyyy-MM-dd hh:mm:ss'),
    update_time: time
  }
  try {
    const result = await db.collection('orders').where({
        orderId: event.orderId
      }).update({
        data: updataInfo
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
