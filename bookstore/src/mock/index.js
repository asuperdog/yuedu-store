var Mock = require('mockjs')
// 评论数据生成模板
reviews = Mock.mock({
  // 根据下面的模板随机生成4-6条数据
  "array|4-6": [{
    // 随机中文姓名
    name: '@cname',
    // 随机评分数值
    rate: '@integer(1, 5)',
    // 随机评论内容
    review: '@csentence'
  }]
})

// 设置Ajax响应延迟时长
Mock.setup({
  timeout: '500-1000' // 响应时间介于0.5-1.0秒之间
})

// 评论信息获取"路由"
Mock.mock('/detail/review', 'get', getReview)

// 获取评论信息的函数声明
function getReview() {
  var res = {}
  var totalLength = reviews.array.length
  res.reviews = reviews.array
  res.length = totalLength
  res.errorCode = 0
  res.msg = "ok"
  return res
}
