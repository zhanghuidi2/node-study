

function defineReactive(obj, key, val) {
  if (Array.isArray(obj[key])) {
    console.log('====')
    obj[key].forEach((item, index) => {
      console.log( key, index, item)
      defineReactive(obj[key], index, item)
    });
  }
  Object.defineProperty(obj, key, {
    get() {
      console.log("get访问到属性", key, val);
      return val;
    },
    set(newVal) {
      // if (val !== newVal) {
        val = newVal;
        console.log("set设置了属性", key, newVal);
      // }
    },
  });
}
const data = {
  name: '章三',
  age: 12,
  arr: [1,23,45]
}
const ar = [8, 9]

// defineReactive(data, 'name', data.name)
// defineReactive(data, 'age', data.age)
defineReactive(data, 'arr', data.arr)

// defineReactive(ar, 0, ar[0])

data.name
data.name = '里斯'
data.age
data.age = 13
data.arr
// data.arr[0] = 98
// data.arr[1] = 90
// data.arr.push(20)
// data.arr

ar[0]
ar[1]
ar[0] = 99



