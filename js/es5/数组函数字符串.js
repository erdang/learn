// 1.栈数据结构  后进先出  后添加的先出去 只有一个出口 栈的顶部
// 数组模拟
var arr = [1,2]
arr.push(3) //尾部添加 返回数组长度
var a = arr.pop() //尾部删除 返回删除的值

//2.队列  先进先出  最先添加的先出去   两个出口 队列末端添加 前端删除  
//数组模拟
var arr1 = [2,3]
arr.push(4)
arr.shift() //头部删除 返回删除的值
//unshift() 头部添加 返回数组长度
//3.排序 
arr.reverse() ///翻转数组
arr.sort() //排序

var arr = [3,2,5,1,8,9]
var arr2=arr.sort(function(value1,value2){
  return value2-value1
}) //降序
console.log(arr2)
//4.操作方法
arr=arr.concat()
//没有参数 复制当前数组返回当前数组副本
//有参数 添加当前数组并返回
// slice(start,end) 开始结束位置 返回一个新数组 start可以省略 end 为负值 表示从尾部开始
// splice() 返回数组 包含被删除的项
// 删除  2个参数  起始位置  删除几个
// 添加  3个参数  起始位置  删除0个  添加的值
// 替换  3个参数  起始位置  删除几个  添加的项
// 6.查找
// indexOf()  返回索引
// lastIndexOf(）
// 7.迭代方法 数组的每一项  索引 数组本身
// every(function(item, index, array){})  每一项必须都符合 返回true
// some(function(item, index, array){})  只有有一项符合函数 返回true
// filter(function(item, index, afrray){}) 过滤符合函数条件
// map(function(item, index, array){})    为数组每一项遍历
// foreach(function(item, index, array){}) 没有返回值 
// join() 拼接成字符串把数组中的每一个值以连接符作为连接点连接成一个字符串。

// 	参数 ： 一个  指定一个连接符。
	
// 	1，如果不指定连接符，默认以逗号作为连接符。
	
// 	2，连接符也会被连接到字符串中。

// 数组去重

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



//Date对象
var now = new Date() ////没有参数 获取的是当前的时间
//获取特定时间 传入毫秒数
//获取毫秒数  传入时间 new Date("January 12,2006 22:19:35"); 

var time = Date().now()  //调用这个方法时的日期和时间的毫秒数
var time = +Date().now() //使用+操作符把 Data 对象转换成字符串，也可以达到同样的目的 在不支持的浏览器中

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



//函数 arguments 对象属性callee 指向拥有这个 arguments 对象的函数 函数自身
function factorial(num){
  if (num <=1) {
      return 1;
  } else {
      return num * arguments.callee(num-1)
} }
//函数对象的属性:caller 这个属性中保存着调用当前函数的函数的引用， 如果是在全局作用域中调用当前函数，它的值为 null


// 包装对象 每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们 能够调用一些方法来操作这些数据 然后立即销毁
// 3种特殊的引用类型  String Boolean Number

// (1) 创建 String 类型的一个实例;
// (2) 在实例上调用指定的方法;
// (3) 销毁这个实例。
// 可以将以上三个步骤想象成是执行了下列 ECMAScript 代码。
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;

字符串
字符方法
charAt()  返回指定位置字符 当参数为空或NaN时，默认参数为0；当参数超出范围时，则返回一个空字符串　
charAt()方法涉及到Number()函数的隐式类型转换，如果转换为数值，则按照上述规则输出字符串；如果转换为NaN，则输出第0个字符

charCodeAt() 返回指定位置字符编码 参数为空或NaN时，默认参数为0；当参数超出范围时，则返回NaN
charCodeAt()方法涉及到Number()函数的隐式类型转换，如果转换为数值，则按照上述规则输出相应值；如果转换为NaN，则输出第0个字符的字符编码

var str = "hello";
字符串方法
concat()，用于将一或多个字符串拼接起来，  返回拼接得到的新字符串
concat()方法用于将一个或多个字符串拼接起来，返回拼接得到的新字符串，而原字符串不发生改变。若参数(第一个参数除外)不是字符串，则通过String()方法隐式转换为字符串，再进行字符串拼接
var stringValue = "hello ";
var result = stringValue.concat("world", "!"); //hello world!
由于数组也存在concat()方法，参数会按照首先出现的参数是数组还是字符串来决定如何转换

'1,2,3,'.concat([4,5]);//'1,2,3,4,5'
[1,2,3].concat(',4,5');//[1, 2, 3, ",4,5"]

截取字符串
slice(start,end) 两个参数  开始位置 结束位置 返回新的字符串 结束位置不包括结束位置字符
如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符
如果start是负数，则start = max(length + start,0)
如果end是负数，则end = max(length + end,0)
start和end无法交换位置
slice()方法涉及到Number()转型函数的隐式类型转换，当start被转换为NaN时，相当于start = 0；当end被转换为NaN时(end为undefined除外)，则输出空字符串

substring(start,end)方法需要两个参数start和end，返回这个字符串中从start位置的字符到(但不包含)end位置的字符的一个子字符串；如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符
如果任一参数是NaN或负数，则被0取代
如果任一参数大于字符串长度，则被字符串长度取代
如果start 大于 end，则交换它们的值
样地，substring()方法也涉及到Number()转型函数的隐式类型转换

substr(start,end)方法需要两个参数start和end，end代表返回的子字符串的字符个数；该方法返回这个字符串中从start位置的字符开始的end个字符的一个子字符串；如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符

查找字符串
indexOf()和 lastIndexOf()
indexOf(searchString,start)方法接收searchString和start两个参数，返回searchString首次出现的位置，如果没有找到则返回-1
searchString表示要搜索的子字符串；start表示该搜索的开始位置，若忽略该参数或该参数为undefined、NaN或负数时，start = 0
function allIndexOf(str,value){
	var result = [];
	var pos = str.indexOf(value);
	while(pos > -1){
			result.push(pos);
			pos = str.indexOf(value,pos+value.length);
	}
	return result;
}
console.log(allIndexOf('helllhelllhelll','ll'));//[2,7,12]
lastIndexOf()方法常用于获取URL地址中的扩展名

var url = "http://cnblogs.com/xiaohuochai.txt";
function getFileFormat(url){
    var pos = url.lastIndexOf('.');
    return url.slice(pos+1);
}
console.log(getFileFormat(url));//'txt'


toLowerCase()、toUpperCase()和 
toLocaleLowerCase()、 toLocaleUpperCase() 根据时区
将带有分割符的字符串转换为驼峰的形式

var txt = "border-top-left";
var arr = txt.split('-');
for(var i = 1; i < arr.length; i++){
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
}
var result = arr.join('');
console.log(result);//'borderTopLeft"
大小写



匹配
match()
match()方法只接受一个为正则或字符串的参数，并以数组的形式返回匹配的内容

search()这个方法的唯一参数与 match()方法的参数相同  返回返回字符串中第一个匹配项的索引 如果没 有找到匹配项，则返回-1
search()方法接受一个正则或字符串的参数，返回匹配的内容在字符串中首次出现的位置，类似于不能设置起始位置的indexOf，找不到返回-1
search()方法不执行全局匹配，忽略全局标志g，也会忽略RegExp对象的lastIndex属性，总是从字符串的开始位置开始搜索

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

   function getRandom(){
       var arr=[];
       var json=[];

       while(arr.length<100){
           var iNum=Math.round(Math.random()*1000);

           if(!json[iNum]){
               json[iNum]=1;
               arr.push(iNum);
           }

			 }
			 return arr
   }