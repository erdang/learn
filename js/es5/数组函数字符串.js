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
join() 拼接成字符串把数组中的每一个值以连接符作为连接点连接成一个字符串。

	参数 ： 一个  指定一个连接符。
	
	1，如果不指定连接符，默认以逗号作为连接符。
	
	2，连接符也会被连接到字符串中。

数组去重

for(var i=0;i<arr.length;i++){
	for(var j=i+1;j<arr.length;j++){
		if(arr[j]==arr[i]){
			arr.splice(j,1)
			j--;
		}
	}
}
var arr1=[];
var json={}

for(var i=0;i<arr.length;i++){
	if(!json[arr[i]]){
		arr1.push(arr[i])
		json[arr[i]]=1
	}
}



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
charAt()  返回指定位置字符
charCodeAt() 返回指定位置字符编码
字符串方法
concat()，用于将一或多个字符串拼接起来，  返回拼接得到的新字符串
var stringValue = "hello ";
var result = stringValue.concat("world", "!");

截取字符串
slice() 两个参数  开始位置 结束位置 返回新的字符串 结束位置不包括结束位置字符
substr()  两个参数  开始位置  返回的字符个数
substring() 两个参数  开始位置 结束位置 返回新的字符串 结束位置不包括结束位置字符

查找字符串
indexOf()和 lastIndexOf()
从 一个字符串中搜索给定的子字符串，然后返子字符串的位置(如果没有找到该子字符串，则返回-1) 这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索

toLowerCase()、toUpperCase()和 
toLocaleLowerCase()、 toLocaleUpperCase() 根据时区
大小写

匹配
match()方法只接受一个参数，要么是一 个正则表达式，要么是一个 RegExp 对象  返回新的数组
search()这个方法的唯一参数与 match()方法的参数相同  返回返回字符串中第一个匹配项的索引 如果没 有找到匹配项，则返回-1
replace() 第 一个参数可以是一个 RegExp 对象或者一个字符串 第二个参 数可以是一个字符串或者一个函数
split()这个方法可以基于指定的分隔符将一个字符串分割成 多个子字符串，并将结果放在一个数组中
localeCompare()，这个方法比较两个字符串
如果字符串在字母表中应该排在字符串参数之前，则返回一个负数(大多数情况下是-1，具体 的值要视实现而定);
如果字符串等于字符串参数，则返回 0;
如果字符串在字母表中应该排在字符串参数之后，则返回一个正数(大多数情况下是 1，具体的


	encodeURI() 主要用于整个 URI 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、 问号和井字号 只有空格被替换成了 %20
	encodeURIComponent() 主要用于对 URI 中的某一段 会对它发现的任何非标准字符进行编码 对应的编码替换所有非字母数字字符
	decodeURI()和 decodeURIComponent()
	eval()中创建的任何变量或函数都不会被提升，因为在解析代码的时候，它们被包含在一个字 符串中;它们只在 eval()执行的时候创建

	var values = [2,5,4,2]
	var max = Math.max.apply(Math, values);

	Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数;
	Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数;
	Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(这也是我们在数学课
	 上学到的舍入规则)。 
取一组随机的数字

x ~ y  	 : Math.round(Math.random()*(y-x) + x)

0 ~ x    : Math.round(Math.random()*x)

1 ~ x		 : Math.ceil(Math.random()*x)

