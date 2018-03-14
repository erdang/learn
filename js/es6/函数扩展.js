//参数默认值
//es5 安全的
//安全的替代方法是使用 typeof 来检测参数的类型，正如下例:
function makeRequest(url, timeout, callback) {
    // timeout = timeout || 2000  不安全timeout 可能为0 0是假值
    // callback = callback || function(){}
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};
// 函数的剩余部分 
}

function abc({x=0,y=0}={}){//等于{}表示参数是可选的 可有可没有，只要设置了参数默认值 就表示可选的
  return [x,y]
}
function abd({x,y}={x:0,y:0}){
  return [x,y]
}
//当参数 是undifined 的时候 才会触发参数的默认值
// 上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。
// 函数没有参数的情况
abc() // [0, 0]
abd() // [0, 0]

// x 和 y 都有值的情况
abc({x: 3, y: 8}) // [3, 8]
abd({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
abc({x: 3}) // [3, 0]
abd({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
abc({}) // [0, 0];
abd({}) // [undefined, undefined]

abc({z: 3}) // [0, 0]
abd({z: 3}) // [undefined, undefined]

//定义了默认值的参数，应该是函数的尾参数
//指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
//函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失

//rest 参数  ...abc rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function f1(...a){
  //...a 是个数组
  console.log(a)
}
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments,0).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

//name 
//匿名函数 es5返回空字符串  es6 返回函数名
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

//箭头函数
// 箭头函数，顾名思义就是用箭头（=>来定义的函数，不会用到关键字‘function’），例如:

// let sum = (a, b)=> {return a + b;}
// 效果等同于：

// var sum = function(a, b){return a + b;}
// 但是，事实上上面两个function存在很多不同，会在之后的第三点讲解。

// 2: 箭头函数的多种定义方式
// 箭头函数的定义形式有很多种（这也是我不喜欢的一点，呵呵），具体的有：

// 1: 什么情况下都可以型

// let sum = (a, b)=>{return a + b;}

// 这种是最常用，最通用的形式。

// 2: 只有一个参数型

// let self = num1 => {return num1;}

// 可以看到相对第一种定义的区别是：没有用（）包围参数. 这种形式只可以在这种情况下用。

// 3: 没有参数型

// let functionA = ()=> {return 'hehe';}

// 当没有参数时，必须要有'()'。
// 4: 两个参数及其以上型


// let sum = (a, b) => {return a + b;}

// 当有两个及其以上的参数时，也必须要用‘（）’把参数括起来。
// 5:没有return&&没有{}

// let sum = (a, b) => a + b;

// 你可以同时不给return关键字和{}，效果`等同`于上面的第4种情况
// 6: 没有return && 有{}

// let sum = (a, b)=> {a + b;}

// 这种情况不等于第5种，这种情况下`'a+b'`并不会作为这个函数的返回值，如果你调用这个函数，得到的结果`‘undefined’`
// 7: 有return && 没有{}

// let sum = (a, b)=> return a + b;

// 不要作死，这种写法直接给你一个syntaxError.
// 注明，以上的第5，6，7点针对的是函数方法体的部分，不论函数参数是几个，结果没有区别；同样的，第2，3，4点针对的是函数的参数部分，不论函数的方法体怎么写，对结果没有影响。

// 3: 箭头函数和一般的非箭头函数的区别:

// 1: 没有this, super, arguments和new.target绑定。一个箭头函数里面的这几个指由包含它的最近的非箭头函数决定
// 2: 不能使用new来调用。因为箭头函数没有构造方法。
// 3: 没有［prototype］属性。因为不能new一个箭头函数，所以prototype也没必要有了。
// 4: 不能改变this的值。this的值在这个箭头函数的整个生命周期里面都不变。
// 5: 没有arguments。你必须通过命名参数和剩余参数去获取箭头函数的参数。
// 6: 不能有重名参数。非箭头函数在非严格模式下面可以有重名参数。