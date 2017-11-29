//单体模式
//单例模式它限制了类的实例化次数只能一次。在实例不存在的情况下，可以通过一个方法创建一个类来实现创建类的新实例；如果实例已经存在，它会简单返回该对象的引用。
// 单体模式
var Singleton = function(name){
  this.name = name;
  
};
Singleton.prototype.getName = function(){
  return this.name;
}
// 获取实例对象
function getInstance(name) {
  var instance;
  if(!instance) {
      instance = new Singleton(name);
  }
  return instance;
}
// 测试单体模式的实例
var a = getInstance("aa");
var b = getInstance("bb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的

console.log(a === b); // true
//由于单体模式只实例化一次，因此第一次调用，返回的是a实例对象，当我们继续调用的时候，b的实例就是a的实例，因此下面都是打印的是aa；

console.log(a.getName());// aa

console.log(b.getName());// aa

//工厂模式  面向对象
// 定义自行车的构造函数
var BicycleShop = function(){};
BicycleShop.prototype = {
    constructor: BicycleShop,
    /*
    * 买自行车这个方法
    * @param {model} 自行车型号
    */
    sellBicycle: function(model){
        var bicycle = this.createBicycle(mode);
        // 执行A业务逻辑
        bicycle.A();

        // 执行B业务逻辑
        bicycle.B();

        return bicycle;
    },
    createBicycle: function(model){
        throw new Error("父类是抽象类不能直接调用，需要子类重写该方法");
    }
};