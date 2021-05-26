const buf1 = Buffer.alloc(10) // 创建一个长度为10，填充0的buffer
console.log(buf1)
const buf2 = Buffer.from('a') // 创建一个英文a,返回a的ASSIIC
console.log(buf2, buf2.toString())
const buf3 = Buffer.from('中')
console.log(buf3)
const buf4 = Buffer.concat([buf2, buf3])
console.log(buf4, buf4.toString())