const kkb = require('./kkb.js')
const app = new kkb()
// app.use((req, res) => {
//   res.writeHeader(200)
//   res.end('99999--000')
// })
app.use((cxt, next) => {
  cxt.body = {
    name: 'TOM'
  }
})
app.listen(3000, () => {
  console.log('成功====999')
})