const Koa = require('koa')
const Router = require('koa-router'); // 引入koa-router
const EventEmitter = require('events').EventEmitter
const BodyParser = require('koa-bodyparser');
const path = require('path')
const app = new Koa()
const fs = require('fs')
const router = new Router() // 创建路由，支持传递参数
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let emmiter = new EventEmitter()
const bodyparser = new BodyParser();
app.use(bodyparser)
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  emmiter.emit('connect', db)
});

emmiter.once('connect', async (db) => {
  var dbo = db.db("test");
  var users = dbo.collection("users") // 用户表
  var homesetting = dbo.collection("homesetting") // 首页轮播图表
  var product = dbo.collection("product") // 商品表
  var address = dbo.collection("address") // 地址表
  var cart = dbo.collection("cart")
  var orderlist = dbo.collection("orderlist")
  // router.get('/', async ctx => {
  //   ctx.type = 'html'
  //   ctx.body = fs.createReadStream(path.resolve(__dirname, 'index.html'))
  // })

  // 根据id获取用户信息
  router.get("/currentUser", async (ctx) => {
    const { query } = ctx.request
    const data = await users.find(query).toArray()
    ctx.body = data
  })
    // 登陆
    .post('/login', async (ctx) => {
      const rb = ctx.request.body
      await users.updateOne({ 'name': rb.name }, { $set: { isLogin: true } })
      const data = await users.find({ 'name': rb.name }).toArray()
      ctx.body = {
        data: data
      }
    })
    // 退出登陆
    .post('/loginout', async (ctx) => {
      const rb = ctx.request.body
      await users.updateOne({ 'name': rb.name }, { $set: { isLogin: false } })
      ctx.body = {
        code: 200
      }
    })
    // 获取首页轮播图片
    .get("/homeSetting", async (ctx) => {
      const data = await homesetting.find({}).toArray()
      const body = []
      data.forEach(({ src, alt }) => {
        body.push({ src, alt })
      })
      ctx.body = body
    })
    // 分页查询商品列表
    .get("/productList", async (ctx) => {
      const { query } = ctx.request
      const { keyword, page = 1, pageNum = 10 } = query
      const condition = {}
      if (keyword) {
        condition.title = { $regex: keyword }
      }
      const total = await product.find(condition).count()
      const totalPage = Math.floor(total / pageNum)
      const data = await product.find(condition).skip((page - 1) * pageNum).limit(Number(pageNum)).toArray()
      ctx.body = {
        total,
        data,
        page: Number(page)
      }
    })
    // 获取商品详情
    .get("/productDetail", async (ctx) => {
      const { query } = ctx.request
      const data = await product.find({ _id: Number(query._id) }).toArray()
      ctx.body = data[0]
    })
    // 新增地址
    .post('/addAddress', async (ctx) => {
      const rb = ctx.request.body
      const count = await address.find().count()
      address.insertOne({ _id: count + 1, ...rb })
      ctx.body = {
        code: 200
      }
    })
    // 编辑地址
    .put('/editAddress', async (ctx) => {
      const rb = ctx.request.body
      const _id = rb.id
      delete rb.id
      address.updateOne({ '_id': _id }, { $set: { ...rb } })
      ctx.body = {
        code: 201
      }
    })
    // 删除地址
    .delete('/address', async (ctx) => {
      const rb = ctx.request.body
      const _id = rb.id
      address.deleteOne({ '_id': _id })
      ctx.body = {
        code: 201
      }
    })
    // 获取地址列表
    .get('/address', async (ctx) => {
      const data = await address.find({}).toArray()
      const body = []
      data.forEach(item => {
        body.push({ ...item, id: item._id })
      })
      ctx.body = body
    })


    // 新增购物车
    .post('/addCart', async (ctx) => {
      const rb = ctx.request.body
      const { name, productId, num = 1 } = rb
      const info = await cart.find({ name }).toArray() // 拿到当前的人的数据
      const data = info[0] || {}
      // 已经有数据了
      if (data._id) {
        // 存在当前的商品直接修改数量
        if (data.productIds.includes(productId)) {
          const index = data.products.findIndex(v => v._id == productId)
          data.products[index].cartNum = data.products[index].cartNum + num
        } else {
          const info = await product.find({ _id: Number(productId) }).toArray()
          const products = { ...info[0], cartNum: num }

          data.productIds.push(productId)
          data.products.push(products)
        }
        cart.updateOne({ name }, { $set: { name, productIds: data.productIds, products: data.products }})
      } else {
        const info = await product.find({ _id: Number(productId) }).toArray()
        const products = [{ ...info[0], cartNum: num }]
        cart.insertOne({ name, productIds: [productId], products })
      }
      ctx.body = {
        code: 200
      }
    })
    // 编辑购物车
    .put('/editCart', async (ctx) => {
      const { name, productId, num } = rb
      const data = await cart.find(name).toArray()[0]
      if (num == 0) {
        // 删除
        const index = data.productIds.findIndex(productId)
        data.productIds.splice(index, 1)

        const productsIndex = data.products.findIndex(v => v._id == productId)
        data.products.splice(productsIndex, 1)
      } else {
        const index = data.products.findIndex(v => v._id == productId)
        data.products[index].cartNum =  num
      }
      cart.updateOne({ name }, { $set: { productIds: data.productIds, products: data.products } })
      
      ctx.body = {
        code: 201
      }
    })
    // 删除购物车
    .delete('/cart', async (ctx) => {
      const { name, productIds  } = rb
      const data = await cart.find(name).toArray()[0]
      productIds.forEach(item => {
        const index = data.productIds.findIndex(item)
        data.productIds.splice(index, 1)

        const productsIndex = data.products.findIndex(v => v._id == productId)
        data.products.splice(productsIndex, 1)
      })
      cart.updateOne({ name }, { $set: { productIds: data.productIds, products: data.products } })
      ctx.body = {
        code: 201
      }
    })
    // 获取购物车
    .get('/cart', async (ctx) => {
      const { query } = ctx.request
      const {name} = query
      const info = await cart.find({ name }).toArray()
      const data = info[0] || {}
      ctx.body = data
    })



  app.use(router.routes())

  app.listen(3000, () => {
    console.log('8888888')
  })
})