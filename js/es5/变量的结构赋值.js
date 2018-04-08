//数组的解构赋值
//结构不成功 值=undefined
let [a,b,c] = [1,2,3] // a=1 ,b=2 ,c=3
let [a,b] = [1,2,3] // a=1, b=2
let [a = 1 ,b] =[] // a=1 ,b = undefined
//对于 Set 结构，也可以使用数组的解构赋值。

let [x, y, z] = new Set(['a', 'b', 'c']);
//x // "a"
//默认值 
//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [a,b=1] = [1,undefined] //a=1 b=1

//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
let [a=fn()] = [1] 
//因为a能取到值，所以函数fn根本不会执行。

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
//上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明

//对象的解构赋值
//对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let {bar ,foo} = {foo:'foo',bar:'bar'}
//果变量名与属性名不一致，必须写成下面这样。
let {foo:baz} = {foo:"abb",bar:"abc"}//baz = abb

let {
  p :[
    x,
    {y}
  ]
} = {
  p:[
    "hello",
    {y:"world"}
  ]
}
// p 这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。
let {
  p :[
    x,
    {y}
  ]
} = {
  p,p:[
    "hello",
    {y:"world"}
  ]
}

//默认值
var {x=3} = {} //x=3
var {x,y=3} = {x:1} //x=1 ,y=3
var {x : y=3} ={} // y=3
var {x:y=3} = {x:5} //y=5
//默认值生效的条件是，对象的属性值严格等于undefined。
//如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

// 报错
let {foo: {bar}} = {baz: 'baz'}; //foo 不存在

//字符串的解构赋值
const [a, b, c, d, e] = 'hello';
//数值和布尔的解构赋值
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
//上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

//解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象

//函数的参数也可以使用解构赋值
function fn([x,y]){
  return x+y
}
fn([3,5]) //8
//变量指定默认值
function fn1({x=0,y=0}={}){
  return [x,y]
}
fn1({x:3,y:5}) //[3,5]
fn1({y:5})//[0,5]
fn1({})//[0,0]
//函数的参数指定默认值
function fn2({x,y}={x=0,y=0}){
  return [x,y]
}
fn2({x:3,y:5}) //[3,5]
fn2({y:5})//[undefined,5]
fn2({})//[undefined,undefined]
fn2({undefined,undefined}) //[0,0]
//undefined就会触发函数参数的默认值。


//用途
//交换变量的值
let x=1
let y=2
[x,y]=[y,x]
//函数返回多个值
let example =function(){
  return [1,2,3]
}
let [a,b,c] = example()

function example(){
  return {
    foo:1,
    bar:2
  }
}
let {foo,bar} = example()

//3）函数参数的定义

//解构赋值可以方便地将一组参数与变量名对应起来。

// 参数是一组有次序的值
function f([x, y, z]) {  }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) {  }
f({z: 3, y: 2, x: 1});
//（4）提取 JSON 数据

//解构赋值对提取 JSON 对象中的数据，尤其有用。

let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
//函数参数的默认值(变量)
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}={}) {
  // ... do stuff
};
//指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

//7）输入模块的指定方法

//加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

const { SourceMapConsumer, SourceNode } = require("source-map");

// 参数解构的默认值
// 你可以为参数解构提供可解构的默认值，就像在解构赋值时所做的那样，只需在其中每个参
// 数后面添加等号并指定默认值即可。例如:
function setCookie(name, value, { secure, path, domain, expires } = {}) {
    // ...
}

101

 
function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
} = {} ){
// ...
}
//  此代码中参数解构给每个属性都提供了默认值，所以你可以避免检查指定属性是否已被传入
// (以便在未传入时使用正确的值)。而整个解构的参数同样有一个默认值，即一个空对象，
// 令该参数成为可选参数。这么做使得函数声明看起来比平时要复杂一些，但却是为了确保每
// 个参数都有可用的值而付出的微小代价。

//总结
// 解构使得在 JS 中操作对象与数组变得更容易。使用熟悉的对象字面量与数组字面量语法，可 以将数据结构分离并只获取你感兴趣的信息。对象解构模式允许你从对象中进行提取，而数 组模式则能用于数组。
// 对象与数组解构都能在属性或项未定义时为其提供默认值;在赋值表达式右侧的值为 null 或 undefined 时，两种模式都会抛出错误。你也可以在深层嵌套的数据结构中使用对象与数 组解构，下行到该结构的任意深度。
// 使用 var 、 let 或 const 的解构声明来创建变量，就必须提供初始化器。解构赋值能替 代其他赋值，并且允许你把值解构到对象属性或已存在的变量上。
// 参数解构使用解构语法作为函数的参数，让“选项”( options )对象更加透明。你实际感兴趣 的数据可以与具名参数一并列出。解构的参数可以是对象模式、数组模式或混合模式，并且 你能使用它们的所有特性。


