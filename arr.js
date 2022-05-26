const arr = [1, 2, 2, 4, 5]
const result = [...new Set(arr)]
console.log(result);
const result2 = []
arr.forEach(item => {
  if (!result2.includes(item)) {
    result2.push(item)
  }
})
console.log(result2);


const arrJson = [
  { name: '陶渊明', id: 9 },
  { name: '苏轼', id: 9 },
  { name: '白居易', id: 5 },
  { name: '李白', id: 7 },
  { name: '杜甫', id: 8 }
]
const obj = {}
let result3 = []
result3 = arrJson.reduce((total, item) => {
  console.log('total', total, !obj[item.id], item);
  !obj[item.id] ? total.push(item) && (obj[item.id] = true) : false
  return total
   
}, [])

console.log(result3);


const map = new Map()
map.set('a', 1)
map.set('b', 2)
// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

Map.prototype.selfHas = function (key) {
  console.log(this, key)
  const arr = []
  for (let i of this.keys()) {
    arr.push(i)
  }
  if (arr.includes(key)) {
    console.log('==');
    return true
  } else {
    return false
  }
}
console.log(map.selfHas('b'))

console.log(JSON.stringify(map))