const http = require('http')
const fs = require('fs')
const serve = http.createServer((request, response) => {
  // request和response是流，流的作用相当于一个导管，链接前端和后端，比接受一个大的对象的时候，传输更快，更节约资源
  // response.end('oooo')
  const { url, method, headers } = request
  if (url === '/' && method === 'GET') {
    // 表示服务器默认访问的请求
    // content-type text/plain;charset=utf-8纯文本的形式 text/html返回html页面 application/json
    fs.readFile('index.html', (err, data) => {
      if (err) {
        response.writeHead(500, {
          'Content-type': 'text/plain;charset=utf-8'
        }) // 一次性返回状态码和响应头，statusCode + setHeader，与下面的写法等同
        response.end('500 出错了')
      } else {
        response.statusCode = 200
        response.setHeader('Cont-type', 'text/html')
        response.end(data)
      }
    })
  } else if (url === '/users') {
    // 记得写/
    response.writeHead(200, {
      'Content-type': 'application/json'
    })
    response.end(JSON.stringify({
      name: '小明'
    }))
  }else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1)  {
    // 流
    fs.createReadStream('.' + url).pipe(response)
  } else {
    response.writeHead(404, {
      'Content-type': 'text/plain;charset=utf-8'
    })
    response.end('找不到')
  }
})
serve.listen(8888, () => {
  console.log('启动成功')
})