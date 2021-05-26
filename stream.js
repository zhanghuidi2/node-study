const fs = require('fs')
const rs = fs.createReadStream('1.png')
const wr = fs.createWriteStream('2.png')
rs.pipe(wr)