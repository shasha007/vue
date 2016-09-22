/**
 * Created by huqiwen on 16/9/5.
 *  index Js
 */

//requireJs 设置
require.config({
    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "vue": "../../bower_components/vue/dist/vue",
        "clipboard": "../../bower_components/clipboard/dist/clipboard.min",
        "Util": "../../common/js/util",
        "tmp" : "../../common/js/tmp"
    },
});
var SearchRecord = "common/json/school.json";

//requireJs
require(['jquery', 'vue', 'Util','clipboard'], function ($, Vue, util,clipboard) {
    var index = new Vue({
        el: '#shares',
        data: {
            school:[]
        },
        methods: {
            init: function () {
                //获取搜索纪录
                new util.AjaxVue(SearchRecord, {}, false, index.school).get();
            },
            copy : function () {
                var elem = document.getElementById("copyCon");
                elem.focus();
                elem.setSelectionRange(0, elem.value.length);
            },
            goTo : function () {
                window.location.href = 'https://m.zhangle.com/downloads/download_manager.html?manager=&branch=HTC1-8461923186&hall=&client=cft71';
            },
            getFocus : function () {
                $("#h_LogInBg").show();
                $(".sharesCon").hide();
            }
        },
        computed: {},
        watch: {
        }
    });
    index.init();
    console.log(index.school[0].sName)
    $(".h_SelectSchool li").click(function () {
        $(".schoolName").val($(this).html());
        $("#h_LogInBg").hide();
        window.scrollTo(0,0);
        $(".sharesCon").show();
        if (window.location.hash !== "") {
            window.location.hash = "";
        }
    })
});

