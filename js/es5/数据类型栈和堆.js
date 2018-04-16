
数据类型
基本类型：Number String Boolean null undefined symbol 
引用类型：Object Array Date RegExp Function 等  

栈 会自动分配内存空间，由系统自动释放。 先进后出，后进先出”——类比兵兵球盒，仅当上面的出栈才能执行下面的
堆 时动态分配的内存，大小不确定，不会自动释放，而且不允许直接访问。 随意存取”——类比书橱，不受入栈出栈的影响，需要某个对象或方法时，使用指针引用即可 

基本类型： 存放在栈中，其大小确定，内存空间自动分配。
引用类型： 存放在堆中，如数组等，它们大小不确定，不固定。                

所谓标识符，就是指变量、函数、属性的名字，或者函数的参数
null  表示空对象的引用  
undefined 表示未定义 应该有一个值 没有定义 

NaN，即非数值(Not a Number)是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数
未返回数值的情况
NaN 与任何值都不相等，包括 NaN 
isNaN()函数。这个函数接受一个参数，该参数可以 是任何类型，而函数会帮我们确定这个参数是否“不是数值”

数值转换
Number()
整体 忽略前导0 
//Number(1.1) //1.1  Number(1) //1  Number(00001) //1
//Number(true)//1   Number(false)//0
//Number(null) //0  Number(undefined) //NaN
//Number('') //0  Number('hello') //NaN

parseInt(a,b) 两个参数  b进制 a要转换的   整数
从左往右 不忽略前导0  如果首位为0表示8进制 忽略前边空格
//parseInt("") NaN
//parseInt(22.5) 22
//parseInt("1234blue") 1234
parseFloat() 小数 只解析十进制值
从左往右 第一个小数点有效 忽略前导0
// var num1 = parseFloat("1234blue"); 1234
// var num2 = parseFloat("0xA"); 0
// var num3 = parseFloat("22.5"); 22.5
// var num4 = parseFloat("22.34.5"); 22.34
// var num5 = parseFloat("0908.5");908.5
// var num6 = parseFloat("3.125e7");31250000

转成字符串 toString()方法不能转换null和undefiend     String()函数  可以转换null为null undefined为undefined


一元操作符 只能操作一个值的操作符叫做一元操作符
前置递增递减
执行前置递增和递减操作时，变量的值都是在语句被求值以前改变的
var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2; // 等于 21
var num4 = num1 + num2;  // 等于 21

后置递增递减
递增和递减操作是在包含它们的语句被求 值之后才执行的
var num1 = 2;
var num2 = 20;
var num3 = num1-- + num2; // 等于 22 
var num4 = num1 + num2;  // 等于 21
一元加 放在数值前面，对数值不会产生任何影响 在对非数值应用一元加操作符时，该操作符会像 Number()转型函数一样对这个值执行转
var s1 = "01"; //+s1  1
var s2 = "1.1"; //+s2 1.1
var s3 = "z"; //+s3 NaN
var b = false; //+b 0
var f = 1.1;//+f 1.1
var o = {
    valueOf: function() {
        return -1;
  } }; //+o -1

  var og = {} && 5
  console.log(og)

  确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用 instanceof 操作符
  person instanceof Object  判断是什么类型的引用类型
  colors instanceof Array