/**
 * OMD
 * 模块加载
 */
"use strict";
!function(factory){
	if (typeof module === 'object' && module.exports === 'object') {
		module.exports = factory(require('jQuery'));
	}else{
		var exports = factory(window.jQuery);
		for (var key in exports) {
			window[key] = exports[key];
		}
	}

}(function($){
	var hello = function(){
		$("#text").html('123');
	};
	var printname = function(){
		console.log($('.input1').val());
	};
	$('body').on('click','.input1',printname);
	return hello();
})