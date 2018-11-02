/**
 *   wx.cloud.callFunction({
        name: 'orderAction',  // 云函数名称
        data: {               // 请求数据
          act: 'updateOrder', 
          orderId,            // 订单Id
          data：{             // 更新数据 
            status: 'sending',
            courier: '666666',
            fh_time: '2018-11-02'
          }               
        },
        complete: res => {}
    })
 * 
 * 
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// Date添加时间格式化方法
require('../tools/moment').install()

exports.call = async (event, context) => {
    const data = event.data

    try {
        const result = await db.collection('orders').where({
            orderId: event.orderId
        })
        .update({
            data
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