//正则表达式
//创建正则的两种方法
//

var rex =new RegExp(p1,p2);
//正则对象 方法
// 该方式 有2个参数 p1 必需  匹配的模式   p2 可选  要检索的字符串  参数都是以双引号包裹的字符串，无需正斜杠包裹
var rex1 = new RegExp('\\d+[a-z]')
var rex2 = new RegExp('\\d+[a-z]','gim')
//如果采用正则对象方式，RegExg接收的是字符串，\反斜杠是转义字符，\d会变成d，此时需要使用两个反斜杠，即\\d来达到\d效果；但是在字面量方式中，不是字符串，所以使用一个反斜杠即可。 

var rey = /p1/p2
//字面量方法
//参数p1被两个正斜杠包裹，必选；参数p2位于第二个正斜杠后面； 
//注意：两个参数p1和p2都无需用双引号包裹。
var rey1 = /^d+[0-9]*$/gi

//第二个参数 有3种标志
//  /g 表示全局模式，应用于所有字符创，并非匹配到一个就停止
//  /i 表示忽略大小写
//  /m 表示多行模式  表示 达到一行的末尾 还会继续下一行

//模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：( [ { \ ^ $ | ) ? * + .] }
var exp = /\.doc/gi   //转义.
var exp1 = new RegExp("\\.doc","gi") //字符创 双反斜杠转义

//2、()  []  {} 的区别
// () 的作用是提取匹配的字符串。表达式中有几个()就会得到几个相应的匹配字符串。比如 (\s+) 表示连续空格的字符串。
//()的提高优先级功能:凡是有|出现的时候，我们一定要注意是否有必要加上()来提高优先级；

// 分组的引用(重复子项) :
// 只要在正则中出现了括号就会形成一个分组，我们可以通过\n (n是数字代表的是第几个分组)来引用这个分组，第一个小分组我们可以用\1来表示
//例如：求出这个字符串'abAAbcBCCccdaACBDDabcccddddaab'中出现最多的字母,并求出出现多少次(忽略大小写)。
var str = 'abbbbAAbcBCCccdaACBDDabcccddddaab';
    str = str.toLowerCase().split('').sort(function(a,b){return a.localeCompare(b)}).join('');

    var reg = /(\w)\1+/ig;  //\1 表示重复 bbbb aaa
    var maxStr = '';
    var maxLen = 0;
    str.replace(reg,function($0,$1){
        var regLen = $0.length;
        if(regLen>maxLen){
            maxLen = regLen;
            maxStr = $1;
        }else if(maxLen == regLen){
            maxStr += $1;
        }
    })
    console.log(`出现最多的字母是${maxStr},共出现了${maxLen}次`)

    //当我们加()只是为了提高优先级而不想捕获小分组时，可以在()中加?:来取消分组的捕获
    var str = 'aaabbb';
    var reg = /(a+)(?:b+)/;
    var res =reg.exec(str);
    console.log(res)
    //["aaabbb", "aaa", index: 0, input: "aaabbb"]
    //只捕获第一个小分组的内容  bbb 没匹配




// [] 是定义匹配的字符范围。比如 [a-zA-Z0-9] 表示字符文本要匹配英文字符和数字。
//一般[]中的字符没有特殊含义 如+就表示+   但是像\w这样的还是有特殊含义的
var str1 = 'abc';
var str2 = 'dbc';
var str3 = '.bc';
var reg = /[ab.]bc/; //此时的.就表示.
reg.test(str1)  //true
reg.test(str2)  //false
reg.test(str3)  //true

//[]中，不会出现两位数
// [12]表示1或者2 不过[0-9]这样的表示0到9 [a-z]表示a到z
// 例如:匹配从18到65年龄段所有的人
// var reg = /[18-65]/; // 这样写对么
// reg.test('50')
//  //Uncaught SyntaxError: Invalid regular expression: /[18-65]/: Range out of order in character class
// //聪明的你想可能是8-6这里不对，于是改成[16-85]似乎可以匹配16到85的年龄段的，但实际上发现这也是不靠谱的

// 实际上我们匹配这个18-65年龄段的正则我们要拆开来匹配
// 我们拆成3部分来匹配 18-19  20-59 60-65 
// reg = /(18|19)|([2-5]\d)|(6[0-5])/;

// {} 一般用来表示匹配的长度，比如 \d{3} 表示匹配三个数字，\d{1,3} 表示匹配1~3个数字，\d{3,} 表示匹配3个以上数字。

// 3、^ 与 $
// ^ 匹配一个字符串的开头，比如 (^a) 就是匹配以字母a开头的字符串

// $ 匹配一个字符串的结尾,比如 (b$) 就是匹配以字母b结尾的字符串

// ^ 还有另个一个作用就是取反，比如[^xyz] 表示匹配的字符串不包含xyz
// 注意问题：

// 如果 ^ 出现在[ ] 中一般表示取反，而出现在其他地方则是匹配字符串的开头。
// ^ 和 $ 配合可以有效匹配完整字符串: /d+/.test('4xpt') -> true，而 /^\d+$/.test('4xpt')->false
// 4、\d  \s  \w  .
// \d 匹配一个非负整数， 等价于 [0-9]

// \s 匹配一个空白字符

// \w 匹配一个英文字母或数字下划线，等价于[0-9a-zA-Z_]

// .   匹配除换行符以外的任意字符，等价于[^\n]

// 5、* + ?
// * 表示匹配前面元素0次或多次，比如 (\s*) 就是匹配0个或多个空格

// + 表示匹配前面元素1次或多次，比如 (\d+) 就是匹配由至少1个整数组成的字符串

// ? 表示匹配前面元素0次或1次，相当于{0,1} ，比如(\w?) 就是匹配最多由1个字母或数字组成的字符串 


// 贪婪性

// 所谓的贪婪性就是正则在捕获时，每一次会尽可能多的去捕获符合条件的内容。
// 如果我们想尽可能的少的去捕获符合条件的字符串的话，可以在量词元字符后加?

// 懒惰性

// 懒惰性则是正则在成功捕获一次后不管后边的字符串有没有符合条件的都不再捕获。
// 如果想捕获目标中所有符合条件的字符串的话，我们可以用标识符g来标明是全局捕获
//非贪婪模式  /a+?b/ 加?   aaab 为了匹配到后面的b 不得不匹配aaa       /a+?/ a

// 正则运算符的优先级
// 正则表达式从左到右进行计算，并遵循优先级顺序，这与算术表达式非常类似。
// 相同优先级的会从左到右进行运算，不同优先级的运算先高后低。
// 下面是常见的运算符的优先级排列
// 依次从最高到最低说明各种正则表达式运算符的优先级顺序：


var str = '123aaa456';
var reg = /\d+/;  //只捕获一次,一次尽可能多的捕获
var res = str.match(reg)
console.log(res)
// ["123", index: 0, input: "123aaa456"]
reg = /\d+?/g; //解决贪婪性、懒惰性
res = str.match(reg)
console.log(res)
// ["1", "2", "3", "4", "5", "6"]



// \ : 转义符
// (), (?:), (?=), []  => 圆括号和方括号
// *, +, ?, {n}, {n,}, {n,m}   => 量词限定符
// ^, $, \任何元字符、任何字符 
// |       => 替换，"或"操作

// 字符具有高于替换运算符的优先级，一般用 | 的时候，为了提高 | 的优先级，我们常用()来提高优先级
// 如： 匹配 food或者foot的时候 reg = /foo(t|d)/ 这样来匹配

//$0,$1,$2 表示第几个括号匹配的结果
(function(pro){
  function queryString(){
      var obj = {},
          reg = /([^?&#+]+)=([^?&#+]+)/g;
      this.replace(reg,function($0,$1,$2){
          obj[$1] = $2;
      })
      return obj;
  }
  pro.queryString = queryString;
}(String.prototype));

// 例如 url为 https://www.baidu.com?a=1&b=2
// window.location.href.queryString();
// {a:1,b:2}

//零宽断言 在使用正则表达式时，捕获的内容前后必须是特定的内容，而我们又不想捕获这些特定内容的时候，零宽断言就可以派上用场了。

//x(?=exp) 这个简单理解就是说字符出现的位置的右边必须匹配到exp这个表达式
//x(?!exp) 这个就是说字符出现的位置的右边不能是exp这个表达式。
//(?<=exp)x 这个就是说字符出现的位置的前边是exp这个表达式。
//(?<!exp)x这个就是说字符出现的位置的前边不能是exp这个表达式。
var str = "i'm singing and dancing";
var reg = /\b(\w+(?=ing\b))/g
var res = str.match(reg);
console.log(res)
// ["sing", "danc"]

// ?=不同的人叫法不一样，你称之为预查，我更倾向于叫零宽断言，也就是说?=只是匹配一个位置，并不匹配具体的字符，所以是零宽，也就是宽度是0。
// 所以(?=[a-zA-Z]+)匹配一个位置，这个位置后面紧跟至少一个字母，注意此时位置并没有后移;
// (?=[0-9]+)也是匹配一个位置，这个位置后面后面紧跟至少一个数字；
// 因为(?=[a-zA-Z]+)和(?=[0-9]+)都只匹配位置，而不匹配具体的字符，这两个又直接写在了一起，也就是说(?=[a-zA-Z]+)(?=[0-9]+)意味着这个位置后面紧跟至少一个字母，同时紧跟至少一个数字，也就是说这个位置后面的字符既是字母又是数字，显然这样的位置不存在。
//(?=[a-zA-Z]+)(?=[0-9]+)[a-zA-Z0-9]{3,10}
// Update:
// 你试试这个/^(?=[a-zA-Z]*[0-9])(?=[0-9]*[a-zA-Z])[a-zA-Z0-9]{3,10}$/。


// 注意一点，这里说到的是位置，不是字符。
// var str = 'abc';
// var reg = /a(?=b)c/;
// console.log(res.test(str));  // false

// // 这个看起来似乎是正确的，实际上结果是false
// reg中a(?=b)匹配字符串'abc' 字符串a的右边是b这个匹配没问题,接下来reg中a(?=b)后边的c匹配字符串时是从字符串'abc'中a的后边b的前边的这个位置开始匹配的，
// 这个相当于/ac/匹配'abc',显然结果是false了
var str = '￥998$888';
var reg = /(?<=\$)\d+/;
console.log(reg.exec(str)) //888



var rgx = /\d{4}(\-|\/|.)\d{1,2}(\-|\/|.)\d{1,2}/

 var re=/\d{4}(\-)\d{1,2}(\-)\d{1,2}/
 re.test("2016-98-98")
//13812345678 
 var re = /^1(\d+){2}(\d+){8}$/
 // 前后空格
 var space = /(^\s+) | (\s+)$/g
 //手机号码
 var iphone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])(\d+){8}$/

 //邮箱
 var email = /^/

 var sts = '<div id="">dasdas</div><p>dwqdqwd</p>'
 var rg = /(?<=\>).[^\<\>]+(?=\<\/)/
 


var ds = '$10000000';
var rss= /(\d)(?=(\d{3})+$)/g
ds.replace(rss,"$1,") //$10,000,000

'123456789'.replace(/\B(?=(\d{3})+$)/g,',')


// 完成一个函数isUSDFormat 返回true/false 来判断一个字符串是否符合美元格式:
// 1.以$开头
// 2 如果是小数，保留两位小数;如果不是小数则不显示小数部分
// 3.整数部分从小数点上一位开始每隔三位用，分割开来
// 4.如果整数部分从数字0 开始，则只会显示一位0
// 例如:
// isUSDFormat('$1')//= > true
// isUSDFormat('$1.8')//=> false
// isUSDFormat('$108,009.08')//=> true
// isUSDFormat('$8,888.88)//=> false
// isUSDFormat('$0.0')//=> true
// isUSDFormat('$11,23,345.33')//=> false
// isUSDFormat('$1,123,345.33')//=> true
var r = /^\$(0|[1-9]\d{0,2})(\,\d{3})*(\.[0-9]{2})?$/

//[\s\S] 包含了 换行符   .不包括