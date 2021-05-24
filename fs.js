const fs = require('fs')
// const test = new (require('./index'))
// const test = require('./index')
// console.log(test)
// fs.mkdirSync(__dirname + '/my')
fs.readFile('index.js', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// fs.rmdirSync(__dirname + '/test', {
//   recursive: true
// }) // 同步删除文件夹 recursive递归删除文件夹
// fs.rmSync(_) 14版本以后才出来de // 同步删除文件