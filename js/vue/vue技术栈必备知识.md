### vue生命周期

  1. beforeCreate
  这个钩子是new Vue()之后触发的第一个钩子，在当前阶段中data、methods、computed以及watch上的数据和方法均不能被访问。
  2. created
  这个钩子在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，注意请求数据不易过多，会造成白屏时间过长。在当前阶段无法与Dom进行交互，如果你非要想，可以通过vm.$nextTick来访问Dom。
  3. beforeMounted
  这个钩子发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。
  4. mounted
  这个钩子在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$ref属性对Dom进行操作。也可以向后台发送请求，拿到返回数据。
  5. beforeUpdate
  这个钩子发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
  6. updated
  这个钩子发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
  7. beforeDestroy
  这个钩子发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
  8. destroyed
  这个钩子发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

    export function renderList (
      val: any,
      render: (
        val: any,
        keyOrIndex: string | number,
        index?: number
      ) => VNode
    ): ?Array<VNode>{
    ...
    }

  * index?: number 这个我们想想正则表达式中？的含义---0个或者1个，这里其实意义也是一致的，但是要注意?的位置是在冒号之前还是冒号之后--因为这两种可能性都有，上面代码中问号是跟在冒号前面，代表index可以不传，但是传的话一定要传入数字类型；如果问号是在冒号后面的话，则代表这个参数必须要传递，但是可以是数字类型也可以是空
  
  [Vue 开发必须知道的 36 个技巧](https://juejin.im/post/5d9d386fe51d45784d3f8637)

vue 双向数据绑定原理

> vue是采用数据劫持结合发布/订阅模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变化的时候发布消息给订阅者，触发相应的函数回调更新

>vue 初始化  生命周期，事件 props methods data 等等，最主要的是通过Object.defineProperty()设置setter，getter，用来实现响应式和依赖收集,然后执行$mound 挂在

[源码 vue](https://github.com/DMQ/mvvm)