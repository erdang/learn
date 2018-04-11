//let 基本用法  
//它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

{
    let a = 10;
    var b = 1;
}
  
  console.log(a) // ReferenceError: a is not defined.
  console.log(b) // 1

//不存在变量提升

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

//暂时性死区
//在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError
  
    let tmp; // TDZ结束
    console.log(tmp); // undefined
  
    tmp = 123;
    console.log(tmp); // 123
  }
//“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
typeof x; // ReferenceError
let x;

//有些“死区”比较隐蔽，不太容易发现。

function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
//上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的//默认值是x，就不会报错，因为此时x已经声明了。


//不允许重复 声明

//块级作用域

//const 命令  与let 一样用法
//const声明一个只读的常量。一旦声明，常量的值就不能改变。
// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
// 上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性

// 总结
// let 与 const 块级绑定将词法作用域引入了 JS 。这两种声明方式都不会进行提升，并且 只会在声明它们的代码块内部存在。由于变量能够在必要位置被准确声明，其表现更加接近 其他语言，并且能减少无心错误的产生。作为一个副作用，你不能在变量声明位置之前访问 它们，即便使用的是 typeof 这样的安全运算符。由于块级绑定存在暂时性死区( TDZ )， 试图在声明位置之前访问它就会导致错误。
// let 与 const 的表现在很多情况下都相似于 var ，然而在循环中就不是这样。在 for-in 与 for-of 循环中， let 与 const 都能在每一次迭代时创建一个新的绑定，这意味着在循 环体内创建的函数可以使用当前迭代所绑定的循环变量值(而不是像使用 var 那样，统一使 用循环结束时的变量值)。这一点在 for 循环中使用 let 声明时也成立，不过在 for 循 环中使用 const 声明则会导致错误。
// 块级绑定当前的最佳实践就是:在默认情况下使用 const ，而只在你知道变量值需要被更改 的情况下才使用 let 。这在代码中能确保基本层次的不可变性，有助于防止某些类型的错 误。