#比赛测试用例#
仅用Sbulime Text、以及Jqurey和bootstrap静态文件编写一个web app

* 写出Framework7 List效果
* 登录、注册验证
* 根据[director Demo](https://github.com/iamjoel/front-end-plugins/blob/master/detail/director/demo.html)写出单页路由
* 根据屏幕宽度写出两套分页插件屏幕小于768px的时候使用[下拉刷新](http://www.apkbus.com/android-92608-1-1.html)否则出现下一页按钮
* 根据Input值筛选出匹配json数据标题
* 根据时间排序，或者根据标题首字母排序
* 评论组件
* 新增添加新闻功能

###如何限制“Text-Area”域中的字符的个数###
```javascript
jQuery.fn.maxLength = function (max) { 
    this.each(function () {
    	 var type = this.tagName.toLowerCase();
		 var inputType = this.type ? this.type.toLowerCase() : null; 
		 if (type == "input" && inputType == "text" || inputType == "password") { 
		 this.maxLength = max; 
		 } 
		 else if (type == "textarea") { 
		 this.onkeypress = function (e) { 
		 	var ob = e || event; 
		 	var keyCode = ob.keyCode; 
		 	var hasSelection = document.selection ? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd; 
		 	return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection); }; 
		 	this.onkeyup = function () {
		 		if (this.value.length > max) { 
		 		this.value = this.value.substring(0, max); 
		 		} 
		 	}; 
		 } 
	 }); 
};```
```javascript
//用法 $(‘#mytextarea').maxLength(500);
```

###如何把一个元素放在屏幕的中心位置###
```javascript
jQuery.fn.center = function () { 
	this.css('position', 'absolute'); 
	this.css('top', ($(window).height() - this.height()+$(window).scrollTop() + 'px'); 
    this.css('left', ($(window).width() - this.width()/ 2 + $(window).scrollLeft() + 'px' 
 ); 
 return this; }
//这样来使用上面的函数： $(element).center();
```