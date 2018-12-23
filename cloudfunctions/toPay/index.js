// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var wxConfig = require('../wx_pay/wx_x_config')
var cryptoMO = require('crypto') // MD5算法
var parseString = require('xml2js').parseString // xml转js对象
var key = wxConfig.Mch_key
// const nostr = Math.random().toString(36).substr(2, 32)

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}