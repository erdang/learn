1.栈数据结构  后进先出  后添加的先出去 只有一个出口 栈的顶部
数组模拟
var arr = [1,2]
arr.push(3) 尾部添加 返回数组长度
var a = arr.pop() 尾部删除 返回删除的值

2.队列  先进先出  最先添加的先出去   两个出口 队列末端添加 前端删除  
数组模拟
var arr1 = [2,3]
arr.push(4)
arr.shift() 头部删除 返回删除的值
//unshift() 头部添加 返回数组长度
3.排序 
arr.reverse() 翻转数组
arr.sort() 排序

var arr = [3,2,5,1,8,9]
var arr2=arr.sort(function(value1,value2){
  return value2-value1
}) 降序
console.log(arr2)
4.操作方法
arr=arr.concat()
没有参数 复制当前数组返回当前数组副本
有参数 添加当前数组并返回
sclie(start,end) 开始结束位置 返回一个新数组 start可以省略
splice() 返回数组 包含被删除的项
删除  2个参数  起始位置  删除几个
添加  3个参数  起始位置  删除0个  添加的值
替换  3个参数  起始位置  删除几个  添加的项
6.查找
indexOf()  返回索引
lastIndexOf(）
7.迭代方法 数组的每一项  索引 数组本身
every(function(item, index, array){})  每一项必须都符合 返回true
some(function(item, index, array){})  只有有一项符合函数 返回true
filter(function(item, index, array){}) 过滤符合函数条件
map(function(item, index, array){})    为数组每一项遍历
foreach(function(item, index, array){}) 没有返回值 


Date对象
var now = new Date() 没有参数 获取的是当前的时间
获取特定时间 传入毫秒数
获取毫秒数  传入时间 new Date("January 12,2006 22:19:35"); 

var time = Date().now()  调用这个方法时的日期和时间的毫秒数
var time = +Date().now() 使用+操作符把 Data 对象转换成字符串，也可以达到同样的目的 在不支持的浏览器中

function showTime(){
	var newDate = new Date(2014,3,17);
	var nowDate = new Date();
	
	var time = newDate - nowDate;
	var d = Math.floor(time/86400000);
	
	time %= 86400000;
	var h = Math.floor(time/3600000);
	time %= 3600000;
	var m = Math.floor(time/60000);
	time %= 60000;
	var s = Math.floor(time/1000);

	oSpan.innerHTML = "距离国庆节还有："+d+"天"+h+"时"+m+"分"+s+"秒";



}



函数 arguments 对象属性callee 指向拥有这个 arguments 对象的函数 函数自身
function factorial(num){
  if (num <=1) {
      return 1;
  } else {
      return num * arguments.callee(num-1)
} }
函数对象的属性:caller 这个属性中保存着调用当前函数的函数的引用， 如果是在全局作用域中调用当前函数，它的值为 null


包装对象 每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们 能够调用一些方法来操作这些数据 然后立即销毁
3种特殊的引用类型  String Boolean Number

(1) 创建 String 类型的一个实例;
(2) 在实例上调用指定的方法;
(3) 销毁这个实例。
可以将以上三个步骤想象成是执行了下列 ECMAScript 代码。
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;

字符串
字符方法
charAt() charCodeAt()