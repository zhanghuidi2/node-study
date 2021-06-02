// http.js
const http = require("http");
const fs = require("fs");

const app = http
    .createServer((req, res) => {
      const { method, url } = req;
      console.log(url,  method)
      if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
              res.end(data);
              console.log(err)
            });


        } else if (method == "GET" && url == "/api/users") {
            // 允许跨域
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
            // res.writeHead(200, {
            //     "Access-Control-Allow-Origin": "http://localhost:3000",
            //     // "Access-Control-Allow-Headers": "X-Token,Content-Type",
            //     // "Access-Control-Allow-Methods": "PUT"
            // });
            res.end(JSON.stringify([{ name: "tom", age: 20 }]));
            console.log('resp...')
        }
      
      else if (method == "OPTIONS" && url == "/api/users") {
        console.log('options')
          res.writeHead(200, {
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Headers": "X-Token,Content-Type",
              "Access-Control-Allow-Methods": "PUT"
          });
        res.end();
        }

    })
// app.listen(4000, () => {
//       console.log('api listen ' + 4000)
//     })
module.exports = app