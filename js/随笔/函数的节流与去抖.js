// 函数的节流  
// 比如一个点击事件  不论点击多少次  在一定的时间内 只执行一次
//频繁触发的事件
1. 频繁的mousemove/keydown，比如高频的鼠标移动，游戏射击类的

2. 搜索联想（keyup）

3. 进度条（我们可能不需要高频的更新进度）

4. 拖拽的dragover等

5.  高频的点击，抽奖等（哈哈，邪恶）
//简单实现

var throltte=(time,callback)=>{
  var last=0;
  return function(){
    var nowtime=+new Date();
    if(nowtime-last>time){
      callback.apply(this,arguments);
      last=nowtime;
    }
  }
}

div.addEventListener('touchend', throttle(1000,function(){
	console.log(11111);
}));

//函数的去抖
// 比如一个点击事件  在一定的时间后才去执行 
//用户不断更改 提交表单
1. scroll/resize事件

 2. 文本连续输入，ajax验证/关键字搜索

var debounce=(time,callback)=>{
  var last=null;
  return function(){
    var arg=arguments;
    clearTimeout(last);
    last=setTimeout(()=>{
      callback.apply(this,arg);
    },time)
  }
}

div.addEventListener('touchend', debounce(1000,function(){
	console.log(11111);
}));



 
//解决requestAnimationFrame兼容问题
var raFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 60);
};

//柯里化封装
var rafThrottle = function(fn) {
  var isLocked;
  return function() {
    var context = this,
    _args = arguments;

    if(isLocked) return 

    isLocked = true;
    raFrame(function() {
    isLocked = false;
    fn.apply(context, _args)
    })
  }
}