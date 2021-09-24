const kkb = {
  info: {
    name: '章三'
  },
  get name() {
    return this.info.name
  },
  set name(val) {
    this.info.name = val
  }
}
console.log(kkb.info.name)
console.log(kkb.name)
kkb.name = 'lisi'
console.log(kkb.name)