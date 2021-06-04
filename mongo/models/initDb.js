const mongodb = require('./db')

mongodb.once('connect', async () => {
  const col = mongodb.col('day01');

  try {
    // 删除已经存在的
    await col.deleteMany()
    // 插入
    const data = new Array(100).fill().map((item, index) => {
      return {
        price: Number((Math.random() * 10)).toFixed(2),
        name: 'xxx' + index,
        categray: Math.random() > 0.5 ? '蔬菜' : '水果'
      }
    })
    const ret = await col.insertMany(data)
    console.log("插入测试数据成功", JSON.stringify(ret));
  } catch {

  }



})
  