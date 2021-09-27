const add = (x, y) => x + y
const square = z => z * z
// const fn = square(add(1, 2))
// console.log(fn)


// const componse = (f1, f2) => {
//   return (...args) => {
//     return f1(f2(...args))
//   }
// }



// const componse = (f1, f2) => (...args) => f1(f2(...args))
// const fn = componse(square, add)(1,2)
// console.log(fn)

// reduce方法

// const componse = (...middleware) => (...args) => middleware.reduce((total, item) => total = total(item(...args)))
// const fn = componse(square, add)(1,2)
// console.log(fn)

// 递归
async function f1(next) {
  console.log('1 start')
  await next()
  console.log('1 emd')
}
async function f2(next) {
  console.log('2 start')
  await next()
  console.log('2 emd')
}
async function f3(next) {
  console.log('3 start')
  await next()
  console.log('3 emd')
}

const compones = (...middlewares) => {
  return dispatch(0)
  function dispatch(i) {
    let fn = middlewares[i]
    if (!fn) {
      return Promise.resolve()
    }
    return Promise.resolve(
      fn( function next() {
        return dispatch(i + 1)
      })
    )
  }
}
  
compones(f1, f2, f3)



