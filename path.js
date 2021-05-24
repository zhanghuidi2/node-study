console.log('hello!!4445555')
const path = require('path')
const fullPath = '/abc/text/class.js'
const dirname = path.dirname(fullPath) // 获取文件的目录名
const basename = path.basename(fullPath) // 获取文件夹
const extname = path.extname(fullPath) // 获取拓展名
console.log('---', path.resolve(__dirname, 'package.json')); // __dirname 当前绝对路径
console.log('===', path.resolve('package.json')) // resolve会自动拼接好一个当前的绝对路径
console.log('1111', path.join(__dirname,'package.json')) // join只是拼接
console.log(dirname, basename, extname)
// 格式
const test = path.format({
  root: dirname + '__hell__',
  base: basename.replace(extname, '.spce' + extname)
})

console.log(test)