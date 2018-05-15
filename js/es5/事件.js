事件流描述的是从页面中接收事件的顺序

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


return false 需要取消默认行为和冒泡的同时
•event.preventDefault();
•event.stopPropagation();
•停止回调函数执行并立即返回。