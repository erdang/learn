时间版运动 与 速度版区别
一个以时间 一个以速度为基准

速度版的 会抖 速度一样（同一套速度公式） 路程不一样（比如宽从100到200 运动了100  left 从200到150 运动了50） 路程短的会先到 此时路程短的会继续运动

定时器 当切换窗口后  定时器会变缓慢（浏览器特性） 导致看起来像是运动暂停   

时间版的 比如运动到鼠标移入移出 停止运动  剩下的距离也是总时间 速度会变化

速度版
function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iSpeed = 0;
	var iCur = 0;
	
	obj.iTimer = setInterval(function() {
		
		var iBtn = true; //运动是否完成
		
		for (var attr in json) {
			
			if (attr == 'opacity') {
				iCur = Math.round(css(obj, attr) * 100);
			} else {
				iCur = parseInt(css(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 8;
			
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if (iCur != json[attr]) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')'
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			
		}
		
		if (iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
		
	}, 30);
}

function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}
时间版 abd
