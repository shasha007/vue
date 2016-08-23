/**
 * Created by huqiwen on 16/8/11. 第二课堂
 */

var getDetailUrl = "common/json/detail.json"

$(function () {
    var extra = new Vue({
        el: '#Extra',
        data: {
            detail:[],
        },
        methods: {
        },
        computed: {}
    })
    //初始化下面折线图
    InitLine("H_ECharts_Line", Line.Name, Line.xname, Line.xvalue, Line.xcolor, Line.yvalue);
    //初始化旁边饼状图
    InitLeftPie("H_ECharts", LeftPie.xname, SetColor(LeftPie.xvalue));

    getDetail(extra.detail);
})
//获取细节
function getDetail(Vue){
  var ajax = new Ajax(getDetailUrl,{},false,Vue);
    ajax.get();
}
