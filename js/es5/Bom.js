BOM ： 浏览器对象模型  broswer object model


可视区大小： 浏览器中可以看到网页内容部分的大小。 混杂模式ie 是body

var iWidth = document.documentElement.clientWidth || document.body.clientWidth 
var iHeight = document.documentElement.clientHeight || document.body.clientHeight

被滚动条滚动到浏览器边缘里面的页面高度。 

var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
var scrollleft = document.body.scrollLeft || document.documentElement.scrollLeft;

内容高度 在没有滚动条的情况下，元素内容的总高度
var iWidth = document.documentElement.scrollWidth || document.body.scrollWidth
var iHeight = document.documentElement.scrollHeight || document.body.scrollHeight

文档高度：通过css设置的样式高度 自身高度
offsetWidth
offsetHeight 有boder 加border
offsetTop 设置的top


window.open(
  'http://www.baidu.com/', // 指定要打开的页面地址。
  '', //'fm1', //'_self' // 打开方式 默认是_blank;  支持所有的target方式
  'width=300,height=300,resizable=1',  // 设置窗口特征
  false  //是否替换历史记录。
);	
document.write 窗口写入内容
oBtn.onclick = function(){
	
	var a = window.open(); 	
	
	a.document.write(oTxt.value);
	
};

将 window.opener 属性设置为 null 就是告诉浏览器新创建的标签页不需要与打开它的标签页通信

window.close() 只能关闭 open打开的窗口

系统对话框
alert()、confirm()和 prompt()

window.navigator.userAgent 用户代理信息

window.location.href  整个链接
window.location.search; //获取地址栏中问号到#号之间的所有内容。
window.location.hash; // 获取地址栏中#号后面所有的内容
host   服务器名称和端口号
hostname 服务器名称
protocol 协议
port 端口
pathname 返回URL中的目录和(或)文件名
location.replace 不会留下历史记录