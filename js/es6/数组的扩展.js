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

//Array.of方法用于将一组值，转换为数组。 只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
Array.of(3, 11, 8) // [3,11,8]