
//下载app
/*function dowlond (){
	 var u = navigator.userAgent;
	 var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
	 var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     if (isAndroid) {
     		try {
     			var elemIF = document.createElement("iframe");
     			elemIF.src = 'http://XXX.apk';
     			elemIF.style.display = "none";
     			document.body.appendChild(elemIF);
            } catch (e) {
                alert('下载失败');
            }
        } else if (isIOS) {
        	alert('IOS用户请前往AppStore下载');
        } else {};
}   */
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
/*function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}*/
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


/*ios 点击有阴影 css 中加 -webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;*/