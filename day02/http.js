const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const { url, method, headers } = req
  console.log(url, req)
  if (url === '/' && method === 'GET') {
    fs.readFile("index.html",(err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': "text/plain;charset=utf-8"
        })
        res.end('500')
      }
      res.writeHead(200, {
        'Content-Type': "text/html"
      })
      res.end(data)

    })
  } else if (url === '/users') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({name: 'TOM'}))
  } else if (method === 'GET' && headers.accept.indexOf('image/*' !== -1)) {
    fs.createReadStream('./' + url).pipe(res)
  } else {
    res.writeHead(404, {
      'Content-Type': "text/plain;charset=utf-8"
    })
    res.end('404')
  }
})
server.listen(3001, () => {
  console.log('开启服务器')
  
})