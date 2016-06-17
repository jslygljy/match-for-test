/**
 * 动态更改rem值
 */
!(function () {
	var docEL = window.document.documentElement;
	var tid;
	function refushRem(){
		var width = docEL.getBoundingClientRect().width;
		docEL.style.fontSize = width / 6.4 + 'px';
	};
	window.addEventListener('resize',function(){
		refushRem();
	},false);
	refushRem();
})()