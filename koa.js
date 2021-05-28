const Koa = require('koa')
const app = new Koa()
app.use(async (cxt, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  // cxt.body = {
  //   txt: `请求耗时${end-start}`
  // }
})
app.use((cxt, next) => {
  const express = Date.now() + 100
  let i = 0
  while (express > Date.now())
  i++
  cxt.body = {
    name: i
  }
})
app.listen(8888, () => {
  console.log('8888888')
})

function a(name) {
  console.log(name)
  return function () {
    return function () {
      console.log(name)
    }
  }
}
a('zhangdan')
