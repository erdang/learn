var http = require('http');
var fs = require('fs');
var url = require('url');
 
 
// 创建服务器
http.createServer( function (request, response) {  
        const {url, method} = request;
        if (url === '/' && method === 'GET') {
            fs.readFile('route.html', (err, data) => {
//                 if (err) {
//                     response.writeHead(500, { 'Content-Type':
//   'text/plain;charset=utf-8' });
//   response.end('500，服务器器错误'); return ;
//                 }
                response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
          response.end(data);
      });
  
        }else if(url === '/about' && method === 'GET'){
            fs.readFile('route.html', (err, data) => {
                //                 if (err) {
                //                     response.writeHead(500, { 'Content-Type':
                //   'text/plain;charset=utf-8' });      
                //   response.end('500，服务器器错误'); return ;
                //                 }
                                response.statusCode = 200;
                            response.setHeader('Content-Type', 'text/html');
                          response.end(data);
                      });
        }
    
}).listen(8000);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8000/');