var num = 1;
console.log(1)
var data = Storage.getItem('newcontent');
window.newcontent = data;
window.pagenum = Math.ceil(data.NewList.length/5);
pagination();
changelist(window.newcontent,1);

/*  更新列表  */
function changelist(data,num){
	window.num = num;
	var indexList = '';
	$("#indexList ul").empty();
	if (data.NewList.length != 0) {
		var itemTemplate = $('#newlist').html();
		var renderDatalist = data.NewList.slice((num-1) * 5, num * 5); 
        var html = renderDatalist.map(function(item,index) {
          return itemTemplate
          	.replace('{id}', item.id)
  			.replace('{imagesid}', 'public/images/info_bg'+ item.ImagesID +'.png')
    		.replace('{time}', item.NewTitle)
    		.replace('{name}', item.Auther);
      }).join('');
          
       	$("#indexList ul").html(html);
	}else{
		$("#indexList ul").html('<li>数据为空</li>')
	} 
};

/*  分页  */
function pagination(){

	var sth = '';
	var data = Storage.getItem("newcontent");
	
	sth += '<li class="previous"><a><span>Previous</span></a></li>'
	for (var i = 1; i <= pagenum; i++) {
		sth += '<li class="pagefont"><a><span>'+ i +'</span></a></li>'
	}
	sth += '<li class="next"><a><span>Next</span></a></li>'

	$('.pagination').html(sth);

	if (num == 1) {
		$('.pagination li.previous').addClass('disabled');
		$('.pagination li.next').removeClass('disabled')
	}
	if (num == pagenum) {
		$('.pagination li.previous').removeClass('disabled');
		$('.pagination li.next').addClass('disabled')	;
	}
	$('.pagination .pagefont').removeClass('active');
	$('.pagination .pagefont').eq(num-1).addClass('active');
}

/*  上一页  */
$("body").on('click','.previous',function(){
	changelist(newcontent,num-1);
	pagination()
})

/*  下一页  */
$("body").on('click','.next',function(){
	if (num+1>window.pagenum) {
		return
	}
	changelist(newcontent,num+1);
	pagination()
})

/*  第几页  */
$("body").on('click','.pagefont',function(){
	changelist(newcontent,$(this).index());
	pagination()
})

/*  搜索输入的名称  */
$("body").on('click','.sublimetype',function(){
	var data = Storage.getItem("newcontent");
	var inputval = $('.search-input').val();
	var changedata ={'NewList':[]};
	for (var i = 0; i <data.NewList.length; i++) {
		if(data.NewList[i].NewTitle.indexOf(inputval)!=-1){			
			changedata.NewList.push(data.NewList[i]);
		}
	};
	changelist(changedata,1);
	pagination()
})

/*  按名称排序  */
$("body").on('click','.ordername',function(){
	var data = Storage.getItem("newcontent");
	var sortqueue = data.NewList.sort();
	var changedata ={'NewList':sortqueue};
	changelist(changedata,1);
	pagination()
})

/*  按时间排序  */
$("body").on('click','.timeorder',function(){
	var data = Storage.getItem("newcontent");
	var datamath = {'NewList':data.NewList.sort(function(a,b){
        return new Date(a.CreatTime).valueOf() > new Date(b.CreatTime).valueOf()
    })}
    changelist(datamath,1);
    pagination()
})





	    		
	    		