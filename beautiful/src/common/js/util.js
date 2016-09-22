/**
 * Created by huqiwen on 16/8/30. 工具类 --->require
 */
//基本设置
var ajaxtype = "GET"; //ajax类型
var dataType = "json"; //数据格式
var isload = false; //是否正在加载

define(['jquery'], function ($) {
//对象
    function PullToRefresh(url) {
        this.nowPage = 0;  //当前页数
        this.totalPage = 0; //总页数
        this.url = url;  //ajax请求的url
        this.data = null;
        this.initList = function (Vue, data) {  //初始化 获取第一页数据 (vue data对象,ajax参数(json格式))
            var _self = this
            $.ajax({
                type: ajaxtype,
                dataType : dataType,
                url: this.url,
                data: data,
                async: false,
                success: function (data) { //success
                    var _length = data.data.list.length;
                    for (var i = 0; i < _length; i++) {  //获得数据 vue双向绑定 所以只要push
                        Vue.push(data.data.list[i]);
                    }
                    _self.nowPage = data.data.nowPage; // 设定当前页数=1
                    _self.totalPage = data.data.totalPage;  //获得总页数
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown);
                }
            });
        };
        this.scrollBottom = function (Vue, dom) { //滚动事件 (Vue对象(不是data) 需要加入提示的dom节点)
            var _self = this;
            $(window).scroll(function (event) { //滚动事件
                var viewH = $(window).height(),//可见高度
                    contentHeight = $("body")[0].scrollHeight, //内容高度
                    scrollTop = $("body")[0].scrollTop; //滚动高度
                if ((viewH + scrollTop) >= contentHeight - 120) { //位于底部70px时
                    if (_self.nowPage <= _self.totalPage) { //有数据时
                        _self.nowPage++;  //页数+1
                        if (!isload) {
                            isload = true;
                            new AjaxVue(_self.url, {page: _self.nowPage,}, false, Vue, dom).getList();
                        }
                    }
                    if (_self.nowPage == _self.totalPage && _self.totalPage > 1) { //无数据时
                        if (!isload) {
                            dom.append("<div class=\"data-loader data-null\">没有更多数据了</div>");
                            isload = true;
                        }

                    }

                }
            });
        }
        this.scrollTabBottom = function (Vue, dom) { //滚动事件(多个list在同一个页面) (Vue对象(不是data) 需要加入提示的dom节点)
            var _self = this;
            var viewH = $(window).height(),//可见高度
                contentHeight = $("body")[0].scrollHeight, //内容高度
                scrollTop = $("body")[0].scrollTop; //滚动高度
            if ((viewH + scrollTop) >= contentHeight - 70) { //位于底部70px时
                if (_self.nowPage <= _self.totalPage) { //有数据时
                    _self.nowPage++;  //页数+1
                    if (!isload) {
                        isload = true;
                        new AjaxVue(_self.url, {page: _self.nowPage,}, false, Vue, dom).get();
                    }
                }
                if (_self.nowPage == _self.totalPage && _self.totalPage > 1) { //无数据时
                    if (!isload) {
                        dom.append("<div class=\"data-loader data-null\">没有更多数据了</div>");
                        isload = true;
                    }

                }

            }
        }
        //多个list在同一个页面时的处理
        /**
         $(window).scroll(function (event) {
        if(person.tab){
            list1.scrollTabBottom(person);
        }else{
            list2.scrollTabBottom(person);
        }
    });
         */
    }

// (url , ajax data参数 同步/异步, 返回数据 , function before ajax send *(此参数为方法)(可以为空) , function ajax complete *(此参数为方法)(可以为空))
    function Ajax(url, data, async, returnData, before, complete, success) {
        this.url = url;
        this.data = data;
        this.async = async;
        this.returnData = returnData;
        //初始化 beforeSend
        if (typeof (before) == "undefined" || before == "") {
            this.before = function () {
            }
        } else {
            this.before = before;
        }
        //初始化 complete
        if (typeof (complete) == "undefined" || before == "") {
            this.complete = function () {
            }
        } else {
            this.complete = complete;
        }
        //get方法
        this.get = function () {
            var _self = this;
            $.ajax({
                type: 'GET',
                url: _self.url,
                data: _self.data,
                dataType : dataType,
                async: _self.async,
                beforeSend: before, //请求之前 function
                complete: complete, //请求结束 function
                success: function (data) {
                    if (typeof (success) == "undefined" || success == "") {
                        _self.returnData = data;
                        return _self;
                    } else {
                        success(data, _self.returnData);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown);
                }
            });
            return _self;
        };
        //post 方法
        this.post = function () {
            var _self = this;
            $.ajax({
                type: 'POST',
                url: _self.url,
                data: _self.data,
                dataType : dataType,
                async: _self.async,
                beforeSend: before, //请求之前 function
                complete: complete, //请求结束 function
                success: function (data) {
                    _self.returnData = data;
                    return _self;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown);
                }
            });
        }
    }

//GetPageInfo 分页对象 (接口url,ajax data参数)
    function GetPageInfo(url, data) {
        this.page = { //page 对象
            "nowPage": 0, //当前页数
            "totalPage": 0 //总页数
        }
        this.url = url;  //ajax请求的url
        this.data = data;  //ajax data 参数
        this.InitPage = function () {
            var _self = this;
            var ajax = new Ajax(_self.url, _self.data, false, _self.data); //初始化ajax对象
            ajax.get(); // get方法!
            //初始化page对象
            _self.page.nowPage = ajax.returnData.nowPage;
            _self.page.totalPage = ajax.returnData.totalPage;
            return _self;
        }
    }

    //ajax about Vue
    function AjaxVue(url, data, async, vue, dom) {
        this.url = url;
        this.data = data;
        this.async = async;
        this.getobj = function () {
            var _self = this;
            $.ajax({
                type: 'GET',
                url: _self.url,
                data: _self.data,
                async: _self.async,
                dataType : dataType,
                success: function (data) {
                    vue = data.data;
                },
                beforeSend: function () {
                    if (typeof (dom) !== "undefined") {
                        dom.append("<div class=\"data-loader data-loading\">加载中</div>");
                    }
                },
                complete: function () {
                    if (typeof (dom) !== "undefined") {
                        $(".data-loading").remove();
                        isload = false;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                }
            });
            return vue;
        };
        this.getList = function () {
            var _self = this;
            $.ajax({
                type: 'GET',
                url: _self.url,
                data: _self.data,
                async: _self.async,
                dataType : dataType,
                success: function (data) {
                    var _length = data.data.list.length;
                    for (var i = 0; i < _length; i++) {

                        vue.push(data.data.list[i]);  //获得数据 vue双向绑定 所以只要push
                    }
                },
                beforeSend: function () {
                    if (typeof (dom) !== "undefined") {
                        dom.append("<div class=\"data-loader data-loading\">加载中</div>");
                    }
                },
                complete: function () {
                    if (typeof (dom) !== "undefined") {
                        $(".data-loading").remove();
                        isload = false;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                }
            });
        };
        this.get = function () {
            var _self = this;
            $.ajax({
                type: 'GET',
                url: _self.url,
                data: _self.data,
                async: _self.async,
                dataType : dataType,
                success: function (data) {
                    var _length = data.data.length;
                    for (var i = 0; i < _length; i++) {
                        vue.push(data.data[i]);  //获得数据 vue双向绑定 所以只要push
                    }
                },
                beforeSend: function () {
                    if (typeof (dom) !== "undefined") {
                        dom.append("<div class=\"data-loader data-loading\">加载中</div>");
                    }
                },
                complete: function () {
                    if (typeof (dom) !== "undefined") {
                        $(".data-loading").remove();
                        isload = false;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                }
            });
        };
        this.post = function () {
            var _self = this;
            $.ajax({
                type: 'POST',
                url: _self.url,
                data: _self.data,
                async: _self.async,
                dataType : dataType,
                success: function (data) {
                    var _length = data.data.length;
                    for (var i = 0; i < _length; i++) {
                        vue.push(data.data[i]);  //获得数据 vue双向绑定 所以只要push
                    }
                },
                beforeSend: function () {
                    if (typeof (dom) !== "undefined") {
                        dom.append("<div class=\"data-loader data-loading\">加载中</div>");
                    }
                },
                complete: function () {
                    if (typeof (dom) !== "undefined") {
                        $(".data-loading").remove();
                        isload = false;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                    console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                }
            });
        }
    }


    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    return {
        AjaxVue: AjaxVue,
        Ajax: Ajax,
        PullToRefresh: PullToRefresh,
        GetQueryString: GetQueryString
    };
});
