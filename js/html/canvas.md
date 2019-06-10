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
		context.fillStyle = 'darkred';
		context.fillRect(0, 0, 100, 100);
		context.strokeRect(120, 0, 100, 100);