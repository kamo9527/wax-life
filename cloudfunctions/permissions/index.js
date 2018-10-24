// 云函数入口函数
exports.main = (event, context) => {
  let { userInfo} = event
  let { openId } = userInfo // 这里获取到的 openId 和 appId 是可信的
  let permissions = ['omdlr5X9Yvg0p4R9fElMiXgyBuao', 'omdlr5SvBcVz7lORQpdnQWe8LQL0']
  let hasAuth = permissions.includes(openId)
  return {
    openId,
    hasAuth
  }
}