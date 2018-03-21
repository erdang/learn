// 对象属性的简洁语法

const foo = {foo} 
const foo = {foo:foo}

// 方法也可以简写
const o = {
  last : function(){}
  //last(){} last是字符串，所以不会因为它属于关键字，而导致语法解析报错。
}

//属性名表达式 属性名表达式与简洁表示法，不能同时使用，会报错

let ab = 'dadasd'
const abc = {
  'das':'aaaa',
  [ab] :'bbbbb',
  ['a'+'b'] : 2131,//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内
  ['a'+'b'](){ //表达式还可以用于定义方法名。    
    return 'abc'
  }
}

//对象方法也是函数，因此也有name属性
//如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
//有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous


//相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0
//比较两个值是否严格相等
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});

// Object.defineProperty定义新属性或修改原有的属性 ie8以上
// obj：必需。目标对象 
// prop：必需。需定义或修改的属性的名字
// descriptor：必需。目标属性所拥有的特性
// value: 设置属性的值
// writable: 值是否可以重写。true | false
// enumerable: 目标属性是否可以被枚举。true | false
// configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false
//当使用了getter或setter方法，不允许使用writable和value这两个属性
object.defineProperty(obj,prop,{
  configurable:true | false,
  enumerable:true | false,
  value:任意类型的值,
  writable:true | false,
  get:function (){
    //当获取值的时候触发的函数
    return initValue;    
  },
  set:function (value){
      //当设置值的时候触发的函数,设置的新值通过参数value拿到
      initValue = value;
  }
});

//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
//Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
//只有一个参数，Object.assign会直接返回该参数
Object.assign(target, source1, source2);

const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
//如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
//由于undefined和null无法转成对象，所以如果它们作为首参数，就会报错。
//如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错
//Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
//属性名为 Symbol 值的属性，也会被Object.assign拷贝

//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2

//对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }

//为对象添加属性
class po{
  constructor(x,y){
    Object.assign(this,{x,y})
  }
}
//为对象添加方法
Object.assign(po.prototype,{
  fuck(){

  }
})

//克隆对象
function clone(x){
  return Object.assign({},x)
}
//采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

//合并多个对象
const merge = (...sources) => Object.assign({}, ...sources);

//为属性指定默认值 最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}