const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class kkb {
  use(callback) {
    this.server = http.createServer((req, res) => {
      const ctx = this.createContext(req, res)
      callback(ctx)
      res.end(ctx.body)
    })
  }
  listen(...args) {
    this.server.listen(...args)
  }
  /**
   * 构建上下文
   * @param {*} req 
   * @param {*} res 
   */
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.request.res = res
    return ctx
  }
}
// class kkb {
//   use(callback) {
//     this.server = http.createServer(this.callback)
//   }
//   listen(...args) {
//     this.server.listen(...args)
//   }
// }
module.exports = kkb