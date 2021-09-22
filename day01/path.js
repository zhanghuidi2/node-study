const path = require('path')

// path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
const uri = path.resolve(__dirname, './hello.js')
console.log('uri', uri) // /Users/xiaowanzi/Documents/学习demo/node-study/day01/hello.js

// path.basename(path[, ext]) 返回路径的文件名+扩展名
const basename = path.basename(uri)
console.log('basename', basename) // hello.js

const basename2 = path.basename(uri, '.js')
console.log('basename2', basename2) // hello

// path.dirname(path) 返回目录名

const dirname = path.dirname(uri)
console.log('dirname', dirname) // /Users/xiaowanzi/Documents/学习demo/node-study/day01

// path.extname 返回扩展名
const extname = path.extname(uri)
console.log('extname', extname) // .js

// path.format() 方法从对象返回路径字符串

const format = path.format({
  root: dirname,
  name: '/format',
  ext: '.js'
})
console.log('format', format)
const plus = require(format)
console.log(plus(1, 2))

// path.parse() 方法返回一个对象，其属性表示 path 的重要元素
const parse = path.parse(uri)
console.log('parse', parse)
// parse {
//   root: '/',
//   dir: '/Users/xiaowanzi/Documents/学习demo/node-study/day01',
//   base: 'hello.js',
//   ext: '.js',
//   name: 'hello'
// }


