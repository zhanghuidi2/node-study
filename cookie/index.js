const http = require('http')
const server = http.createServer((req, res) => {
  console.log('cookie', req.headers.cookie)
  res.setHeader('Set-Cookie', 'uid=123')
  res.end(`在同源下，cookie可以共享，并且，下次再次请求，请求头里会带上cookie ${req.headers.cookie}`)
})
server.listen(3000, () => {
  console.log('启动3000')
})

// 缺点： 容量有限，明文，篡改，不能存实例