//构造器（Constructor）模式

//1 基本构造器
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
// Usage:
// We can create new instances of the car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
// and then open our browser console to view the
// output of the toString() method being called on
// these objects
console.log( civic.toString() );
console.log( mondeo.toString() );

//带原型的构造器
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
// Usage:
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
console.log( civic.toString() );
console.log( mondeo.toString() );



//模块模式

//1 简单 对象字面量 
var myMoudle=(function(){
  var privateVar = 10;
  return {
      getPrivateVar : function(){
           return privateVar;
      }
  }
})();
//2 q全局变量
var myModule = (function ( jQ, _ ) {
  function privateMethod1(){
      jQ(".container").html("test");
  }
  function privateMethod2(){
    console.log( _.min([10, 5, 100, 2, 1000]) );
  }
  return{
      publicMethod: function(){
          privateMethod1();
      }
  };
// Pull in jQuery and Underscore
})( jQuery, _ );

//3揭示（Revealling）模块模式 这种是模块模式的改进版本，它是在模块代码底部，定义所有对外公布的函数（仅是指针）和变量
var myRevealingModule = (function () {
  var privateVar = "Ben Cherry",
      publicVar = "Hey there!";
  function privateFunction() {
      console.log( "Name:" + privateVar );
  }
  function publicSetName( strName ) {
      privateVar = strName;
  }
  function publicGetName() {
      privateFunction();
  }
  // Reveal public pointers to
  // private functions and properties
  return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
  };
　　})();


function CustomType() {
    this.name = "tugenhua";
};
CustomType.prototype.getName = function(){
    return this.name;
}
var application = (function(){
    // 定义私有
    var privateA = "aa";
    // 定义私有函数
    function A(){};

    // 实例化一个对象后，返回该实例，然后为该实例增加一些公有属性和方法
    var object = new CustomType();

    // 添加公有属性
    object.A = "aa";
    // 添加公有方法
    object.B = function(){
        return privateA;
    }
    // 返回该对象
    return object;
})();
