

//JS中数据类型的判断（ typeof，instanceof，constructor，Object.prototype.toString.call() ）

//typeof 

typeof 2 // number

typeof true // boolean

typeof '12' // string

typeof [] // object object []数组的数据类型在 typeof 中被解释为 object

typeof {} // object 

typeof function(){} // function

typeof null // object null 的数据类型被 typeof 解释为 object

typeof undefined  // undefiend

//空数组 和 null被 typeof 解释为 object 类型，有的人可能会认为 typeof 关键字对数组 和 null 的类型判断是错误的，其实typeof对于数组 和 null 的类型判断是正确的，只不过不够精准而已

// 识别基本类型 (null 除外)
//不能识别具体的对象类型(funciton 除外)

// instanceof关键字 如果左侧的对象是右侧构造函数的实例对象，则表达式返回true；否则返回false
//判断对象是否是某一数据类型（如Array）的实例
//字面量值  2 '2' true 不是实例 
//字面量值
new Number(2) instanceof Number // true
new String('2') instanceof String // true
new Boolean(true) instanceof Boolean // true
//可以识别内置对象类型、自定义类型及其父类型，object类型
//  不能识别 基本类型
//undefined 和 null 报错 不能识别
2 instanceof Number // false 
'2' instanceof String // false
true instanceof Boolean // false

 ([]) instanceof Array //true
 
 ({}) instanceof Object // true

(function(){})  instanceof Function //true

function Person(){}
new Person instanceof Person //true



//constructor2222
// 识别基本类型 Object 自定义类型 内置对象类型
// 不能识别undefiend null

//实例对象的constructor属性指向其构造函数。如果是内置类型，则输出function 数据类型(){[native code]}；如果是自定义类型，则输出function 数据类型(){}

(2).constructor  // function Number(){native code}
(2).constructor == Number // true
('2').constructor == String //true
(true).constructor == Boolean //true
([]).constructor == Array // true
(function(){}).constructor == Function //true
({}).constructor == Object //true
function Person(){}
(new Person).constructor == Person //true

//如果修改了 对象的原型 也不能识别
function Fn(){}
Fn.prototype = new Array();
var f = new Fn()
f.constructor == Fn // false
f.constructor == Array //true


//Object.prototype.toString()方法返回了如下格式的字符串：[object 数据类型]
//识别基本类型 Object  内置对象类型
// 不能识别 自定义类型 
function checkType(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}
 

