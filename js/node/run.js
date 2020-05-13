const os = require('os')
const fs = require('fs');
const chalk = require('chalk');//打印显示颜色
//console.log(os.freemem()/os.totalmem()*100)

//process 无需引入 内置  设置环境变量 cross-env  webpack 插件 DefinePlugin
//console.log(process.env.NODE_ENV)

//获取 命令行参数  node app.js name=joe 
// 第一个参数是 node 命令的完整路径。
// 第二个参数是正被执行的文件的完整路径。
// 所有其他的参数从第三个位置开始
//console.log(process.argv)
//console.log(chalk.blue('22'))



//npm install progress 进度条
const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)


//readline 交互性命令行  
//npm install inquirer  
const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "你叫什么名字?"
  }
]

inquirer.prompt(questions).then(answers => {
  console.log(`你好 ${answers['name']}!`)
})

// --save 安装并添加条目到 package.json 文件的 dependencies。
// --save-dev 安装并添加条目到 package.json 文件的 devDependencies。
// 区别主要是，devDependencies 通常是开发的工具（例如测试的库），而 dependencies 则是与生产环境中的应用程序相关。

setImmediate(()=>{
    console.log(3)
});
setTimeout(()=>{
    console.log(2)
},10)
