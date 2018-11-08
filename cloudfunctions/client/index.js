// 接口文件
const insertInfo = require('./actions/insertInfo')
// 云函数入口函数
exports.main = async (event, context) => {
  const act = event.act
  let res
  try {
    switch (act) {
      case 'insertInfo':
        res = insertInfo.call(event, context)
        break
    }
    return res
  } catch (e) {
    return e
  }
}
