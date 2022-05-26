// 观察者模式

class Subject {
  constructor() {
    this.list = []
  }
  register(obj) {
    this.list.push(obj)
  }
  notify() {
    this.list.forEach(fn => {
      fn.update()
    });
  }
}

class watch{
  constructor(id) {
    this.id = id
  }
  update() {
    console.log(this.id)
  }
}

const ob1 = new watch(1)
const ob2 = new watch(2)
const sub = new Subject()
sub.register(ob1)
sub.register(ob2)
sub.notify()

// 发布订阅

class Observe{
  constructor() {
    this.callback = new Map()
  }
  subscribe(type, fn) {
    const arr = this.callback.get(type) || []
    this.callback.set(type, [...arr, fn])
  }
  unSubscribe(type) {
    delete this.callback[type]
  }
  publish(type) {
    this.callback.get(type).forEach(fn => {
      fn()
    })
  }
  
}

const obs = new Observe()
obs.subscribe('add', () => {console.log('----add')})
obs.subscribe('edit', () => { console.log('----edit') })
obs.publish('edit')