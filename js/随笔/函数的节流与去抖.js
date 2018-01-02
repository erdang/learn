// 函数的节流  
// 比如一个点击事件  不论点击多少次  在一定的时间内 只执行一次
//频繁触发的事件

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



