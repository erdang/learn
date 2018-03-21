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

//Object.defineProperties()方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。
//语法: Object.defineProperties(obj, props)

// Object.defineProperty定义一个新属性或修改原有的属性 ie8以上 
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



// 有四个操作会忽略enumerable为false的属性。

// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
//尽量不要用for...in循环，而用Object.keys()代替
// 1）for...in

// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

// （2）Object.keys(obj)

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

// （3）Object.getOwnPropertyNames(obj)

// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

// （4）Object.getOwnPropertySymbols(obj)

// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

// （5）Reflect.ownKeys(obj)

// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

//Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

//ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
//该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }

//Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。
const clone = Object.create(Object.getPrototypeOf(obj),
Object.getOwnPropertyDescriptors(obj));

const ab = Object.create(Object.prototype) //使用指定的原型对象及其属性去创建一个新的对象
console.log(ab)

//__proto__调用的是Object.prototype.__proto__，
Object.setPrototypeOf(object, prototype)//（写操作）、设置一个对象的prototype对象，返回参数对象本身
Object.getPrototypeOf(object)//（读操作）、
Object.create()//（生成操作）代替。

//关键字super，指向当前对象的原型对象。 只有简写的方法识别
const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

//供for...of循环使用。
// Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
//Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
//Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]

//Object.entries方法的另一个用处是，将对象转为真正的Map结构。

const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }

//对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

//完整的拷贝一个对象 包括原型

const clone1 = {
  __proto__:Object.getPrototypeOf(obj),
  ...obj
}

const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
)

const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

//扩展运算符可以用于合并两个对象。 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉
let ab = { ...a, ...b };