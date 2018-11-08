// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
// Date添加时间格式化方法
require('../tools/moment').install()

exports.call = async (event, context) => {
    const data = event.data
    const create_time = new Date().getTime() + 8 * 3600 * 1000
    data.openId = event.userInfo.openId,
    data.create_time = create_time
    data.show_time = new Date(create_time).formatDate('yyyy-MM-dd hh:mm:ss')

    try {
        await db.collection('client').add({
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