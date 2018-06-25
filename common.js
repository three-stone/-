
//下载app
export const dowlond = () => {
		 let u = navigator.userAgent;let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     if (isAndroid) {
     		try {
     			let elemIF = document.createElement("iframe");
     			elemIF.src = 'http://XXX.apk';
     			elemIF.style.display = "none";
     			document.body.appendChild(elemIF);
            } catch (e) {
                alert('下载失败');
            }
        } else if (isIOS) {
        	alert('IOS用户请前往AppStore下载');
        } else {};
}      
//判断微信 
 export const isWeixin = () =>{
 	  let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=='micromessenger'){
            return true;
        }else{
            return false;
        }
 }            
//只能输入数字
export const number = (obj) => obj.replace(/[^\d\.]/g, '');
//去除空格
export const space = (obj) => obj.replace(/\s+/g, "");
//判断数据类型
export const judge = (obj) => Object.prototype.toString.call(obj).slice(8,-1);
//获取url中的参数
export const getUrlParam = (name) => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
//移动端字体自适应
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


//求最大值
(function(){
  var maxNum = Math.max.apply(null,arguments);
  console.log(maxNum); //56
})(34,2,56);

//合并数组
function () {
	var arry  = [];
	var arry1 = [];
	Array.prototype.push.apply(arry,arry1)
	console.log(arry)
}
//消息滚动（上下）
function roll(){
            var timer,top;    
            var ulObj = $(".rollBox").find("ul"),
                length = $(".rollBoxOne li").length,  
                liFirst = $(".rollBoxOne").find("li").eq(0),
                height=Number($(".rollBoxOne").find("li").eq(0).height()),
                liSec = liFirst.next();
            ulObj.append(liFirst.clone()).append(liSec.clone());  //把第一个第二个都添加到<ul>标签中
            clearInterval(timer);
            timer = setInterval(function(){  //设置定时器
                var top = ulObj.css("margin-top");
                top = +top.slice(0,-2);
                if(top != -(height * length)){  //获取现在的高度如果没有到最后就上移
                    top -= height;
                    ulObj.css({"-webkit-transition":"all 1s","transition":"all 1s","margin-top":top});
                }else{  //如果到了最后就迅速到零
                    top = 0;
                    ulObj.css({"-webkit-transition":"none","transition":"none","margin-top":top});
                    setTimeout(function(){  //这里加一个延时器，也是要放在队列最后去执行，为了避免两个动画合并
                        top -= height;
                        ulObj.css({"-webkit-transition":"all 1s","transition":"all 1s","margin-top":top});
                    },0)
                }
            },2000);
}
/*ios 点击有阴影 css 中加 -webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;*/
