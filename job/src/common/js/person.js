/**
 * Created by huqiwen on 16/8/8.
 */
var list1 = new PullToRefresh("common/json/person.json");

var list2 = new PullToRefresh("common/json/collect.json");

$(function () {
    var person = new Vue({
        el: '#person',
        data: {
            tab: true,
            record: [],
            collect :[]
        },
        methods: {
            swap: function () {
                this.tab = !this.tab;
                if((list1.nowPage <= list1.totalPage)||(list2.nowPage <= list2.totalPage)){
                    $(".data-null").remove();
                }
            },
            init: function () {
                var _record = this;
                list1.initList(_record.record,'');
                list2.initList(_record.collect,'');
            },
            getnext : function (data) {
                var _record = this;
                if(this.tab){
                    list1.getList(_record.record,data,$("#person"));
                }else{
                    list2.getList(_record.collect,data,$("#person"));
                }
            }
        },
        computed: {}
    })
    person.init();

    $(window).scroll(function (event) {
            if(person.tab){
                list1.scrollTabBottom(person,$("#person"));
            }else{
                list2.scrollTabBottom(person,$("#person"));
        }
    });
});


