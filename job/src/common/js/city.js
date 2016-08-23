/**
 * Created by huqiwen on 16/8/15. 选择城市
 */
//省
var getProvinceUrl = "common/json/sheng.json";

//市
var getCityUrl = "common/json/shi.json";

//区
var getAreaUrl = "common/json/qu.json";

$(function () {
    var city = new Vue({
        el: '#city',
        data: {
            location:'获取中...',
            province :[],
            city :[],
            area :[],
            showP :true,
            showC :false,
            showQ :false,
            PFlag : {"isShow":false,"name":""},
            CFlag : {"isShow":false,"name":""},
            QFlag : {"isShow":false,"name":""},
        },
        methods: {
            getCity : function(id,name){
                var _self = this;
                _self.city = [];
                _self.location = "";
                GetCity(id,_self.city);
                _self.PFlag.isShow = true;
                _self.PFlag.name = name;
                _self.location = _self.location + name + " ";
                _self.showP = false;
                _self.showC = true;
                _self.showQ = false;
            },
            getQu :function(id,name){
                var _self = this;
                _self.area = [];
                GetArea(id,_self.area);
                _self.CFlag.isShow = true;
                _self.CFlag.name = name;
                _self.location = _self.location + name + " ";
                _self.showP = false;
                _self.showC = false;
                _self.showQ = true;

            },
            ChooseQu :function(id,name){
                var _self = this;
                _self.QFlag.isShow = true;
                _self.QFlag.name = name;
                _self.location = _self.location + name + " ";
                _self.showP = false;
                _self.showC = false;
                _self.showQ = true;
                window.location.href = 'https://www.baidu.com/';
            },
            reset: function (type) {
                var _self = this;
                _self.location = '请选择城市';
                if(type == 1){
                    _self.PFlag.isShow = false;
                    _self.PFlag.name = "";
                    _self.QFlag.isShow = false;
                    _self.QFlag.name = "";
                    _self.CFlag.isShow = false;
                    _self.CFlag.name = "";
                    _self.showP = true;
                    _self.showC = false;
                }else if(type == 2){
                    _self.CFlag.isShow = false;
                    _self.CFlag.name = "";
                    _self.QFlag.isShow = false;
                    _self.QFlag.name = "";
                    _self.showC = true;
                    _self.showQ = false;
                }else{
                    _self.QFlag.isShow = false;
                    _self.QFlag.name = "";
                }
            },
            GetLocation : function () {
                var _self = this;
                _self.location = '获取中...',
                GetLocation();
                setTimeout(function () {
                    if(typeof(City.city)=='undefined'||errorCode!==-1){
                        city.location = '获取位置失败,请稍后再试'
                    }else{
                        city.location = City.city+City.district + City.street + City.streetNumber+"";
                    }
                },1000);

            }
        },
        computed: {}
    })
    GetLocation();
    setTimeout(function () {
        if(typeof(City.city)=='undefined'||errorCode!==-1){
            city.location = '获取位置失败,请稍后再试'
        }else{
            city.location = City.city+City.district + City.street + City.streetNumber+"";
        }
    },1000);

    Getprovince(city.province);
})
//获取省份
function  Getprovince(Vue){
    var ajax = new Ajax(getProvinceUrl,{},false,Vue);
    ajax.get();
}
//获取城市
function  GetCity(id,Vue){
    var _flag = [];
    var ajax = new Ajax(getCityUrl,{},false,_flag);
    ajax.get();
    var _length = _flag.length;
    for(var i = 0; i<_length ; i++){
        if(_flag[i].ProID == id){
            Vue.push(_flag[i]);
        }
    }
}
//获取区
function GetArea(id,Vue){
    var _flag = [];
    var ajax = new Ajax(getAreaUrl,{},false,_flag);
    ajax.get();
    var _length = _flag.length;
    for(var i = 0; i<_length ; i++){
        if(_flag[i].CityID == id){
            Vue.push(_flag[i]);
        }
    }
}
