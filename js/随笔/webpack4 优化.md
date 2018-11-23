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

  ## Tree Shaking

  tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。但是webpakc的Tree Shaking依赖静态的ES6模块化语法即通过import和export导入导出的代码，而且需要引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）或者在运行命令的时候用webpack --display-used-exports --optimize-minimize --mode production

  比如以下代码

      export function getName() {
          return 'hello world';
      }

      export function getAge() {
          return 9999;
      }

如果你只引用了其中一个，那么通过Tree Shaking会剔除另一个未用到的，打包的时候直接忽略。

    {
      test: /.js/,
      use: {
          loader: 'babel-loader',
          query: {
              presets: ["env", {

                        modules: false //关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
                      }]
          }
      }
    }

    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

    plugins: [
        new UglifyJSPlugin()
    ]

    webpack --display-used-exports --optimize-minimize

## 提取公共代码

这个变化还是很大的，之前的webpack版本用的都是commonchunkplugin，但是webpack4开始使用
[common-chunk-and-vendor-chunk](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk)
配置如下:

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      }
    }

## Scope Hoisting

作用域提升，这是在webpack3中所提出来的。它会使代码体积更小，因为函数申明语句会产生大量代码.

    const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
      plugins: [
      // 开启 Scope Hoisting
      new ModuleConcatenationPlugin(),
    ],

## CDN

对于静态资源的处理，放入CDN是一个很好的选择，webpack中配置CDN的方式如下:

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]_[hash:8].js',
      publicPath: 'http://static.xxxx.com/'
    },

## 多进程之HappyPack

HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，其中子进程的个数为cpu的个数减去1,需要在loader处修改如下

    use: 'happypack/loader?id=babel',

并且在plugin中添加以下代码:

    new HappyPack({
      id: 'babel',
      //如何处理.js文件，和rules里的配置相同
      loaders: [{
          loader: 'babel-loader',
          query: {
              presets: [
                  "env", "stage-0"
              ]
          }
      }]
    }),

## hash 缓存

将业务代码、第三方类库、runtime 代码、css 单独打包，给他们不同 hash，来最大化利用缓存

webpack3 中分离业务代码、第三方类库需要用 CommonChunksPlugin。
webpack4 的新增 optimization,可以方便的分离代码，而且 hash 的稳定性的问题也有改进。

单独打包业务代码、第三方类库、runtime

		optimization: {
			splitChunks: {      // 打包 node_modules里的代码
					chunks: 'all'
			},
			runtimeChunk: true,  // 打包 runtime 代码
		}

单独打包 css 代码

webpack4 推荐 mini-css-extract-plugin  contenthash

分配不同的 hash

	* [hash] ： 整个项目有变动时，hash 变化。
	* [chunkhash] ： chunk 有变动，chunkhash 变化
	* [contenthash] ： 目前文档没有明确定义和说明，但是和文件内容的变化相关

在分离 js 和 css 时，都用设置 contenthash

		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: 'static/js/[name].[contenthash:8].js',
			publicPath: '/'
		},

		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[contenthash:8].css'
		}),

		配置js的文件名时，之前webpack3都是用chunkhash也没问题，但是实践后发现webpack4中用chunkhash，会导致，
		修改css时引发js的chunkhash变化，从而缓存失效。
