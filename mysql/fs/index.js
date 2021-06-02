const fs = require('fs')

function get(key) {
  fs.readFile('./db.json', (err, data) => {
    if (err) {
      console.log(err, 'err')
    } else {
      const json = data ? JSON.parse(data) : {}
      console.log(json[key])
    }
  })
}

function set(key, value) {
  // 如果没有指定字符编码，则返回原始的 buffer。
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err, 'err')
    } else {
      const json = data ? JSON.parse(data) : {}
      json[key] = value
      fs.writeFile('./db.json', JSON.stringify(json), err => {
        if (err) {
          console.log(err)
        } else {
          console.log('写入成功' )
        }
      })
    }
  })
}
// set('a', 9)
// get('a')

// 命令行接口
const readline = require('readline')
// 创建实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', input => {
  const [op, key, value] = input.split(' ');
  if (op === 'set') {
    set(key, value)
  } else if (op === 'get') {
    get(key)
  } else if (op === 'quit') {
    rl.close()
  } else {
    console.log('没有操作')
  }
})

rl.on('close', () => {
  console.log('程序结束')
  process.close*0
})