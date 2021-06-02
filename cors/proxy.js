var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
// 如果使用http-proxy-middleware，就不需要在后端设置，axios也不需要转了
// 我们当前主机A为http://localhost:3000/，现在浏览器发送一个请求，请求接口/api，这个请求的数据在另外一台服务器B上（http://localhost:4000），这时，就可通过在A主机设置代理，直接将请求发送给B主机。

const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: false }));
module.exports = app