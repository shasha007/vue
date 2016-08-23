/**
 * Created by huqiwen on 16/8/11. 评价
 */
//个人信息
var getDateUrl = "common/json/mine.json";
$(function () {
    var vitae = new Vue({
        el: '#vitae',
        data: {
            person:{},

        },
        methods: {
            goVitae : function(){
                window.location.href = 'preview.html';
            }
        },
        computed: {}
    })
    var _flag = [];
    getDetail(_flag);
    vitae.person = _flag[0];
    if(vitae.person.Sex=="1"){
        vitae.person.Sex = "male";
    }else{
        vitae.person.Sex ="female";
    }
})

//获取信息
function getDetail(Vue){
    var ajax = new Ajax(getDateUrl,{},false,Vue);
    ajax.get();
}
