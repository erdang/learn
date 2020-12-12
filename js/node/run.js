// const os = require('os')
const fs = require('fs');
// const chalk = require('chalk');//打印显示颜色
// //console.log(os.freemem()/os.totalmem()*100)

// //process 无需引入 内置  设置环境变量 cross-env  webpack 插件 DefinePlugin
// //console.log(process.env.NODE_ENV)

// //获取 命令行参数  node app.js name=joe 
// // 第一个参数是 node 命令的完整路径。
// // 第二个参数是正被执行的文件的完整路径。
// // 所有其他的参数从第三个位置开始
// //console.log(process.argv)
// //console.log(chalk.blue('22'))



// //npm install progress 进度条
// const ProgressBar = require('progress')

// const bar = new ProgressBar(':bar', { total: 10 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)


// //readline 交互性命令行  
// //npm install inquirer  
// const inquirer = require('inquirer')

// var questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "你叫什么名字?"
//   }
// ]

// inquirer.prompt(questions).then(answers => {
//   console.log(`你好 ${answers['name']}!`)
// })

// // --save 安装并添加条目到 package.json 文件的 dependencies。
// // --save-dev 安装并添加条目到 package.json 文件的 devDependencies。
// // 区别主要是，devDependencies 通常是开发的工具（例如测试的库），而 dependencies 则是与生产环境中的应用程序相关。

// setImmediate(()=>{
//     console.log(3)
// });
// setTimeout(()=>{
//     console.log(2)
// },10)

// var str = 'aaaaabbbbbdddddaaaaaaaffffffffffffffffffgggggcccccce';
// var pattern = /(\w)\1+/g;
// var maxLength = 0;
// var maxValue = '';
// var result = str.replace(pattern,function(match,match1,pos,originalText){
//     console.log(match + '----'+ match1)
//     if(match.length > maxLength){
//         maxLength = match.length;
//         maxValue = match1;
//     }
// })
// console.log(maxLength,maxValue);//18 "f"


// console.log(new Date('2019/7/17'))
// console.log(/([1-9]\d)/.test(920))

// var arr = [1,2,3];
// for(var i = 0 ; i < arr.length; i++){
//   var randomIndex = Math.floor(Math.random()*arr.length);
//   console.log('randomIndex:'+arr[randomIndex] + '---'+ 'i:'+arr[i]);
//   [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];



// }

// console.log(arr)
// process.env.NODE_ev = 'ali'
// console.log(process.env.NODE_ev)

// console.log(__filename)
// console.log(__dirname)

// process.on('exit', function(code) {

//   // 以下代码永远不会执行
//   setTimeout(function() {
//     console.log("该代码不会执行");
//   }, 0);

//   console.log('退出码为:', code);
// });
// console.log("程序执行结束");


// const cof = Buffer.alloc(8)
// //console.log(cof)



// var readerStream = fs.createReadStream('a.js');
// var data = 'asdasdsa';
// //console.log(readerStream)

// // readerStream.on('data', function(chunk) {
// //   data += chunk;
// // });

// // readerStream.on('end',function(){
// //   console.log(data);
// // });



// //读取流

// const readb = fs.createReadStream('a.js');
// var datab = '111';

// readb.on('data',function(chunk){
//   datab += chunk;
// })
// readb.on('end',function(){
//   console.log(datab)
// })

// // 写入流

// const writeb = fs. createWriteStream('b.js');

// writeb.write('aaaaa');

// writeb.end();

// writeb.on('finish',function(){
//   console.log('写入完成')
// })

// //管道流

// readb.pipe(writeb);

// //链式流 
// var zlib = require('zlib');
// readb.pipe(zlib.createGunzip()).pipe(writeb);


const http = require('http');

const server = http.createServer((request, response) => {

  const {
    url,
    method
  } = request;
  if (url == '/' && method == 'GET') {
    fs.readFile('route.html', (data, err) => {
      if(err){
        response.writeHead(500, { 'Content-Type':
        'text/plain;charset=utf-8' });
        response.end('500，服务器器错误'); return ;
      }
      response.statusCode = 200;
       
      response.setHeader('Content-Type', 'text/html');
      response.end(data);

    })
  }
  
})
server.listen(6000);
console.log('Server running at http://127.0.0.1:6000/');

// fs.exists(path, callback) 废弃
//fs.existsSync() 未废弃
// 检测给定的路径是否存在。
//读取文件内容 
//readFile(filename,[options],callback);

/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
//异步
fs.readFile('a.js',(err,data)=>{
  console.log(data.toString())
})
//同步
var vv = fs.readFileSync('b.js');
console.log(vv.toString())

// fs.writeFile(filename,data,[options],callback);
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.writeFile('a.js','23',(err,fd)=>{

})
// fs.appendFile(filename,data,[options],callback);
//追加方式 写入文件
fs.appendFile('a.js','aaa',(err,fd)=>{

})

//打开文件，获取文件描述
// fs.open(filename, flags, [mode], callback);

/**
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */

 //fs.read(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
 */


// fs.open('a.js','r+',(err,fd)=>{
//   if (err) {
//     return console.error(err);
//   }
//   let bf = Buffer.alloc(255);
//   fs.read(fd,bf,0,9,0,(err,bytesRead,buffer)=>{
//       if(err)
//           throw err;
//       console.log(bytesRead);
//       console.log(buffer.toString());
//   }) 
//   let bfc = Buffer.from(" 写入文件数据的内容");
//     fs.write(fd, bfc, 0, bfc.length, 0, (err, bytesWritten, buffer) => {
//         if (err)
//             throw err;
//         console.log(bytesWritten);
//         console.log(`写入的内容:${buffer.toString()}`);
//     })   
// })


//fs.stat(path, callback)
//判断路径是否存在 
// fs.stat('./test',(err,stats)=>{
//   if (err) {
//     return console.error(err);
// }
//   console.log(stats);
//   if(stats.isDirectory()){
//     console.log(22)'''''''''
//   }
// })

//fs.unlink(path, callback) 
//删除文件

//fs.mkdir(path[, options], callback)
// options 参数可以是：

// recursive - 是否以递归的方式创建目录，默认为 false。
// mode - 设置目录权限，默认为 0777。

//读取目录
//fs.readdir(path, callback)

// fs.readdir('/',(err,files)=>{...........
//   if(err){
//     throw err;
//   }
//   console.log(files)
// })

//删除目录
// fs.rmdir(path, callback)


function debounce(fn,delay){
  let timeout = null;
  return function(){
    let args = arguments;
    if(timeout)clearTimeout(timerout);
    timeout = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}

function debounce(fn,delay){
  return function(){
    setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}

function throttle(fn,delay){
  let timeout = null;
  return function(){
    let args = arguments;
    if(timeout)return;
    timeout = setTimeout(()=>{
      fn.apply(this,args);
      timeout = null;
    },delay)
  }
}

function throttle(fn,delay){
  let can = true;
  return function(){
    let args = arguments;
    if(!can)return;
    can  = false;
    setTimeout(()=>{
      fn.apply(this,args)
      can = true;
    },delay)
  }
}

function throttle(fn,delay){
  let previous = 0;
  return function(){
    let now = new Date();
    let args = arguments;
    if(now-prvious>delay){
      fn.apply(this,args)
      previous = now;
    }
  }
}
