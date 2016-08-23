/**
 * Created by huqiwen on 16/8/15.
 */
//个人信息
var getDataUrl = "common/json/preview.json";

$(function () {
    var preview = new Vue({
        el: '#preview',
        data: {
            person:{},
            personInfo:{},
            jobFor :{},
            Education :{}
        },
        methods: {
            set : function (type) {
                var _self = this;
                if(type == "1"){
                    _self.person.Set1 = !  _self.person.Set1;
                }else{
                    _self.person.Set2 = ! _self.person.Set2;
                }
            }
        },
        computed: {}
    });
    //初始化下面折线图
    InitLine("H_ECharts_Line", Line.Name, Line.xname, Line.xvalue, Line.xcolor, Line.yvalue);
    //初始化旁边饼状图
    InitLeftPie("H_ECharts", LeftPie.xname, SetColor(LeftPie.xvalue));

    var _flag = [];
    getDetail(_flag);
    preview.person = _flag[0];
    if(preview.person.Sex=="1"){
        preview.person.Sex = "male";
    }else{
        preview.person.Sex ="female";
    }
    HandlePerson(preview.person,preview);




})

//获取信息
function getDetail(Vue){
    var ajax = new Ajax(getDataUrl,{},false,Vue);
    ajax.get();
}

function changeSet(id,type,value){
    //var ajax = new Ajax(getDetailUrl,{},false,Vue);
    //ajax.get();
}
function HandlePerson(person,Vue){

    Vue.personInfo = person.Person;
    Vue.jobFor = person.JobFor;
    Vue.Education = person.Education;

}