柯理化
是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
柯里化有3个常见作用：1. 参数复用；2. 提前返回；3. 延迟计算/运行。
通用函数 复用第一个参数 返回新函数 收集剩余参数 返回结果
function curry(fn){
  //复用第一个参数
  var args = Array.prototype.slice.call(arguments, 1);
  //返回新函数
  return function(){
    //收集剩余参数
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      //返回结果
      return fn.apply(null, finalArgs);
}; }
function add(num1, num2){
  return num1 + num2;
}
var curriedAdd = curry(add,1);
console.log(curriedAdd(3));   

//  add(2)(3)(4)
//  function add(x){
//   return function(y){
//     return function(z){
//       return x+y+z
//     }
//   }
//  }
 
 function add () {
  var args = Array.prototype.slice.call(arguments);

  var fn = function () {
      var arg_fn = Array.prototype.slice.call(arguments);
      return add.apply(null, args.concat(arg_fn));
  }

  fn.toString = function() {
      return args.reduce(function(a, b) {
          return a + b;
      })
  }

  return fn;
}


提前返回
var bind = function(){
  if(window.addEventlister){
    return function(obj,fntype,fn){
      obj.addEventlister(fntype,fn,false)
    }
    
  }else{
    return function(obj,fntype,fn){
      obj.attachEvent('on'+fntype,function(){
        fn.call(obj)
      })
    }
    
  }
}()

