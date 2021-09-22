// const fs = require('fs')
// const data = fs.readFileSync('./conf.js')
// console.log('data', data.toString())

  (
    async () => {
      const { promisify } = require('util')
      const fs = require('fs')
      const ready = promisify(fs.readFile)
      const data2 = await ready('./conf.js')
      console.log('data2', data2.toString())
  }
)()