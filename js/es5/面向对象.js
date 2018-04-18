import { prototype } from "module";

数据属性 和访问器属性

Object.defineProperty(obj,'is',{
  value,属性的值
  writable,是否可以被重写
  configurable,是不是被删除或修改
  enumerable 是否是枚举类型
})

访问器属性 没有value 和writable
Object.defineProperty(obj,'is',{
  get:function(){}获取属性的值的函数
  set:function(){}设置属性的值函数
  configurable,是不是被删除或修改
  enumerable 是否是枚举类型
})
定义多个属性
Object.defineProperties(obj,{
  _name:{
    value:''
  },
  _ha:{
    value:''
  }
})

Object.getOwnPropertyDescriptor(obj,属性名)h获取属性描述


new操作符 干了啥
创建一个空对象 this指向改对象
对象的原型指向构造函数的原型
修改构造函数的this为obj 
返回该对象
var obj = {}
obj._proto_ = fn.prototype
fn.call(obj)

原型对象 prototype 每个函数都有一个prototype属性 他指向的那个对象就是原型对象
原型链 _proto_ 实例对象和构造函数原型之间链接

Person.prototype.isPrototypeOf(person1) 对象之间是否存在原型的关系
Object.getPrototypeOf(person1)返回的对象实际就是这个对象的原型
使用 delete 操作符则可以完全删 除实例属性，从而让我们能够重新访问原型中的属性