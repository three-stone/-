window.onload = function () {
	var
		oBox 		  = $('box'),
		oFlashList    = $('flash-list'),
		aListLi       = byTagName(oFlashList, 'li'),
		oFlashBtn     = $('flash-btn'),
		aBtnA         = byTagName(oFlashBtn, 'a'),
		oDirectionBtn = $('direction-btn'),
		oLeftBtn      = $('left-btn'),
		oRightBtn     = $('right-btn'),
		iCurIndex	  = 0, // 默认显示的下标
		oTimer 		  = null; // 保存定时器的返回值

	// 给所有的小按钮添加over事件
	for(var i = 0; i < aBtnA.length; i++) {
		aBtnA[i].index = i;
		aBtnA[i].onmouseover = function () {
			iCurIndex = this.index;
			move(iCurIndex);
		}
	}

	// 给box添加enter事件
	oBox.onmouseenter = function () {
		clearInterval(oTimer);
		setStyle(oDirectionBtn, {display:'block'});
	}

	// 给box添加leave事件
	oBox.onmouseleave = function () {
		autoMove();
		setStyle(oDirectionBtn, {display:'none'});
	}

	// 给左侧按钮添加click事件
	oLeftBtn.onclick = function () {
		iCurIndex--;

		// 左侧临界点判断
		if(iCurIndex < 0) {
			iCurIndex = aListLi.length - 1;
		}
		move(iCurIndex);
	}
	// 给右侧按钮添加click事件
	oRightBtn.onclick = function () {
		rightMove();
	}

	// 自动轮播
	autoMove();

	// 通过ID获取DOM对象
	function $(id) {
		return document.getElementById(id);
	}

	// 通过节点名称获取DOM列表
	function byTagName(obj, tagName) {
		return obj.getElementsByTagName(tagName);
	}

	// 封装修改样式
	function setStyle(obj, oTarget) {
		for(var sAttr in oTarget) {
			obj.style[sAttr] = oTarget[sAttr];
		}
	}

	// 每一个li做动画的过程
	function move(iIndex) {
		// 让其它的li都隐藏掉
		for(var j = 0; j < aListLi.length; j++) {
			(function (obj) {
				timeMove(obj, {opacity:0}, Tween.Linear, 200, function () {
					setStyle(obj, {display: 'none'});
				});
			})(aListLi[j]);

			// 默认去掉所有按钮的className
			aBtnA[j].className = '';
		}
		// 显示当前的li
		setStyle(aListLi[iIndex], {display: 'block'});
		timeMove(aListLi[iIndex], {opacity:100}, Tween.Linear, 200);

		// 当前按钮添加className
		aBtnA[iIndex].className = 'active';
	}

	// 往右运动
	function rightMove() {
		iCurIndex++;

		// 右侧临界点判断
		if(iCurIndex === aListLi.length) {
			iCurIndex = 0;
		}
		move(iCurIndex);
	}

	// 自动轮播的函数
	function autoMove() {
		oTimer = setInterval(function () {
			rightMove();
		},3000);
	}
}