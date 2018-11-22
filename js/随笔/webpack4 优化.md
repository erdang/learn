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