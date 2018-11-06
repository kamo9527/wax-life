// 接口文件
const createOrder = require('./actions/createOrder')
const getOrder = require('./actions/getOrder')
const updateOrderCourier = require('./actions/updateOrderCourier')
const updateOrderStatus = require('./actions/updateOrderStatus')
// 云函数入口函数
exports.main = async (event, context) => {
  const act = event.act
  let res
  try {
    switch (act) {
      case 'createOrder':
        res = createOrder.call(event, context)
        break
      case 'getOrderByOpenId':
        res = getOrder.call(event, context)
        break
      case 'updateOrderCourier':
        res = updateOrderCourier.call(event, context)
        break
      case 'updateOrderStatus':
        res = updateOrderStatus.call(event, context)
        break
    }
    return res
  } catch (e) {
    return e
  }
}
