事件流描述的是从页面中接收事件的顺序
IE 的事件流叫做事件冒泡
所有现代浏览器都支持事件冒泡

DOM2.0 模型将事件处理流程分为三个阶段，即事件捕获阶段、事件处理阶段（冒泡阶段的一部分）、事件冒泡阶段

事件捕获：当用户触发点击事件后，顶层对象document 就会发出一个事件流，从最外层的DOM节点向目标元素节点传递，最终到达目标元素。

事件处理：当到达目标元素之后，执行目标元素绑定的处理函数。如果没有绑定监听函数，则不做任何处理。

事件冒泡：事件流从目标元素开始，向最外层DOM节点传递，途中如果有节点绑定了事件处理函数，这些函数就会被执行。


DOM0 级事件处理程序

var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("Clicked");
};

取消 btn.onclick = null

DOM2 级事件处理程序  为一个元素添加多个事件处理程 序

3个参数要处 理的事件名、作为事件处理程序的函数和一个布尔值  是否捕获true捕获   false冒泡
大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览 器
var btn = document.getElementById("myBtn");
var handler = function(){
    alert(this.id);
};
btn.addEventListener("click", handler, false);
//取消 这种才有效  匿名函数取消无效
btn.removeEventListener("click", handler, false); //有效!
btn.removeEventListener("click", function(){}, false); //无效!匿名函数取消无效

IE事件处理程序
attachEvent()和 detachEvent()
事件处理程序名称与事件处理程序函数
在使用 attachEvent()方 法的情况下，事件处理程序会在全局作用域中运行，因此 this 等于 window


function bind(obj,evName,fn){
  if(obj.addEventListener){
    obj.addEventListener(evName,fn,false)
  }else if(obj.attachEvent){
    obj.attachEvent('on'+evName,function(){
      fn.call(obj)
    })
  }else{
    obj['on'+evName] = fn
  }
}

function removeBind(obj,evName,fn){
  if(obj.addEventListener){
    obj.removeEventListener(evName,fn,false)
  }else if(obj.detachEvent){
    obj.detachEvent('on'+evName,fn)
  }else{
    obj['on'+evName] = null
  }
}

dom 事件对象
event
target 事件目标
event.preventDefault() 取消默认行为
event.stopPropagation() 同时取消 事件捕获和冒泡

ie 事件对象
window.event
srcElement 事件目标
window.event.cancelBubble = true 取消冒泡  ie只支持冒泡
window.event.returnValue = false; 取消默认行为


return false 需要取消默认行为和冒泡的同时   不要用return false;来阻止event的默认行为
•event.preventDefault();
•event.stopPropagation();
•停止回调函数执行并立即返回。

clientX 可视区
pageX  页面

在页面没有滚动的情况下，pageX 和 pageY 的值与 clientX 和 clientY 的值相等

DOMContentLoaded load之前触发 dom树形成

鼠标滚轮事件

ie/chorme  onmousewheel
event.wheelDelta
  上:120
  下:-120

  ff DOMMouseScroll  addEventListener
  event.detail
  上:-3
  下:3
  var iBtn = true;
  if (ev.wheelDelta) {
    iBtn = ev.wheelDelta > 0 ? true : false;
  } else {
    iBtn = ev.detail < 0 ? true : false;
  }





事件委托
oUl.onclick = function(ev){
  　　　　var ev = ev || window.event;
  　　　　var target = ev.target || ev.srcElement;
  　　　　if(target.nodeName.toLowerCase() == 'li'){
  　 　　　　　　 alert(123);
  　　　　　　　  alert(target.innerHTML);
  　　　　}
  　　}


  拖拽
  1.如果拖拽太快鼠标就会脱离拖拽目标
	利用div事件冒泡,把move事件和up加在document上
2.选中文字拖拽,会有问题,(所有浏览器都有)
	原因:我们的拖拽大代码和浏览器默认的行为发生了冲突，从而影响到了我们的拖拽效果
	标准下:阻止默认行为
	非标准IE:利用全局捕获的特性
3.当我们拖拽的是图片的时候也会有问题
	原因和解决办法同上(第2点)
  function drag(obj){
    obj.onmousedown=function(ev){
      var ev = ev || event
      var disX = ev.clientX - this.offsetLeft;
      var dixY = ev.clientY - this.offsetTop;

      if(obj.setCapture){
        obj.setCapture()
      }
      document.onmousemove = function(ev){
        var ev = ev || event;
        obj.style.left = ev.clientX - disX + 'px';
        obj.style.top = ev.clientY - disY + 'px';

      }
      document.onmouseup = function(){

        document.onmousemove = null;
        if (obj.releaseCapture) {
					obj.releaseCapture();
				}
      }
      ev.preventDefault();
      ev.returnValue = false;
    }
  }


  mouseover,mouseout是指鼠标指针在穿过/离开被选元素或其子元素时触发。

mouseenter，mouseleave是指鼠标指针在穿过/离开被选元素时触发。
而hover的效果等同于mouseenter，mouseleave。
“_”是IE6专有的hack

“+”是IE7的
* 6 7
“\9” IE6/IE7/IE8/IE9/IE10都生效

“\0” IE8/IE9/IE10都生效，是IE8/9/10的hack

“\9\0” 只对IE9/IE10生效，是IE9/10的hack