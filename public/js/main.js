var num = 1;
var newcontent = Storage.getItem('newcontent');
var userlist = Storage.getItem('userlist');
var user = Storage.getItem("cuerruser");
var pagenum = Math.ceil(newcontent.NewList.length/5);
var loginurl = 'http://172.16.5.30:8008/login.html';
if (user == false && window.location.href != loginurl) {
	window.location.href='login.html';
}
$('.alert').hide();

/*  登录  */
$("body").on('click','.login',function(){
	var username = $('.username').val();
	var userpassword = $('.userpassword').val();
	checklogininfo(username,userpassword);
})
function indexlist(){
	pagination();
	changelist(window.newcontent,1);
}

/*  登录检查登录信息  */
function checklogininfo(username,userpassword){
	for (var i = 0; i <userlist.userList.length; i++) {
		if(userlist.userList[i].username == username && userlist.userList[i].password == userpassword){
			window.location.href='index.html';
			Storage.setItem("cuerruser",{'username':username,'userpassword':userpassword});
		}else{
			$('.alert').show();
			setTimeout("$('.alert').fadeOut()",2000 )
		}
	}
}

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
	if (num == 1) {
		return
	}
	changelist(newcontent,num-1);
	pagination()
})

/*  退出登录  */
$("body").on('click','.quite',function(){
	Storage.removeItem('cuerruser');
	window.location.href='login.html';
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

/*  更新新闻详细  */
function changedetail(){
	var commentdetail = '';
	/*  更新新闻详细  */
	for (var i = 0; i <newcontent.NewList.length ; i++) {
      if (newcontent.NewList[i].id == location.hash.replace("#",'')) {
          $("#newdetail .newtitle").html(newcontent.NewList[i].NewTitle);
          $("#newdetail .newtime").html(newcontent.NewList[i].CreatTime);
          $("#newdetail .newAuther").html(newcontent.NewList[i].Auther);
          $("#newdetail .content-block").html(newcontent.NewList[i].NewContent);

          for (var f = 0; f<newcontent.NewList[i].comment.length; f++) {
          	commentdetail +='<p>'+newcontent.NewList[i].comment[f].commentname +'说了：'+ newcontent.NewList[i].comment[f].commentcontent+'</p>';
          }
      }
    }
    $(".commonList").html(commentdetail);
}


/*  评论  */
$("body").on('click','.commitcommon',function(){
	var inputval = $('.commontext').val();
	for (var i = 0; i <newcontent.NewList.length ; i++) {
		if (newcontent.NewList[i].id == location.hash.replace("#",'')) {
			newcontent.NewList[i].comment.push({'commentname':user.username,'commentcontent':inputval})
		}
	}
	Storage.setItem('newcontent',newcontent);
	changedetail()
})

/*  新增  */
$("body").on('click','.addNews',function(){
	var newstitle = $('.newstitle').val();
	var addcontent = $('.newscontent').val();
	newcontent.NewList.push({
		'id':newcontent.NewList.length+1,
		'Auther':user.username,
		'CreatTime':new Date().valueOf(),
		'NewTitle':newstitle,
		'NewContent':addcontent,
		'ImagesID':$("input:checked").val(),
		"comment":[]
	});
	Storage.setItem('newcontent',newcontent);
	$('.alert').show();
	setTimeout("$('.alert').fadeOut();window.location.href='index.html';",2000 )
})

	    		
	    		