/**
 * Created by huqiwen on 16/9/7.
 *  index Js
 */

//requireJs 设置
require.config({
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap.min",
        "vue": "../../bower_components/vue/dist/vue",
        "Util": "../../common/js/util",
        "tmp" : "../../common/js/tmp"
    },
    shim : {
        bootstrap : {
            deps : [ 'jquery' ],
            exports : 'bootstrap'
        }
    }
});

var schoolUrl = "common/json/schoolinfo.json";

var voteUrl = "common/json/vote.json";

var sid = 0;
//requireJs
require(['jquery' ,'vue', 'Util','bootstrap'], function ($, Vue, util,bootstrap) {
    var school = new Vue({
        el: '#school',
        data: {
            school : {},
            img:[],
            vote:{},
            error:""
        },
        methods: {
            init: function (sid) {
               this.school = new util.AjaxVue(schoolUrl, {sid : sid}, false, this.school).getobj();

                //var schoolList = new util.PullToRefresh(schoolUrl);
                ////获取首页list
                //schoolList.initList(this.school, {});
                ////绑定滚动事件
                //schoolList.scrollBottom(this.school, $(".index_loading_flag"));
            },
            voteSchool : function (sId) {
                var _self = this.school;
                $.ajax({
                    dataType:"json",
                    type: 'POST',
                    url: voteUrl,
                    data: {sid:sId },
                    async: false,
                    success: function (data) {
                        this._vote = data;
                        if(data.status == 0 && data.info==""){
                            $(".two").show();$(".success").hide();$(".error").hide();
                            $('#tips').modal('show');
                        }else if(data.status == 1){
                            _self.votes = data.data.votes;
                            $(".two").hide();$(".success").show();$(".error").hide();
                            $('#tips').modal('show');
                            setTimeout(function () {
                                $('#tips').modal('hide');
                            },1500);
                        }else if(data.status == 0 && data.info != ""){
                            $(".error").html(data.info);
                            $(".two").hide();$(".success").hide();$(".error").show();
                            $('#tips').modal('show');
                            setTimeout(function () {
                                $('#tips').modal('hide');
                            },1500);
                        }
                    },
                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) { //error
                        console.log(errorThrown + "  " + textStatus + "  " + XMLHttpRequest);
                    }
                });
            }
        },
        computed: {},
        watch: {
        }
    });
    //获取url参数
    sid = util.GetQueryString("sid");
    //页面初始化
    school.init(sid);
});
