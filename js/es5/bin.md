新建 bin 文件夹 在里面建 kkb文件 没后缀
里面 写 #!/usr/bin/env node 指定解释器

package.json  增加
"bin": {
    "kkb": "./bin/kkb"
  },

npm link 

输入kkb