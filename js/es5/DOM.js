
节点 ：  父节点  、 子节点

节点类型 ： 元素节点 、属性节点 、文本节点 、 注释节点 、document节点

类型表示：1 元素节点 2 属性节点 3 文本节点 8 注释节点 9 document节点

查看节点类型： nodeType 属性  
查看节点名称： nodeName 
查看节点的值： nodeValue
常用的是元素节点 和文本节点
元素节点nodeType=1的时候 nodeValue=null

childNodes : 子节点所有的节点都返回   有兼容问题

	在标准和ie9以上 ： 会获取空白文本节点。
	
  在ie6/7/8 ： 不会获取空白文本节点。
解决方法 通过nodeType ==1排除

var getchildren = function(node){
  var  childnodes = node.childNodes;
  var arr=[]
  for(var i=0;i<childlength.length;i++){
    if(childlength[i].nodeType==1){
      arr.push(childlength[i])
    }
  }
  return arr
}

document 对象表示整个html
document.documentElement 获取<html>
document.body; //取得对<body>的引用
//取得完整的 URL
var url = document.URL;
var domain = document.domain; 域名
//取得来源页面的 URL
var referrer = document.referrer;
document.domain 页面中包含来自其他子域的框架或内嵌框架时 设置为相同的值 它们之间就可以通信
var allElements = document.getElementsByTagName("*");文档中的所有元素
tagName 标签名返回的都是大写DIV
var fragment = document.createDocumentFragment(); 文档片段
// var fragment = document.createDocumentFragment();
// var ul = document.getElementById("myList");
// var li = null;
// for (var i=0; i < 3; i++){
//     li = document.createElement("li");
//     li.appendChild(document.createTextNode("Item " + (i+1)));
//     fragment.appendChild(li);
// }
// ul.appendChild(fragment);

  parentNode : 当前节点的上一层节点 （父节点）。
  children 没有兼容性问题 只返回元素节点
  firstElementChild 标准 
  firstChild ie678
  var first = oUl.firstElementChild || oUl.firstChild;
  var last = oUl.lastElementChild || oUl.lastChild;
  
  var prev = last.previousElementSibling || last.previousSibling;
  var next = first.nextElementSibling || first.nextSibling;

offsetParent : 
  
1,上面没有元素有定位属性。

如果元素自身没有定位：

ie6/7 : 与parentNode相同

其它 ： body

如果元素自身有定位：

ie6/7 : html

其它 ： body

2，上面元素有定位属性：上面节点中离当前节点最近的具有定位属性的节点。


offsetLeft : 当前节点的左外边框到 offsetParent 的左内边框之间的距离。

offsetTop : 当前节点的上外边框到 offsetParent 的上内边框之间的距离。

元素的绝对位置

var getleft = function(obj){
  var json={
    ileft:0,
    itop:0
  };
  while (obj){
    json.ileft += obj.offsetLeft;
    json.itop += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return json
}

盒模型 ： width + height + margin + padding + border

	offsetWidth : width + padding + border
	offsetHeight : height + padding + border
	
	clientWidth : width + padding
  clientHeight : height + padding
  
  前两种： [] 和 .
  
  第三种方式 ： 
  
    获取属性：getAttribute()
    
      1, 可以获取行间的自定义属性。
      
      2, 可以获取相对地址。 (兼容ie6/7需要第二个参数：2)
          
    
    设置属性：setAttribute()
    
    删除属性：removeAttribute()


    createElement : 创建一个dom元素
    appendChild ： 往一个节点里追加一个新的子节点。
    insertBefore ： 往节点里的某个指定子节点前面插入一个新的子节点。
    （把谁插入进来，插入到谁的前面）
    removeChild : 把节点里的某个指定子节点删除掉。
    replaceChild ： 把一个节点拿去替换掉另一个节点下面某个子节点。

  IE8以上支持
    querySelector()方法接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹
    配的元素，返回 null
    querySelectorAll()方法接收的参数与 querySelector()方法一样，都是一个 CSS 选择符，但 返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个 NodeList 的实例
    //取得 body 元素
var body = document.querySelector("body");
//取得 ID 为"myDiv"的元素
var myDiv = document.querySelector("#myDiv");
//取得类为"selected"的第一个元素
var selected = document.querySelector(".selected");

HTML5
getElementsByClassName()
classList()
//添加"current"类 
div.classList.add("current");
//删除"disabled"类 
div.classList.remove("disabled");

//切换"user"类 
div.classList.toggle("user");

//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){}
document.readyState
loading，正在加载文档;
complete，已经加载完文档。

iE 为此给 document 添加了一个名为 compatMode 的属性，这个属性就是为了告诉开发人员浏 览器采用了哪种渲染模式。就像下面例子中所展示的那样，在标准模式下，document.compatMode 的 值等于"CSS1Compat"，而在混杂模式下，document.compatMode 的值等于"BackCompat"。
if (document.compatMode == "CSS1Compat"){
  alert("Standards mode");
} else {
  alert("Quirks mode");
}

元素添加非标准的属性，但要添加前缀 data-
可以通过元素的 dataset 属性来访问自定义属性的值div.dataset.appId

获取class

function getByClass(obj,sClass){
  var aElments = (obj||document).body.getElementsByTagName('*')
  var arr=[];
  for(var i=0;i<aElments.length;i++){
    var aIe = aElments[i].className.split(' ');
    for(var j=0;j<aIe.length;i++){
      if(aIe[j] == sClass){
        arr.push(aIe[j]);
        return
      }
    }
  }
  return arr;

}

function addClass(obj,sClass){
  if(!obj.className){
    obj.className = sClass;
  }
  var aclass = obj.className.split(' ');
  for(var i=0;i<aclass.length;i++){
    if(aclass[i] == sClass){
      return
    }
  }
  obj.className += ' '+sClass;
}

function removeClass(obj,sClass){
  if(!obj.className)return;
  var aIe = obj.className.split(' ');
  for(var i=0;i<aIe.legth;i++){
    if(aIe[i] == sClass){
      aIe[i].splice(i,1);
      obj.className = aIe[i].join(' ');
      return;
    }
  }
}


function getStyle(obj,attr){
	
	if(obj.currentStyle){
		return obj.currentStyle[attr]; 
	}
		
	return getComputedStyle(obj)[attr];		
	
}
1，只能获取非复合样式。

2，获取到的是计算后的样式。

3，所要获取的样式必须是手动设置过样式的，不能是浏览器默认的样式。


要强制浏览器以某种模式渲染页面，可以使用 HTTP 头部信息 X-UA-Compatible，或通过等价的 <meta>标签来设置:
<meta http-equiv="X-UA-Compatible" content="IE=IEVersion">
