//二进制 八进制
//ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
0b111110111 === 503 // true
0o767 === 503 // true
//如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

Number('0b111')  // 7
Number('0o10')  //8

Number.isFinite()//用来检查一个数值是否为有限的（finite），即不是Infinity如果参数类型不是数值，Number.isFinite一律返回false。
Number.isNaN()//用来检查一个值是否为NaN。如果参数类型不是数值，Number.isNaN一律返回false。

//ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.isInteger()//用来判断一个数值是否为整数

Math.trunc//方法用于去除一个数的小数部分，返回整数部分。非数值，Math.trunc内部使用Number方法将其先转为数值,对于空值和无法截取整数的值，返回NaN
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

Math.sign//方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为 0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};