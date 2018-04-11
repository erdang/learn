// JavaScript 引擎进行编译的原理3步
// 1.分词/词法分析
// 将字符组成的字符串分解成有意义的代码块（词法单元）
// 过程中调用的是有状态的规则 就是词法分析  反之分词
// 2.解析/语法分析
// 将词法单元转换成逐级嵌套的抽象语法树AST
// 3.代码执行
// 将AST转换成可执行的代码

// 作用域是一套规则，用于确定在何处以及如何查找变量(标识符)。如果查找的目的是对
// 变量进行赋值，那么就会使用 LHS 查询;如果目的是获取变量的值，就会使用 RHS 查询。 12 | 第1章
  
// 赋值操作符会导致 LHS 查询。=操作符或调用函数时传入参数的操作都会导致关联作用域 的赋值操作。
// JavaScript引擎首先会在代码执行前对其进行编译，在这个过程中，像var a = 2这样的声 明会被分解成两个独立的步骤:
// 1. 首先，var a 在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。 2. 接下来，a = 2 会查询(LHS 查询)变量 a 并对其进行赋值。
// LHS 和 RHS 查询都会在当前执行作用域中开始，如果有需要(也就是说它们没有找到所 需的标识符)，就会向上级作用域继续查找目标标识符，这样每次上升一级作用域(一层 楼)，最后抵达全局作用域(顶层)，无论找到或没找到都将停止。
// 不成功的 RHS 引用会导致抛出 ReferenceError 异常。不成功的 LHS 引用会导致自动隐式 地创建一个全局变量(非严格模式下)，该变量使用 LHS 引用的目标作为标识符，或者抛 出 ReferenceError 异常(严格模式下)。

// 简单地说，词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写 代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域 不变(大部分情况下是这样的)。
// 无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处 的位置决定。
var z = 10;
function foo(){
  console.log(z)
}
(function(arg){
  var z = 20;
  arg(); //10
})(foo)



// JS 解析器：
// 1、准备工作：
//   找东西：var 、函数、参数……（预解析的一个表）
  
//     所有的变量预解析的值都是：未定义
  
//     a = function a(){ alert(2); }
//     （函数名和变量名重名，预解析的时候，会留下函数）
//     a = 3
    
// 2、正式开始干活（逐行解读代码）
//     表达式（动作）：可以修改“表”里面的值
//       = ++ -- += -= *= /= %= 参数 所有的类型转换都是表达式
// */


//闭包就是能够读取其他函数内部变量的函数