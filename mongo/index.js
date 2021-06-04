const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  // 查询
  const { keywords, categray, page } = req.query
  const col = mongo.col('day01')
  const condition = {
     // 价格大于5
    // price: {
    //   $gt: 5
    // }
  }
  if (categray && categray!=0) {
    condition.categray = categray == 1 ? '蔬菜' :'水果'
  }
  if (keywords) {
    condition.name = {$regex: keywords}
  }
  await col.find(condition).forEach(item => {
    col.updateMany({_id: item._id},{$set:{price: parseFloat(item.price)}})
  })
  const total = await col.find(condition).count() // 总数
  const data = await col.find(condition).skip((page - 1) * 5).limit(5).sort({ price: 1 }).toArray()
  res.json({
    ok: 1,
    data: {
      data,
      pagination: {
        total,
        page
      }
    }
  })
})
app.get('/api/cateGray', async (req, res) => {
  const col = mongo.col('day01')
  const data = await col.distinct('categray')
  const json = []
  data.forEach(item => {
    json.push({
      name: item,
      type: item === '蔬菜' ? '1' : '2'
    })
  })
  res.json({
    ok: 1,
    data: {
      data: json
    }
  })
})
app.listen(3000, () => {
  console.log('启动成功')
})



















// (async () => {
//   const { MongoClient: MongoDB } = require('mongodb')
//   // 创建客户端
//   const client = new MongoDB(
//     'mongodb://localhost:27017',
//     {
//       userNewUrlParser: true
//     }
//   )
//   let ret
//   // 创建连接
//   ret = await client.connect()
//   console.log('ret:', ret)
//   const db = client.db('test')
//   const day01 = db.collection('day01')
//   const fruite = db.collection('fruite')

//   // 添加文档
//   ret = await day01.insertOne({
//     name: '王五',
//     age: 98
//   })
//   console.log('插入成功', JSON.stringify(ret))
//   ret = await fruite.insertOne({
//     name: 'orage',
//     price: 6
//   })
//   console.log('插入成功', JSON.stringify(ret))

//   // 查询文档
//   ret = await day01.findOne()
//   console.log('查询文档:', JSON.stringify(ret))
//   // 查询文档
//   ret = await day01.find({
//     name: '王五'
//   }).forEach(item => {
//     day01.update({
//       _id: item._id
//     }, {
//       $set: {
//         name: '张慧迪'
//       }
//     })
//   })
//   console.log('查询文档:', JSON.stringify(ret))
  
//   // 更新文档
//   ret = await fruite.updateOne({
//     name: 'orage'
//   }, {
//     $set: {
//       name: '橘子'
//     }
//   })
//   ret = await fruite.update({
//     name: 'orage'
//   }, {
//     $set: {
//       name: '橘子'
//     }
//   })
//   console.log('更新文档', JSON.stringify(ret.result))

//   client.close()
// })()