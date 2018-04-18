

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
hasOwnProperty : 看是不是对象自身下面的属性
arr.hasOwnProperty('num2') 
constructor : 查看对象的构造函数
instanceof : 对象与构造函数在原型链上是否有关系
Object.prototype.toString.call(arr) == '[object Array]' 
in 操作符只要通过对象能够访问到属性就返回 true，hasOwnProperty()只在属性存在于 实例中时才返回 true，因此只要 in 操作符返回 true 而 hasOwnProperty()返回 false，就可以确 定属性是原型中的属性

function Person(){
}
Person.prototype = {
  constructor : Person,
  name : "Nicholas", 
  job: "Software Engineer"
}
constructor 属性不再指向 Person 了 而是Object     但是这种方法constructor 属性会导致它的[[Enumerable]]特性被设置为 true