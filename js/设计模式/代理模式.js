//代理模式

// 不使用代理的预加载图片函数如下
var myImage = (function(){
  var imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  var img = new Image();
  img.onload = function(){
      imgNode.src = this.src;
  };
  return {
      setSrc: function(src) {
          imgNode.src = "http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif";
          img.src = src;
      }
  }
})();
// 调用方式
myImage.setSrc("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");


var myImage = (function(){
  var imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
      setSrc: function(src) {
          imgNode.src = src;
      }
  }
})();
// 代理模式
var ProxyImage = (function(){
  var img = new Image();
  img.onload = function(){
      myImage.setSrc(this.src);
  };
  return {
      setSrc: function(src) {
                       myImage.setSrc("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
      img.src = src;
      }
  }
})();
// 调用方式
ProxyImage.setSrc("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");

// 第一种方案一般的方法代码的耦合性太高，一个函数内负责做了几件事情，比如创建img元素，和实现给未加载图片完成之前设置loading加载状态等多项事情，未满足面向对象设计原则中单一职责原则；并且当某个时候不需要代理的时候，需要从myImage 函数内把代码删掉，这样代码耦合性太高。
// 第二种方案使用代理模式，其中myImage 函数只负责做一件事，创建img元素加入到页面中，其中的加载loading图片交给代理函数ProxyImage 去做，当图片加载成功后，代理函数ProxyImage 会通知及执行myImage 函数的方法，同时当以后不需要代理对象的话，我们直接可以调用本体对象的方法即可；