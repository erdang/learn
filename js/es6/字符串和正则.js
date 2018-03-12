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