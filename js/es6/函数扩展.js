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

//rest 参数  ...abc rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。用于获取函数的多余参数
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

//双冒号运算符::
//函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面
// foo::bar;
// // 等同于
// bar.bind(foo);

// foo::bar(...arguments);
// // 等同于
// bar.apply(foo, arguments)

//尾调用优化  只保留内层函数的调用帧
//函数调用自身，称为递归。如果尾调用自身，就称为尾递归。 尾递归来说，由于只存在一个调用帧
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
const fn = ()=>{

}

// 总结
// 函数在 ES6 中并未经历巨大变化，然而一系列增量改进使得函数更易使用。
// 在特定参数未被传入时，函数的默认参数允许你更容易指定需要使用的值。而在 ES6 之前， 这要求在函数内使用一些额外代码，以便检查参数是已否提供并为其分配一个不同的值。
// 剩余参数允许你将余下的所有参数放入指定数组。使用真正的数组并让你指定哪些参数需要 被包含，使得剩余参数成为比 arguments 更为灵活的解决方案。
// 扩展运算符是剩余参数的好伙伴，允许在调用函数时将数组解构为分离的参数。在 ES6 之 前，要把数组的元素作为独立参数传给函数只有两种办法:手动指定每一个参数，或者使用
// apply() 方法。有了扩展运算符，你就能轻易将数组传递给函数而无须担心该函数的 this 绑定。
// 新增的 name 属性能帮你在调试与执行方面更容易地识别函数。此外， ES6 正式定义了块级 函数的行为，因此在严格模式下它们不再是语法错误。
// 在 ES6 中，函数的行为被 [[Call]] 与 [[Construct]] 方法所定义，前者对应普通的函数执 行，后者则对应着使用了 new 的调用。 new.target 元属性也能用于判断函数被调用时是否 使用了 new 。
// ES6 函数的最大变化就是增加了箭头函数。箭头函数被设计用于替代匿名函数表达式，它拥 有更简洁的语法、词法级的 this 绑定，并且没有 arguments 对象。此外，箭头函数不能修 改它们的 this 绑定，因此不能被用作构造器。
// 尾调用优化允许某些函数的调用被优化，以保持更小的调用栈、使用更少的内存，并防止堆
// 栈溢出。当能进行安全优化时，它会由引擎自动应用。不过你可以考虑重写递归函数，以便
// 能够利用这种优化。


//Promise.all 限制并发数
class Limit {
  constructor (n) {
    this.limit = n
    this.count = 0
    this.queue = []
  }

  enqueue (fn) {
    // 关键代码: fn, resolve, reject 统一管理
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
    })
  }

  dequeue () {
    if (this.count < this.limit && this.queue.length) {
      // 等到 Promise 计数器小于阈值时，则出队执行
      const { fn, resolve, reject } = this.queue.shift()
      this.run(fn).then(resolve).catch(reject)
    }
  }

  // async/await 简化错误处理
  async run (fn) {
    this.count++
    // 维护一个计数器
    const value = await fn()
    this.count--
    // 执行完，看看队列有东西没
    this.dequeue()
    return value
  }

  build (fn) {
    if (this.count < this.limit) {
      // 如果没有到达阈值，直接执行
      return this.run(fn)
    } else {
      // 如果超出阈值，则先扔到队列中，等待有空闲时执行
      return this.enqueue(fn)
    }
  }
}

Promise.map = function (list, fn, { concurrency }) {
  const limit = new Limit(concurrency)
  return Promise.all(list.map((...args) => {
    return limit.build(() => fn(...args))
  }))
}