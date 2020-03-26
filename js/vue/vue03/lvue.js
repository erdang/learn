// new lVue({
//   data:{
//     msg:'hello'
//   }
// })

class lVue{
  constructor(options){
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);
  }

  observe(value){
    if(!value || typeof value !== 'Object'){return;}
    Object.keys(value).forEach((key)=>{
      this.defineReactive(value,key,value[key]);
      this.proxyData(key)
    })
  }
  proxyData(key){
    Object.defineProperty(this,key,{
      get(){
        return this.$data[key];
      },
      set(newVal){
       this.$data[key] = newVal;
      }
    })
  }
  defineReactive(obj,key,val){
    Object.defineProperty(obj,key,{
      get(){
        return val;
      },
      set(newVal){
        if(newVal !==val){
          val =newVal;
        }
      }
    })
    this.observe(val);
  }
}
//初始化的时候 会创建编译器和 observe

class Dep{
  constructor(){
    this.deps =[];
  }
  addDep(dep){
    this.deps.push(dep)
  }
  notify(){
    this.deps.forEach((dep)=>{
      dep.update()
    })
  }
}

class Watcher{
  constructor(){
    Dep.target = this;
  }
  update(){
    
  }
}