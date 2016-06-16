
/**
     * 本地存储操作封装
**/
console.log(2)
var Storage = {
    //设置存储对象
    setItem: function (key, val) {
        //保存时，添加时间戳
        val.timestamp = new Date().getTime();
        localStorage.setItem(key, JSON.stringify(val));
    },
    //获取token
    getItem: function (key) {
        var _result = JSON.parse(localStorage.getItem(key));
        return _result ? _result : false;
    }
};