
//如何浅拷贝和深拷贝一个数组？
// Array.prototype.concat(target)：concat() 是数组的一个内置方法，用户合并两个或者多个数组。这个方法不会改变现有数组，而是返回一个新数组。const b = [].concat(a)
// Array.prototype.slice(start, end)：slice() 也是数组的一个内置方法，该方法会返回一个新的对象。slice() 不会改变原数组。const b = a.slice()
// 展开运算符：[...arr]

////我们复制引用基础数据类型，都是拷贝对应的值


let number1 = 1;
let number2 = number1;

console.log(number1, number2); // 1 2

number2 = 3;

console.log(number1, number2); // 1 3

// 复制基本数据类型，并进行修改，是不会改变原本的值（number1）

//我们复制引用复杂数据类型，都是拷贝对应的址

let obj1 = {
  name: 'jsliang',
};

let obj2 = obj1;

console.log(obj1); // { name: 'jsliang' }
console.log(obj2); // { name: 'jsliang' }

obj2.name = 'zhazhaliang';

console.log(obj1); // { name: 'zhazhaliang' }
console.log(obj2); // { name: 'zhazhaliang' }

// 复制引用数据类型，并进行修改，会改变原本的值（obj1）

// 日常的拷贝数组或者对象，是复制了它们的地址
// 如果你想修改的时候不污染原内容，就需要进行深拷贝。

// 如何实现浅拷贝，一般会答 3 种情况：

// 手写浅拷贝
// 使用 Object.assign
// 使用数组 API，如 concat 或者 slice 以及拓展运算符

// 手写浅拷贝


const shalowcopy = function(target){
  const result = [];

  for(let i in target){

    if(target.hasOwnProperty(i)){
      result[i] = target[i]
    }
    
  }
  return result
}

// for...in：遍历 Object 对象 arr1，将可枚举值列举出来。
// hasOwnProperty()：检查该枚举值是否属于该对象 arr1，如果是继承过来的就去掉，如果是自身的则进行拷贝。
//当然，这个只能拷贝数组，那么拷贝对象呢？

const checkType = function(target){
  return Object.prototype.toString.call(target).sclice(8,-1)
}

const shalowcopy = function(target){
  let result = '';
  if(checkType(target) === 'Object'){
    result = {};
  }
  if(checkType(target) === 'Arrery'){

  }
  for(let i in target){

    if(target.hasOwnProperty(i)){
      result[i] = target[i]
    }
    
  }
  return result
}

//Object.assign(obj1,obj2) 用于拷贝对象  属于浅拷贝

const obj2 = Object.assign({}, obj1);


//深拷贝
// 手写深拷贝
// 借助 JSON.parse(JSON.stringify())
// 借助第三方库 Lodash、jQuery 等

const checkType = function(target){
  return Object.prototype.toString.call(target).sclice(8,-1)
}
const deepClone = function(target){
  let result, targetType = checkedType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }

  for(let i in target){
    if(target.hasOwnProperty(i)){
      if(checkedType(target[i]) === 'Object' || checkedType(target[i]) === 'Array'){
        result[i] = deepClone(target[i]);
      }else{
        result[i] = target[i];
      }
    }
    
  }

  return result;
}

//循环引用 
//JSON 也 无法深拷贝循环引用
var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
}
a.circleRef = a;
//无法完成
var b = deepClone(a);

//解决办法  循环检测  暴力破解

// 解决方案很简单，其实就是循环检测，我们设置一个数组或者哈希表存储已拷贝过的对象，
// 当检测到当前对象已存在于哈希表中时，取出该值并返回即可

// 哈希表
const deepClone = function(target, hash = new WeakMap()){
  if(hash.has(target)){ // 存在就返回
    return hash.get(target)
  }
  let result, targetType = checkedType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }
  hash.set(target,result) // 设置哈希表

  for(let i in target){
    if(target.hasOwnProperty(i)){
      if(checkedType(target[i]) === 'Object' || checkedType(target[i]) === 'Array'){
        result[i] = deepClone(target[i]);
      }else{
        result[i] = target[i];
      }
    }
    
  }

  return result;
}

//数组形式
// 新增方法，用于查找
function find(arr, item) {
  for(var i = 0; i < arr.length; i++) {
      if (arr[i].source === item) {
          return arr[i];
      }
  }
  return null;
}
const deepClone = function(target,uniqueList=[]){
  
  let result, targetType = checkedType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }
   //存在 返回
    let arr = find(uniqueList,target);
    if(arr){
      return arr.result
    }
    arr.push({
      target:target,
      result:result
    })
   // 不存在 保存
  
  for(let i in target){
    if(target.hasOwnProperty(i)){
      if(checkedType(target[i]) === 'Object' || checkedType(target[i]) === 'Array'){
        result[i] = deepClone(target[i]);
      }else{
        result[i] = target[i];
      }
    }
    
  }

  return result;
}

//引用丢失
var obj1 = {};
var obj2 = {a: obj1, b: obj1};

obj2.a === obj2.b; 
// true

var obj3 = cloneDeep(obj2);
obj3.a === obj3.b;
//obj2，obj2 的键值 a 和 b 同时引用了同一个对象 obj1，
// 使用 cloneDeep 进行深拷贝后就丢失了引用关系变成了两个不同的对象
// 上边已解决 只要存储已拷贝过的对象就可以


//破解递归爆栈
//使用循环 或者消除尾递归

var a = {
  a1: 1,
  a2: {
      b1: 1,
      b2: {
          c1: 1
      }
  }
}
//用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

const deepClone = function(target,uniqueList=[]){
 
  let result, targetType = checkedType(target);
  if (targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }

  //栈
  let looplist = [
    {
      parent:result,
      key:undefined,
      data:target
    }
  ]

   //存在 返回
    let arr = find(uniqueList,target);
    if(arr){
      return arr.result
    }
    arr.push({
      target:target,
      result:result
    })
   // 不存在 保存
  
  while(looplist.length){
    const node = looplist.pop();
    const parent =  node.parent;
    const key =  node.key;
    const data =  node.data;

    let res = parent;
    if (typeof key !== 'undefined') {
        res = parent[key] = {};
    }
    for(let k in data) {
      if (data.hasOwnProperty(k)) {
          if (typeof data[k] === 'object') {
              // 下一次循环
              loopList.push({
                  parent: res,
                  key: k,
                  data: data[k],
              });
          } else {
              res[k] = data[k];
          }
      }
  }
  }

  return result;
}



  Object.defineProperty(obj,'a',{
    get:function(){
      
    },
    set:function(){

    }

  })