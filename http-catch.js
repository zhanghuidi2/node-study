function updateTime() {
  setInterval(() => this.time = new Date().toUTCString(), 5000)
  // this.timer = this.timer || setInterval(() => this.time = new Date().toUTCString(), 5000)
  return this.time
}

const http = require('http')
const serve = http.createServer((req, res) => {
  // console.log(req)
  const { url } = req
  if (url === '/') {
    // 返回一个页面
    res.end(`
      <html>
        html update ${updateTime()}
        <script src="main.js"></script>
      </html>
    `)
  } else if (url === '/main.js') {
    const conent = `document.writeln('<br>js update ${updateTime()}')`
    // 设置了强缓存，只要在10秒内，都取缓存，这事在浏览器就能完成的
    // 10秒之后会再次更新一次，然后又会取缓存，直到下一个10s 200 from memory cache
    // 过期时间必须要写格林时间
    // http 1.0的写法
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    // http1.1 20s过期  
    // cache-control的优先级高于Expires
    // res.setHeader('cache-control', 'max-age=20')

    

    // 协商缓存

    // 方式一：last-modified  if-modified-since 
    // 设置res的last-modifify为当前时间
    // 取req的 if-modified-since，如果房前时间小于请求头的时间加上延迟时间，那么就命中304了，协商说过了5s就修改了
    // Modified 修改的意思
    // 第一次请求last-modified会设置一下也就是200的时候，然后当下次请求的时候if-modified-since = 200的时候的last-modified，从而去判断
    // res.setHeader('Cache-Control', 'no-cache')
    // res.setHeader('last-modified', new Date().toUTCString())
    // if (new Date(req.headers['if-modified-since']).getTime() + 5 * 1000 > Date.now()) {
    //   console.log('命中304')
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }
    // 方式二：etag if-none-match
    // 当js的内容发生改变，hash就会变化
    res.setHeader('Cache-Control', 'no-cache')
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(conent).digest('hex') // 生成16进制的hash
    res.setHeader('Etag', hash)
    if (req.headers['if-none-match'] === hash) {
      console.log('命中304')
      res.statusCode = 304
      res.end()
      return
    }


    res.statusCode = 200
    res.end(conent)
  } else if (url === 'favicon.ico') {
    res.end('')
  }
})
serve.listen(3000, () => {
  console.log('http server run at : 3000')
})
// 如果全部不走缓存的话，那么html和js之间每次请求都会变，而且两者之间会有稍微的差距，因为要现运行html，然后在运行js,基本相等

// 如果有缓存，html每次都会刷新，js会走缓存