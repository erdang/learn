const fs = require('fs');
const http = require('http');
const path = require('path');


const server = http.createServer((requset,response)=>{
    const {url, method,headers} = requset;
    console.log(headers.accept.indexOf('image/*'))
    if(url === '/' && method === 'GET'){
        fs.readFile(path.resolve(__dirname,'index.html'),(err,data)=>{
            if(err){
                response.writeHead(500,{'Content-Type':'text/plain;charest=utf-8'});
                response.end('500,服务器错误');
                return;
                
            }
            
            response.statusCode = 200;
       
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        })

    } else if( method === 'GET' && headers.accept.indexOf('image/*') > -1){
        console.log(fs.createReadStream('.'+url))
        fs.createReadStream('.'+url).pipe(response);
      
    }
    else if (url === '/users' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify([{name:'tom',age:20}]));
    }else{
        response.writeHead(404, { 'Content-Type': 'text/plain;charest=utf-8' });
        response.end('404');
    }
  
})
server.listen(9000);
console.log('Server running at http://127.0.0.1:9000/');