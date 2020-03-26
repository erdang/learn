 //JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点，这种表示法只限于码点在\u0000~\uFFFF之间的字符
//超出这个范围的字符，必须用两个双字节的形式表示。
//ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
//hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'



//ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
//codePointAt方法的参数，是字符在字符串中的位置（从 0 开始）
//codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。
let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
// 你可能注意到了，codePointAt方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。

//判断字符包含了一个还是两个码元，对该字符调用 codePointAt() 方法就是最简单的方法function is32Bit(c) {
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
  }

let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
//ES5 提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）。
//ES6 提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。
//fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

//字符串遍历 for...of
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
//at() 提案
//ES5 对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。

'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
//ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

'\u01D1'.normalize() === '\u004F\u030C'.normalize()


//indexof
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
//这三个方法都支持第二个参数，表示开始搜索的位置。
// repeat方法返回一个新字符串，表示将原字符串重复n次。

// 'x'.repeat(3) // "xxx"
// 'hello'.repeat(2) // "hellohello"
// 'na'.repeat(0) // ""
// 参数如果是小数，会被取整。

// 'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。
//参数是字符串，则会先转换成数字。 参数NaN等同于 0 ,如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。


//padStart()用于头部补全，padEnd()用于尾部补全。
//padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
//如果省略第二个参数，默认使用空格补全长度
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax' 

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

//模板字符串
let html = `
<div>
    <h1>Title</h1>
</div>`.trim();
//此代码从第一行开始创建模板字面量，但在第二行之前并没有包含任何文本。 HTML 标签的 缩进增强了可读性，之后再调用 trim() 方法移除了起始的空行
let name = "Nicholas",
message = `Hello, ${
    `my name is ${ name }`
}.`;
console.log(message);        // "Hello, my name is Nicholas."
//标签化模板 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;//开头结尾的空字符串确保他是开始或结束位置
// 等同于 第一个替换位之前的（如果替换位前边没有就是空字符，后边同理） 第一个替换位之后和第二个替换位之前、。。。
tag(['Hello ', ' world ', ''], 15, 50);
function tag(stringArr, value1, value2){
  // ...
}
//tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分
//tag函数的其他参数，都是模板字符串各个变量被替换后的值



//正则 
//参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝,ES5 不允许此时使用第二个参数添加修饰符，否则会报错
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

new RegExp(/abc/ig, 'i').flags// i覆盖ig

//u 修饰符 “Unicode 模式用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码
function codelength(r){ //返回字符的长度
  let result = r.match(/[\s\S]/gu)
  return result?result.length:0
}
var s = '𠮷𠮷';

s.length // 4
codelength(s) // 2
//exec 和test 正则对象的方法  只有这时lastindex（匹配起始位置） 才起作用
//y修饰符 粘连”（sticky）修饰符。y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义

var r = /hello\d/y;
r.sticky //表示是否设置了y修饰符。
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'

//先行断言
//x(?=y) 要匹配的字符X的右边必须 符合y  
//x(?!y) 要匹配的字符X的右边必须不 符合y

//后行断言 后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。这种“先右后左”的执行顺序

 //(?<=y)x 要匹配的字符X的左边必须 符合y 
 //(?<!y)x 要匹配的字符X的左边必须不 符合y

 //正则表达式里面有三组圆括号。使用exec方法，就可以将这三组匹配结果提取出来。
 
 const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
 
 const matchObj = RE_DATE.exec('1999-12-31');
 const year = matchObj[1]; // 1999
 const month = matchObj[2]; // 12
 const day = matchObj[3]; // 31
//具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名。同时，数字序号（matchObj[1]）依然有效。
 const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
 
 const matchObj = RE_DATE.exec('1999-12-31');
 const year = matchObj.groups.year; // 1999
 const month = matchObj.groups.month; // 12
 const day = matchObj.groups.day; // 31


//  总结
//  完整的 Unicode 支持允许 JS 以合理的方式处理 UTF-16 字符。通过 codePointAt() 与 String.fromCodePoint() 在代码点和字符之间转换的能力，是字符串操作的一大进步。正则 表达式新增的 u 标志使得直接操作代码点而不是 16 位字符变为可能，而 normalize() 方
//  法则允许进行更恰当的字符串比较。
//  ES6 也添加了操作字符串的新方法，允许你更容易识别子字符串，而不用管它在父字符串中 的位置。正则表达式同样引入了许多功能。
//  模板字面量是 ES6 的一项重要补充，允许你创建领域专用语言( DSL )让字符串的创建更容 易。能将变量直接嵌入到模板字面量中，意味着开发者在组合长字符串与变量时，有了一种 比字符串拼接更为安全的工具。
//  内置的多行字符串支持，是普通 JS 字符串绝对无法做到的，这使得模板字面量成为凌驾于前 者之上的有用升级。尽管在模板字面量中允许直接使用换行，你依然可以使用 \n 或其它字 符转义序列。
//  模板标签是创建 DSL 最重要的部分。标签是接收模板字面量片段作为参数的函数，你可以使 用它们来返回合适的字符串。这些数据包括了字面量、等价的原始值以及替换位的值，标签 使用这些信息片段来决定输出。