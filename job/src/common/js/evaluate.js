/**
 * Created by huqiwen on 16/8/11. 个人评价
 */


$(function () {
    var evaluate = new Vue({
        el: '#evaluate',
        data: {
            evaluateValue :''
        },
        methods: {
            submit:function(){
                console.log(this.evaluateValue);
            }
        },
        computed: {}
    })
    //初始化下面折线图
    InitLine("H_ECharts_Line", Line.Name, Line.xname, Line.xvalue, Line.xcolor, Line.yvalue);
})
