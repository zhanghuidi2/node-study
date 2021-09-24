const Koa = require('koa')
const app = new Koa()
app.use((cxt, next) => {
  cxt.body = {
    name: 'TOM'
  }
})
app.listen(3000, () => {
  console.log('成功')
})