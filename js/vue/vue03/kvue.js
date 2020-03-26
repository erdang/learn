// 期待用法
// new KVue({
//     data:{msg:'hello'}
// })

class KVue {
  constructor(options) {
    this.$options = options;

    //处理data选项
    this.$data = options.data;
    // 响应化
    this.observe(this.$data);

    // new Watcher();
    // this.$data.test;
    // new Watcher();
    // this.$data.foo.bar;

    new Compile(options.el, this);

    if (options.created) {
        options.created.call(this);
    }
  }

  observe(value) {//实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
      if (!value || typeof value !== 'object') {
       return;   
      }
      // 遍历对象
      Object.keys(value).forEach(key => {
          this.defineReactive(value, key, value[key])
          // 代理到vm上
          this.proxyData(key);
      })
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
        get(){
            return this.$data[key];
        },
        set(newVal){
          this.$data[key] = newVal;
        }
    })
  }
  defineReactive(obj, key, val) {
      const dep = new Dep();

      Object.defineProperty(obj, key, {
          get(){
              // 将Dep.target添加到dep中
              Dep.target && dep.addDep(Dep.target)
              return val;
          },
          set(newVal){
            if (newVal !== val) {
                val = newVal;
                // console.log(`${key}更新了：${newVal}`);
                dep.notify();
                console.log(dep)
            }
          }
      })
      // 递归
      this.observe(val);
      
  }
  
}
//怎么才能通知 订阅者 watcher 这时需要一个 第三者一个数组  收集管理 watcher 采用发布订阅模式  
class Dep {
    constructor(){
        this.deps = [];
    }

    addDep(dep) {//订阅
        this.deps.push(dep)
    }

    notify() {//发布
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {//订阅者  实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        
        Dep.target = this;
        this.vm[this.key];// 添加watcher到dep
        Dep.target = null;
    }
    update() {
        // console.log('属性更新了');
        this.cb.call(this.vm, this.vm[this.key])
    }
}
