const http = require('http')
class kkb {
  use(callback) {
    this.server = http.createServer(callback)
  }
  listen(...args) {
    this.server.listen(...args)
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