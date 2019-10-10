

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

Person.prototype.isPrototypeOf(person1) 实例和对象之间是否存在原型的关系
Object.getPrototypeOf(person1)返回的对象实际就是这个对象的原型
使用 delete 操作符则可以完全删 除实例属性，从而让我们能够重新访问原型中的属性
hasOwnProperty : 看是不是对象自身下面的属性
arr.hasOwnProperty('num2') 
constructor : 查看对象的构造函数
instanceof : 对象与构造函数在原型链上是否有关系
Object.prototype.toString.call(arr) == '[object Array]' 
in 操作符只要通过对象能够访问到属性就返回 true，hasOwnProperty()只在属性存在于 实例中时才返回 true，因此只要 in 操作符返回 true 而 hasOwnProperty()返回 false，就可以确 定属性是原型中的属性

function Person(name){
  this.name = name  原型的属性定义在原型上会被实例所共享 所以属性定义在构造函数里
}
Person.prototype = {
  constructor : Person,
  say:function(){

  }
}
constructor 属性不再指向 Person 了 而是Object     但是这种方法constructor 属性会导致它的[[Enumerable]]特性被设置为 true


继承
主要是依靠原型链来实现继承，单纯的原型链继承 由于实例会共享原型的属性和不能向构造函数传递参数
所以 一般采用组合方式继承 属性的继承  和 方法的继续    通过call或apply 在对象上执行构造函数 和原型

拷贝继承
function Persion(){
  this.name = name
}
Persion.prototype.say=function(){
  console.log('hello')
}
function Person(){
  Persion.call(this)
}
extend(Person.prototype,Persion.prototype)
function extend(obj1,obj2){
  for(var i in obj2){
    obj1[i] =obj2[i]
  }
}

组合继承 伪经典继承
属性继承
function Person(){
  Persion.call(this) 第二次
}
方法继承
Person.prototype = new Persion();   第一次
Person.prototype.constructor = Person;
会调用两次构造函数

改造 寄生式 类式
var F = function(){};
F.prototype = Persion.prototype;
Person.prototype = new F();
Person.prototype.constructor = Bbb; 

function inheritPrototype(subType, superType){
  var prototype = clone(superType);
  prototype.constructor = subType;
  subType.prototype = prototype;
}


原型式继承

function clone(obj){
  var F = function(){}
  F.prototype = obj.prototype;
  return new F()
}

Object.create()
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");


自定义事件

function bindEvent(obj, events, fn) {
  obj.listeners = obj.listeners || {};
  obj.listeners[events] = obj.listeners[events] || [];
  obj.listeners[events].push(fn);
  if (obj.addEventlister) {
    obj.addEventlister(events, fn, false)
  } else {
    obj.attachEvent('on' + events, fn);
  }
}

function fireEvent(obj, events) {
  for (var i = 0; i < obj.listeners[events].length; i++) {
    obj.listeners[events][i]()
  }

}


浅拷贝只是拷贝了引用, 数据在内存中还是一个, 如果引用的对象发生了变化, 该变量也会同步变化.

深拷贝相当于把内存上的数据拷贝了一份, 此时修改该变量不会影响原来的变量, 同理修改原来的变量也不会影响现在的变量.

浅拷贝:

const foo = { bar: 'bar', baz: 'baz' }
const ref_foo = foo
深拷贝(最简单的方法, 拷贝性能也不弱):
//1
const foo = { bar: 'bar', baz: 'baz' }
const ano_foo = JSON.parse(JSON.stringify(foo))
//2
var arr1=[1,2,3,4];
var arr2=[];
for(var i=0; i<arr1.length; i++){
  arr2[i]=arr1[i];
}
arr1.push(5);
arr2.push(6);
alert(arr1); //12345
alert(arr2); //12346
//3
var json1={"name":"鹏哥","age":18,"arr1":[1,2,3,4,5],"string":'afasfsafa',"arr2":[1,2,3,4,5],"arr3":[{"name1":"李鹏"},{"job":"前端开发"}]};
var json2={};
function copy(obj1,obj2){
  var obj2=obj2||{}; //最初的时候给它一个初始值=它自己或者是一个json
  for(var name in obj1){
    if(typeof obj1[name] === "object"){ //先判断一下obj[name]是不是一个对象
      obj2[name]= (obj1[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
      copy(obj1[name],obj2[name]); //然后来无限调用函数自己 递归思想
    }else{
      obj2[name]=obj1[name];  //如果不是对象，直接等于即可，不会发生引用。
    }
  }
  return obj2; //然后在把复制好的对象给return出去
}
json2=copy(json1,json2)
json1.arr1.push(6);
alert(json1.arr1);  //123456
alert(json2.arr1);  //12345
