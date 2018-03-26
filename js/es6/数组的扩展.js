//扩展运算符... 好比reset参数的逆运算 将数组转为用逗号分隔的参数序列

function push(array,...items){
  array.push(...items) //数组转为逗号分隔参数
}
const num = [23,45]
add(...num)

//替代apply
Math.max.apply(null,[34,56,78])
Math.max(...[34,56,78])

//复制数组
es5 
var arr1=[2,3,4]
var arr3 = arr1.concat()
es6
let arr1 = [3,4,5]
let arr2 = [...arr1]

//合并数组
es5
var arr1 = [2,3,4,5,6]
var arr2 = [4,5,6,7,8]
var arr3 = arr1.concat(arr2)
es6
let arr1 = [3,4,5,6]
let arr2 = [3,4,5,5]
let arr3 = [...arr1,...arr2]

let [first,...arr1] = [1,2,3,4,5]
// first = 1 
// arr1 2,3,4,5

let map = new Map([
  [1,'one'],
  [2,'two']
])
let arr = map(...map.keys())


//Array.form 将类数组的对象 和可遍历的对象 转为数组 map set
let ps = document.querySelectorAll('div')
Array.from(ps).filter((p)=>{
  return p.textContent.length>100
})
//还可以接受第二个参数 类似map 返回处理后的数组
Array.from(ps,(x)=>{x+2})
Array.from(ps).map((x)=>{x+2})

//如果在对象上工作 还可以传入第三个参数  指定this
let helper = {
  diff: 1,
  add(value) {
      return value + this.diff;
} };
function translate() {
  return Array.from(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers);               // 2,3,4




//Array.of方法用于将一组值，转换为数组。 
//Array只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
Array.of(3, 11, 8) // [3,11,8]

//数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
[1, 4, -5, 10].find((n) => n < 0)
// -5
//数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

//fill方法使用给定值，填充一个数组,数组中已有的元素，会被全部抹去。。还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

//Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。