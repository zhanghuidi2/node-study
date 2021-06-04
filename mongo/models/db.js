const conf = require('./conf.js')
const EventEmitter = require('events').EventEmitter

const MongoClient = require('mongodb').MongoClient

class Mongodb {
  constructor(conf) {
    this.conf = conf
    this.emmiter = new EventEmitter()
    this.client = new MongoClient(conf.url, { useNewUrlParser: true })
    this.client.connect(err => {
      if (err) throw err
      console.log('连接成功')
      // 连接成功派发一个事件
      this.emmiter.emit('connect')
    })
    
  }
  // 获取到表
  col(cloName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(cloName)
  }
  // 执行一次, once和on的区别
  once(event, cb) {
    this.emmiter.once(event, cb)
  }
  

}
module.exports = new Mongodb(conf)