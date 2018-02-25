window.onload = function () {
	var
		oSmallBox  = $('small-box'),
		oMiddleBox = $('middle-box'),
		oBigBox	   = $('big-box'),
		oZoomArea  = $('zoom-area'),
		aSmallImg  = byTagName(oSmallBox, 'img'),
		oBigImg    = $('big-img'),
		oMiddleImg = $('middle-img'),
		oPos	   = position(oMiddleBox);

	// 添加选项卡效果
	for(var i =0; i < aSmallImg.length; i++) {
		aSmallImg[i].onmouseover = function () {
			// 去掉所有img的className
			for(var j =0; j < aSmallImg.length; j++) {
				aSmallImg[j].className = '';
			}
			this.className = 'active';

			oBigImg.src = this.src;
			oMiddleImg.src = this.src;
		}
	}

	// 添加鼠标移入事件
	oMiddleBox.onmouseenter = function () {
		setStyle(oBigBox, {display:'block'});
		setStyle(oZoomArea, {display:'block'});
	}

	// 添加鼠标移出事件
	oMiddleBox.onmouseleave = function () {
		setStyle(oBigBox, {display:'none'});
		setStyle(oZoomArea, {display:'none'});
	}

	// 添加鼠标移动事件
	oMiddleBox.onmousemove = function (ev) {
		var
			ev = ev || window.event,
			iLeft = ev.clientX - oPos.left - oZoomArea.offsetWidth/2,
			iTop = ev.clientY  - oPos.top - oZoomArea.offsetHeight/2;

		// 左侧范围做限定
		if(iLeft < 0) {
			iLeft = 0;
		}
		// 顶侧范围做限定
		if(iTop < 0) {
			iTop = 0;
		}
		// 右侧范围做限定
		if(iLeft > oMiddleBox.offsetWidth - oZoomArea.offsetWidth) {
			iLeft = oMiddleBox.offsetWidth - oZoomArea.offsetWidth;
		}
		// 下侧范围做限定
		if(iTop > oMiddleBox.offsetHeight - oZoomArea.offsetHeight) {
			iTop = oMiddleBox.offsetHeight - oZoomArea.offsetHeight;
		}

		// 设定遮罩层的位置
		setStyle(oZoomArea, {left: iLeft + 'px', top: iTop + 'px'});

		// 比例 iMoveX/iMaxMoveX = iImgMoveX/iImgMaxMoveX
		var
			iImgLeft = - iLeft / (oMiddleBox.offsetWidth - oZoomArea.offsetWidth) * (oBigImg.offsetWidth - oBigBox.offsetWidth),
			iImgTop  = - iTop / (oMiddleBox.offsetHeight - oZoomArea.offsetHeight) * (oBigImg.offsetHeight - oBigBox.offsetHeight);

		// 设定大图片的位置
		setStyle(oBigImg, {left: iImgLeft + 'px', top: iImgTop + 'px'});
	}

	// 通过ID获取DOM节点
	function $(id) {
		return document.getElementById(id);
	}

	// 通过标签名称获取DOM节点列表
	function byTagName(obj, tagName) {
		return obj.getElementsByTagName(tagName);
	}

	// 设置DOM节点style样式
	function setStyle(obj, oTarget) {
		for(var sAttr in oTarget) {
			obj.style[sAttr] = oTarget[sAttr];
		}
	}

	// 获取某个元素距离body的水平距离和垂直距离
	function position(obj) {
		var oPos = {left: 0,top: 0};

		do{
			oPos.left += obj.offsetLeft;
			oPos.top  += obj.offsetTop;
			obj = obj.offsetParent;
		}while(obj);

		return oPos;
	}
}