# canvas 基本知识

  ## 什么是canvas

  `canvas`是 HTML5 新定义的标签，通过使用脚本（通常是 JavaScript）绘制图形。
  `canvas`标签只是图形容器，相当于一个画布，canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成，相当于使用画笔在画布上画画
  默认情况下，`<canvas>` 没有边框和内容。默认是一个 300*150 的画布，所以我们创建了 `<canvas>` 之后要对其设置宽高

  **我们可以通过html属性‘width’，‘height’来设置canvas的宽高，不可以通过 css 属性来设置宽高。因为通过 css 属性设置的宽高会使 canvas 内的图像按照 300*150 时的比例放大或缩小**

  ## getContext()

  `context` 是一个封装了很多绘图功能的对象，我们在页面中创建一个 canvas 标签之后，首先要使用 `getContext()` 获取 `canvas` 的上下文环境，目前 `getContext()` 的参数只有 `2d`，暂时还不支持 3d

  `getContext("2d")` 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

  # canvas 绘制元素图像

  canvas 创建图像有2中方式

   ### context.fill()

   `fill()` 方法填充当前的图像（路径），默认颜色是黑色。 在填充前要先使用`fillStyle()`设置填充的颜色或者渐变，如果填充前未关闭路径，
   
那么`fill`方法会在结束点和开始点之间 添加一条直线 来关闭路径，然后填充该路径

  ### context.storke()

  `stroke()`方法实际上会通过`moveTo()`和`lineTo()`方法来绘制路径，默认颜色是黑色，在进行图像绘制前要先设置图像的样式
      
      fillStyle() // 填充的样式
      storkeStyle() // 边框样式
      lineWidth() //边框
  ###绘制矩形

      context.fillRect(x,y,width,height)  //实心矩形
      context.strokeRect(x,y,width,height) // 空心矩形 边框

* x：起始点的X轴坐标
* y ：起始点的 y 坐标
* width ： 矩形的宽
* height ： 矩形的高

      //html代码
      <canvas id="canvas"></canvas>
      //script代码
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      context.fillRect(0, 0, 100, 100);
      context.strokeRect(120, 0, 100, 100);
显示如下：

![dad](https://user-gold-cdn.xitu.io/2017/8/6/cc19c7de755bed782fa8fb4a1d8ee9cb?imageView2/0/w/1280/h/960)

canvas绘制矩形有填充颜色
我们可以看出，在没有设置颜色的情况下，默认是黑色的。
我们还可以通过设置  fillStyle 改变其填充颜色。

	context.fillStyle = 'pink';
	context.strokeStyle = 'darkred';
	context.fillRect(0, 0, 100, 100);
	context.strokeRect(120, 0, 100, 100);

效果如下：

![da](https://user-gold-cdn.xitu.io/2017/8/6/09991b15c63f2a1cc40e914a52a69975?imageView2/0/w/1280/h/960)

### 清除矩形区域

	context.clearRect(x,y,width,height);

* x：起始点的X轴坐标
* y ：起始点的 y 坐标
* width ： 矩形的宽
* height ： 矩形的高

		var canvas = document.getElementById('canvas');
		var context = canvas.getContext("2d");
		context.fillRect(0, 0, 100, 100);
		context.strokeRect(120, 0, 100, 100);
		context.fillStyle = "pink";
		context.strokeStyle = "darkred";
		context.fillRect(0, 120, 100, 100);
		context.strokeRect(120, 120, 100, 100);
		context.clearRect( 50,50,120,120)

效果如下：

![da](https://user-gold-cdn.xitu.io/2017/8/6/524bd9da017d7aa65cb7fdae953b8a6a?imageView2/0/w/1280/h/960)

### 实心圆

		context.arc(x,y,r,startAngle,endAngle,anticlockwise)

* x : 圆心的 x 坐标
* y：圆心的 y 坐标
* r ： 半径
* starAngle ：开始角度
* endAngle：结束角度
* anticlockwise ：是否逆时针（true）为逆时针，(false)为顺时针

		context.beginPath();
		context.arc(300, 350, 100, 0, Math.PI * 2, true);
		//不关闭路径路径会一直保留下去
		context.closePath();
		context.fillStyle='rgba(0,255,0,0.25)';
		context.fill();

效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/227a82ed70cfe4481e64ad07d4665e25?imageView2/0/w/1280/h/960)

 ### 圆弧
如果不填充颜色，实心圆就是圆弧

		context.beginPath();
		context.arc(600, 350, 100, 0, Math.PI , true);
		context.fillStyle= 'pink';
		context.closePath();
		context.stroke();
		
		context.beginPath();
		context.arc(300, 350, 100, 0, Math.PI , true);
		context.strokeStyle = 'red';
		//没有closePath
		context.stroke();

效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/936b7879e568aff20b207623153aff30?imageView2/0/w/1280/h/960)

* 系统默认在绘制第一个路径的开始点为beginPath
* 如果画完前面的路径没有重新指定beginPath，那么画第其他路径的时候会将前面最近指定的beginPath后的全部路径重新绘制
* 每次调用`context.fill()`的时候会自动把当次绘制的路径的开始点和结束点相连，接着填充封闭的部分
所以说，如果第一个圆弧没有 `closePath()` 并且第二个圆弧没有 `beginPath()` 的话就是这样的效果：
效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/3667a44de2002c97e9fcf910de3fe6ab?imageView2/0/w/1280/h/960)

### 绘制线段

moveTo(x,y)：把路径移动到画布中的指定点，不创建线条
lineTo(x,y)：添加一个新点，然后在画布中创建从该点到最后指定点的线条
每次画线都从 moveTo 的点到 lineTo 的点，

		context.strokeStyle = 'pink';
		context.moveTo(0, 0);
		context.lineTo(100, 100);
		context.stroke()

效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/e8d17533485e8dc920fe80380a8c5388?imageView2/0/w/1280/h/960)

**如果没有 moveTo 那么第一次 lineTo 的效果和 moveTo 一样**

		context.strokeStyle = 'pink';
		context.lineTo(100, 100);
		context.lineTo(200, 200);
		context.stroke();*/

效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/834819be3abe77e8a67b3a0243c0c41a?imageView2/0/w/1280/h/960)

**每次lineTo后如果没有moveTo，那么下次lineTo的开始点为前一次lineTo的结束点**

		context.strokeStyle = 'pink';
		context.lineTo(200, 200);
		context.lineTo(200, 100);
		context.lineTo(100,50);
		context.stroke();

效果如下：

![dasd](https://user-gold-cdn.xitu.io/2017/8/6/f8061526ed2494228e3eeeaaffaa46d1?imageView2/0/w/1280/h/960)