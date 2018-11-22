# Webpack4优化之路
---
Webpack4 那点儿东西 基于webpack4总结了一些webpack的常见配置，但是webpack 各种强大的配置有时候让你不堪重负，会打包很多的文件，遍历解析很多文件。。。。。总之，这些操作会让webpack打包过程变得很慢，所以开发过程中我们不得不去优化一些配置，让webpack更好的服务于我们的开发。

## 动态链接库DLL

即把基础模块的代码打包进入动态链接库里，比如常用的react，vue等，当需要导入的模块在动态连接库里的时候，模块不能再次被打包，而是去动态连接库里获取

  ### 1.创建一个webpack.dll.config.js文件打包常用类库到dll中

    module.exports = {
      entry: {
          react: ['vue'] //vue模块打包到一个动态连接库
      },
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: '[name].dll.js', //输出动态连接库的文件名称
          library: '_dll_[name]' //全局变量名称
      },
      plugins: [
          new webpack.DllPlugin({
              name: '_dll_[name]', //和output.library中一致，也就是输出的manifest.json中的 name值
              path: path.join(__dirname, 'dist', '[name].manifest.json')
          })
      ]
    }
    webpack --config webpack.dll.config.js --mode production


  ### 2.在住配置文件 webpack.config.js中加入以下代码

    plugins: [
      new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dist', 'vue.manifest.json')),
        })
    ]
    webpack --config webpack.config.js --mode development

  
  这样会从dll中获取vue，而且不用再次打包vue了。


  ## Webpack热替换之HMR

  Hot Module Replacement（以下简称 HMR）是 webpack 中超级有用的特性之一 ，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。从而减少很多时间。の。。。。比如，页面中有一个modal框，需要点击button触发modal显示，在开发过程中，如果修改了modal 的样式，触发浏览器刷新，你还需要再次点击button才能看到修改后的modal样式，但是热替换是不需要刷新浏览器的，可以直接观察到修改后的变化。上文中已经介绍了watch的用法，但是watch是针对打包时文件发生变化进行重新打包，而HMR是针对webpack-dev-server的。

  ### 1.devserver配置如下

      devServer: {//配置此静态文件服务器，可以用来预览打包后项目
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 9090,//端口号
        compress: true//开发服务器是否启动gzip等压缩
      }
  
  ### 2.plugins配置项加入以下两行

      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()//用户名替代id
  
  ### 3.业务代码中的修改(模块HMR)

      if(module.hot) {
        module.hot.accept('./hello.js', function() {
            div.innerHTML = hello()
        })
      }
  ### 4.原理及流程解析大致流程：

    webpack-dev-server可以和浏览器之间建立一个web socket进行通信，一旦新文件被打包出来，webpack-dev-server就告诉浏览器这个消息，
    这时浏览器就可以自动刷新页面或者进行热替换操作。当一个模块b发生改变，而模块内又没有HMR代码（类似于上述3中的代码）来处理这一消息时，
    那这一消息就会被传递到依赖模块b的其他模块上；如果消息在新模块上没有被捕获的话就会再次进行传递；如果所有的消息都被捕获了的话，
    那我们的应用就应该已经按照代码进行了更新；反之如果有消息冒泡到了入口(entry)文件还没有被捕获的话，那就说明我们的代码中没有处理这
    类变更方法，那webpack就会刷新浏览器页面，即从HMR回退到LiveReload。