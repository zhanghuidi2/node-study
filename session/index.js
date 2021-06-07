const http = require('http')
// 放大字上面
const session = {} // 普通对象，存在内存里的，可以存到数据库，或者存redis
http.createServer((req, res) => {
  const { cookie } = req.headers
  const sessionKey = 'sid'
  if (cookie && cookie.indexOf(sessionKey) > -1) {
    // 不是首次访问
    // cookie是 username=123;password=345;uid=456的格式，使用正则给把uid对应的数据取出来
    const pattern = cookie.split(`${sessionKey}=`)
    const result = session[pattern[1]] && session[pattern[1]].name
    res.end(`come again ${result}`)
  } else {
    // 首次访问
    const uid = (Math.random() * 99999).toFixed()
    // 将uid将随机数存储起来，然后把随机数对应的用户信息存到sseion里面，下次访问从session里拿
    res.setHeader('Set-Cookie', `${sessionKey}=${uid}`)
    session[uid] = {
      name: '章三'
    }
    console.log(session)
    res.end('hello')
  }
})
  .listen(3000, () => {
    console.log('启动成功')
})