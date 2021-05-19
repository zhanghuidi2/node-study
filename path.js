console.log('hello!!4445555')
const path = require('path')
const fullPath = '/abc/text/class.js'
const dirname = path.dirname(fullPath) // 获取路径
const basename = path.basename(fullPath) // 获取文件夹
const extname = path.extname(fullPath) // 获取拓展名
console.log(dirname, basename, extname)
// 格式
const test = path.format({
  root: dirname + '__hell__',
  base: basename.replace(extname, '.spce'+extname)
})
console.log(test)