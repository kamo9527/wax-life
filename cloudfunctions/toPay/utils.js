// paySign
var cryptoMO = require('crypto') // MD5算法
var raw1 = function (args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key] = args[key]
  })

  var str = ''
  for (var k in newArgs) {
    str += '&' + k + '=' + newArgs[k]
  }
  str = str.substr(1)
  return str
}
var paySignjs = function (appid, nonceStr, package, signType, timeStamp) {
  var ret = {
    appId: appid,
    nonceStr: nonceStr,
    package: package,
    signType: signType,
    timeStamp: timeStamp
  }
  var str = raw1(ret)
  str = str + '&key=' + key
  return cryptoMO.createHash('md5').update(str).digest('hex')
}
var raw = function (args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]
  })

  var str = ''
  for (var k in newArgs) {
    str += '&' + k + '=' + newArgs[k]
  }
  str = str.substr(1)
  return str
}
var paySignjsapi = function (appid, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee) {
  var ret = {
    appid: appid,
    body: body,
    mch_id: mch_id,
    nonce_str: nonce_str,
    notify_url: notify_url,
    openid: openid,
    out_trade_no: out_trade_no,
    spbill_create_ip: spbill_create_ip,
    total_fee: total_fee,
    trade_type: 'JSAPI'
  }
  var str = raw(ret)
  str = str + '&key=' + key
  var md5Str = cryptoMO.createHash('md5').update(str).digest('hex')
  md5Str = md5Str.toUpperCase()
  return md5Str
}
module.exports = {
  paySignjs: paySignjs,
  paySignjsapi: paySignjsapi
}
