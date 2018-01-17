const http = require('http')
const fs = require('fs')
var path = require('path')
const httpPort = 80

http.createServer((request, response) => {
    response.setHeader('Content-Type','text/css;charset=utf-8')
    var staticPath = path.resolve(__dirname, 'dist')
    //获取资源文件绝对路径
    var filePath = path.join(staticPath, 'index.html')
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if(err){
            console.log('404')
            response.writeHead(404, 'not found')
            response.end('<h1>404 Not Found</h1>')
        }else{
            console.log('ok')
            response.write(content, 'binary')
            response.end()
        }
    })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})