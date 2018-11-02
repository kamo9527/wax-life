// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
// Date添加时间格式化方法
require('../tools/moment').install()

const createOrderNumber = (showTime, createTime, orderPhone) => {
    // const firstTime = showTime.split(' ')[0].replace(/-/g, '').substring(0, 8)
    const randomNum = Math.floor(Math.random()*899 + 100)
    const secondTime = String(createTime).substring(8, )
    const phone = ('000000' + orderPhone.replace(/-/g, '')).split('').reverse().join('').substring(0, 6)

    return '' + randomNum + secondTime + phone 
}

exports.call = async (event, context) => {
    const data = event.data
    const create_time = new Date().getTime() + 8 * 3600 * 1000

    data.openId = event.userInfo.openId,
    data.create_time = create_time
    data.update_time = create_time
    data.show_time = new Date(create_time).formatDate('yyyy-MM-dd hh:mm:ss')
    data.courier = ''
    data.fh_time = ''
    data.sh_time = ''

    data.orderId = createOrderNumber(data.show_time, data.create_time, data.order_phone)

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