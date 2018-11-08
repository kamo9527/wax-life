/*
 * utils helper methods
 */
/**
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * formatTime(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 * 参照：http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
 */
var formatTime = function(time, fmt) {
  if (typeof time !== 'string' && typeof time !== 'number' && !(time instanceof Date)) {
    return ''
  }
  if (typeof time === 'number') {
    time = new Date(time)
  }
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/')
    time = new Date(time)
  }
  let o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'S': time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
};
module.exports = {
  formatTime: formatTime
}
// exports.utils = {
//   // 正则校验Key
//   regexpMap: {},
//   // 判断一个时间是否在指定的时间当中 bt=8:00:00,et=20:00:00,rt=2016-11-11 9:23:23
//   timeInBettwen: function(bt, et, rt) {
//     let placeholder = '2016-11-11 '
//     let reg = /[^\s]*\s?([^.]*)\.?.*/
//     let aRt = rt.replace(reg, '$1').split(':')
//     let nRt = aRt[0] * 3600 + aRt[1] * 60 + aRt[2] * 1

//     let aBt = (placeholder + bt).replace(reg, '$1').split(':')
//     let nBt = aBt[0] * 3600 + aBt[1] * 60 + aBt[2] * 1

//     let aEt = (placeholder + et).replace(reg, '$1').split(':')
//     let nEt = aEt[0] * 3600 + aEt[1] * 60 + aEt[2] * 1
//     return nBt <= nRt && nRt <= nEt
//   },
//   /**
//    * 判断两个时间相差多少
//    * @param t1 {String/Date} 时间1
//    * @param t2 {String/Date} 时间2
//    * @param offset {number} 偏差，单位是毫秒
//    */
//   diffTime: (t1, t2, offset) => {
//     if (typeof t1 === 'string') {
//       t1 = new Date(t1.replace(/-/g, '/'))
//     }
//     if (typeof t2 === 'string') {
//       t2 = new Date(t2.replace(/-/g, '/'))
//     }
//     offset = offset || 0
//     let r = t1.getTime() - t2.getTime() - offset
//     return r
//   },
//   /**
//    * 得到将来的某个日期
//    * @param str 创建订单时间
//    * @param days 失效时间
//    * @returns {Date}
//    */
//   getEndTime: (str, days) => {
//     let date = new Date(str.replace(/-/g, '/'))
//     date.setDate(date.getDate() + days)
//     return date
//   },
//   /**
//    * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//    * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//    * 例子：
//    * formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
//    * formatTime(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
//    * 参照：http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
//    */
//   formatTime: function(time, fmt) {
//     if (typeof time !== 'string' && typeof time !== 'number' && !(time instanceof Date)) {
//       return ''
//     }
//     if (typeof time === 'number') {
//       time = new Date(time)
//     }
//     if (typeof time === 'string') {
//       time = time.replace(/-/g, '/')
//       time = new Date(time)
//     }
//     let o = {
//       'M+': time.getMonth() + 1, // 月份
//       'd+': time.getDate(), // 日
//       'h+': time.getHours(), // 小时
//       'm+': time.getMinutes(), // 分
//       's+': time.getSeconds(), // 秒
//       'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
//       'S': time.getMilliseconds() // 毫秒
//     }
//     if (/(y+)/.test(fmt)) {
//       fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
//     }
//     for (let k in o) {
//       if (new RegExp('(' + k + ')').test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//       }
//     }
//     return fmt
//   },
//   getLastMonth: (date) => {
//     let year = +date.split('-')[0]
//     let lastMonty = +date.split('-')[1] - 1
//     let day = date.split('-')[2]
//     if (lastMonty === 0) {
//       year = year - 1
//       lastMonty = 12
//     } else if (lastMonty > 0 && lastMonty < 10) {
//       lastMonty = `0${lastMonty}`
//     }
//     if (day) {
//       return `${year}-${lastMonty}-${day}`
//     } else {
//       return `${year}-${lastMonty}`
//     }
//   },
//   /**
//    * @param {Object} param 将要转为URL参数字符串的对象
//    * @param {Object} key URL参数字符串的前缀
//    * @param {Boolean} encode true/false 是否进行URL编码,默认为true
//    * @source http://www.tuicool.com/articles/uaIr2mj
//    * return URL参数字符串
//    */
//   urlEncode: (param, key, encode) => {
//     if (param == null) {
//       return ''
//     }
//     if (!key) {
//       key = ''
//     }
//     var paramStr = ''
//     var t = typeof(param)
//     if (t === 'string' || t === 'number' || t === 'boolean') {
//       paramStr += '&' + key + '=' + ((encode === null || encode) ? window.encodeURIComponent(param) : param)
//     } else {
//       for (var i in param) {
//         var k = key === null ? i : key + (param instanceof Array ? '-' + i + '-' : i)
//         paramStr += this.urlEncode(param[i], k, encode)
//       }
//     }
//     return paramStr
//   },
//   /**
//    * 判断即时时间
//    * @param endtime 结束时间
//    * @param target 目标对象
//    * @param callback
//    * @returns {string}
//    */
//   loopTime: (endtime, callback) => {
//     let nowtime = new Date()
//     if (nowtime.getTime() < endtime.getTime()) {
//       setTimeout(() => {
//         this.loopTime(endtime, callback)
//       }, 1000)
//     }
//   },
//   // 浮点数相乘计算
//   accMul: (arg1, arg2) => {
//     var m = 0
//     var s1 = arg1.toString()
//     var s2 = arg2.toString()
//     try {
//       m += s1.split('.')[1].length
//     } catch (e) {}
//     try {
//       m += s2.split('.')[1].length
//     } catch (e) {}
//     return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
//   }
// }
