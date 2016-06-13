/**
 * 动态更改rem值
 */
!(function (win) {
	var doc = win.document;
	var docEL = doc.documentElement;
	var tid;
	function refushRem(){
		var width = docEL.getClientRects().width;
		if (width <540) {
			width = 540;
		}
		var rem = width / 6.4;
		docEL.style.fontSize = rem + 'px';
	};
	win.addEventListener('resize',function(){
		clearTimeout(tid);
		tid = setTimeout(refushRem,300);
	},false);
	win.addEventListener('pageshow',function(e){
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refushRem,300);
		}
	},false);
	refushRem();
})(window)