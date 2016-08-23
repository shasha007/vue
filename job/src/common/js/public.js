/**
 *  公共js文件 vue分页
 */
//基本设置
var isload = false; //是否正在加载
var ajaxtype = "GET"; //ajax类型
var dataType = "json"; //数据格式

//对象
function PullToRefresh(url) {
    this.nowPage = 0;  //当前页数
    this.totalPage = 0; //总页数
    this.url = url;  //ajax请求的url
    this.initList = function (Vue, data) {  //初始化 获取第一页数据 (vue data对象,ajax参数(json格式))
        var _self = this;
        $.ajax({
            type: ajaxtype,
            url: _self.url,
            data: data,
            async: false,
            success: function (data) { //success
                var _length = data.data.length;
                for (var i = 0; i < _length; i++) {  //获得数据 vue双向绑定 所以只要push
                    Vue.push(data.data[i]);
                }
                _self.nowPage = 1; // 设定当前页数=1
                _self.totalPage = 2; //获得总页数
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                console.log(errorThrown);
            }
        });
    };
    this.getList = function (Vue, data, dom) {  //获得上拉下一页数据(Vue data对象,ajax参数(json格式),需要加入提示的dom节点)
        var _self = this;
        if (!isload) { //当前不在加载
            $.ajax({
                type: ajaxtype,
                url: _self.url,
                data: data,
                dataType: dataType,
                async: false,
                beforeSend: function () { //添加提示
                    dom.append("<div class=\"data-loader data-loading\">加载中</div>");
                    isload = true; //加载flag
                },
                success: function (data) {
                    $(".data-loading").remove(); //移除提示
                    var _length = data.data.length;
                    for (var i = 0; i < _length; i++) {
                        Vue.push(data.data[i]);  //获得数据 vue双向绑定 所以只要push
                    }
                    isload = false;//加载flag
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {//error
                }
            });
        }
    };

    this.scrollBottom = function (Vue,dom) { //滚动事件 (Vue对象(不是data) 需要加入提示的dom节点)
        var _self = this;
        $(window).scroll(function (event) { //滚动事件
            var viewH = $(window).height(),//可见高度
                contentHeight = $("body")[0].scrollHeight, //内容高度
                scrollTop = $("body")[0].scrollTop; //滚动高度
            if ((viewH + scrollTop) >= contentHeight - 70) { //位于底部70px时
                _self.nowPage++;  //页数+1
                if (_self.nowPage <= _self.totalPage) { //有数据时
                    Vue.getnext({page: _self.nowPage,}
                    );
                }
                if (_self.nowPage == _self.totalPage && _self.totalPage > 1) { //无数据时
                    if (!isload) {
                        dom.append("<div class=\"data-loader data-null\">没有更多数据了</div>");
                        isload = true;
                    }

                }

            }
        });
    },
        this.scrollTabBottom = function (Vue,dom) { //滚动事件(多个list在同一个页面) (Vue对象(不是data) 需要加入提示的dom节点)
            var _self = this;
            var viewH = $(window).height(),//可见高度
                    contentHeight = $("body")[0].scrollHeight, //内容高度
                    scrollTop = $("body")[0].scrollTop; //滚动高度
                if ((viewH + scrollTop) >= contentHeight - 70) {
                    _self.nowPage++;
                    if (_self.nowPage <= _self.totalPage) {
                        Vue.getnext({page: _self.nowPage,}
                        );
                    }
                    if (_self.nowPage == _self.totalPage && _self.totalPage > 1) {
                        if (!isload) {
                            dom.append("<div class=\"data-loader data-null\">没有更多数据了</div>");
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


//ajax
function Ajax(url,data,async,vue) {
    this.url = url;
    this.data = data;
    this.async = async;
    this.get = function () {
        var _self = this;
        $.ajax({
            type: 'GET',
            url: _self.url,
            data: _self.data,
            async: _self.async,
            success: function (data) {
                var _length = data.data.length;
                for (var i = 0; i < _length; i++) {
                    vue.push(data.data[i]);  //获得数据 vue双向绑定 所以只要push
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                console.log(errorThrown);
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
            success: function (data) {
                var _length = data.data.length;
                for (var i = 0; i < _length; i++) {
                    vue.push(data.data[i]);  //获得数据 vue双向绑定 所以只要push
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                console.log(errorThrown);
            }
        });
    }
}
