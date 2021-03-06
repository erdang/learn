MVX框架模式：MVC+MVP+MVVM

1.MVC：Model(模型)+View(视图)+controller(控制器)，主要是基于分层的目的，让彼此的职责分开。

View通过Controller来和Model联系，Controller是View和Model的协调者，View和Model不直接联系，基本联系都是单向的。

用户User通过控制器Controller来操作模板Model从而达到视图View的变化。

2.MVP：是从MVC模式演变而来的，都是通过Controller/Presenter负责逻辑的处理+Model提供数据+View负责显示。

在MVP中，Presenter完全把View和Model进行了分离，主要的程序逻辑在Presenter里实现。

并且，Presenter和View是没有直接关联的，是通过定义好的接口进行交互，从而使得在变更View的时候可以保持Presenter不变。

MVP模式的框架：Riot,js。

3.MVVM：MVVM是把MVC里的Controller和MVP里的Presenter改成了ViewModel。Model+View+ViewModel。

View的变化会自动更新到ViewModel,ViewModel的变化也会自动同步到View上显示。

这种自动同步是因为ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作。

MVVM模式的框架有：AngularJS+Vue.js和Knockout+Ember.js后两种知名度较低以及是早起的框架模式。

Augular

脏检查 

双向数据绑定
简单来说就是给每个需要绑定的元素加个watcher，缓存下oldValue，然后定时（定时不准确 确切的说是指定事件触发后，才进入$digest cycle：）遍历所有的watcher，比较newValue和oldValue，如果变化了做更新操作。


react

使用虚拟dom  vue支持但不依赖 默认html模板
组件化 
注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

组件之间依赖性比较强 手动设置哪些组件不需要渲染 哪些需要渲染
vue自动追踪渲染
  
采用jsx 语法 一切都是js
vue 默认html模板