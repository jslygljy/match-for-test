(function () {
  // 首页
  var routes = {
    '/normal': function () {
      $.ajax({
          url:'index.html',
          type:'get'
      }).done(function(data){
        $("title").html("首页"); 
        $(".container").html($(data))
      })
    },
    '/normal':{
      '/newdetail/:id':{
        on:function(id){
            $.ajax({
                url:'newdetail.html',
                type:'get'
            }).done(function(data){
              $(".container").html($(data));
              changedetail(window.newcontent,id)
            })
        }
      }
    },
    // 登陆
    '/login': function () {
      $.ajax({
          url:'login.html',
          type:'get'
      }).done(function(data){
        $("title").html("登陆"); 
        $(".container").html($(data))
      })
    },
    '/resgit':function(){
      //注册
      $.ajax({
          url:'resgit.html',
          type:'get'
      }).done(function(data){
        $("title").html("注册"); 
        $(".container").html($(data))
      })
    },
    '/addNew':function(){
      //新增新闻
      $.ajax({
          url:'addNew.html',
          type:'get'
      }).done(function(data){
        $("title").html("新增新闻"); 
        $(".container").html($(data))
      })
    }
  };
  
  var routers = Router(routes).configure({
    // 进入任意一个路由均会执行
    on: function () {
      if (location.hash === '#/normal' && !islogin) {
        location.hash = '/login';
      }else{
        console.log('1')
      }
    }
  });
  // 打破迷关
  routers.on('login', function () {
      window.islogin = false;
  });
  // 如果进入页面时的路由没找到处理函数，则直接进入 /normal
  routers.init('/normal');
})();