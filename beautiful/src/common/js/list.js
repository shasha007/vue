/**
 * Created by huqiwen on 16/9/5.
 *  index Js
 */

//requireJs 设置
require.config({
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "vue": "../../bower_components/vue/dist/vue",
        "Util": "../../common/js/util",
        "tmp": "../../common/js/tmp"
    },
});
//正式投票：9月22日12:00点整——10月10日12:00点整

var schoolUrl = "common/json/school.json";

var startTime = new Date("September 12,2016 12:00:00");

var endTime = new Date("October 10,2016 12:00:00");
//requireJs
require(['jquery', 'vue', 'Util'], function ($, Vue, util) {
    var list = new Vue({
        el: '#list',
        data: {
            rank: [],
            start: true,
            on: true,
            over: false
        },
        methods: {
            init: function () {
                var schoolList = new util.PullToRefresh(schoolUrl);
                //获取首页list
                schoolList.initList(this.rank, {order: 1, p: 1});
                //绑定滚动事件
                schoolList.scrollBottom(this.rank, $(".index_loading_flag"));

                checkTime(this);
                //new util.AjaxVue(schoolUrl, {}, false, this.rank).get();
            }
        },
        computed: {},
        watch: {}
    });
    //页面初始化
    list.init();
    function checkTime(obj) {
        var now = new Date();
        if (now < startTime) {//未开始
            obj.start = false;
            obj.on = false;
            obj.over = false;
        } else if (startTime <= now && now <= endTime) { //开始中
            obj.start = true;
            obj.on = true;
            obj.over = false;
        } else { //结束
            obj.start = true;
            obj.on = false;
            obj.over = true;
        }
    }
});
