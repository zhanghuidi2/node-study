const Koa = require('koa')
const Router = require('koa-router'); // 引入koa-router

const app = new Koa()
const router = new Router() // 创建路由，支持传递参数
router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '<h1>hello world!</h1>';
})
  .get("/users", async (ctx) => {
    console.log(ctx.query)
    const {id} = ctx.query
    ctx.body = `获取用户列表 ${id ? '请求参数为：' + id : ''}` ;
  })
  .get("/users/:id", async (ctx) => {
    const { id } = ctx.params
    ctx.body = `获取id为${id}的用户`;
  })
  .post("/users", async (ctx) => {
    ctx.body = `创建用户`;
  })
app.use(router.routes())
// app.use(async (cxt, next) => {
//   const start = Date.now()
//   await next()
//   const end = Date.now()
//   // cxt.body = {
//   //   txt: `请求耗时${end-start}`
//   // }
// })
// app.use((cxt, next) => {
//   const express = Date.now() + 100
//   let i = 0
//   while (express > Date.now())
//   i++
//   cxt.body = {
//     name: i
//   }
// })
app.listen(3000, () => {
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
