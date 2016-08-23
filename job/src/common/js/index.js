/**
 * Created by huqiwen on 16/8/10.
 */

var SearchRecord = "common/json/SearchRecord.json";

var SearchResult = "common/json/SearchResult.json";

var indexList = new PullToRefresh("common/json/index.json");

$(function () {
    var index = new Vue({
        el: '#index',
        data: {
            index: [],
            search: [],
            searchRecord: [],
            isSearch: false,
            Searched: false,
            isEmpty: false,
            inputValue: ''
        },
        methods: {
            init: function () {
                var _self = this;
                indexList.initList(_self.index, '');
            },
            getnext: function (data) {
                var _self = this;
                indexList.getList(_self.index, data, $(".index_loading_flag"));
            },
            clearRecord: function () {
                this.searchRecord = [];
            },
            clear: function () {
                this.inputValue = '';
                this.isSearch = false;
                this.Searched = false;
                this.isEmpty = false;
            },
            getFocus: function () {
                this.isSearch = true;
                this.Searched = false;
                this.isEmpty = false;
            },
            SearchFromRecord: function (id, name, index) {
                this.inputValue = name;
                this.Searched = true;
                doSearch({content: ''});
            },
            SearchEnter: function () {
                if(this.inputValue==''){

                }else{
                    this.Searched = true;
                    doSearch({content: ''});
                }

            },
        },
        computed: {}
    });


    //input输入监听
    $('#searchInput').bind('input propertychange', function() {
        index.inputValue = $(this).val().trim();
        if (index.inputValue == '') {
            index.isSearch = false;
            index.Searched = false;
            index.isEmpty = false;
        } else {
            index.isSearch = true;
            index.Searched = false;
            index.isEmpty = false;
        }
    });


    getSearchRecord(index.searchRecord);
    index.init();
    indexList.scrollBottom(index, $(".index_loading_flag"));



    function getSearchRecord(record) {
        $.ajax({
            type: "GET",
            url: SearchRecord,
            data: {},
            async: false,
            success: function (data) {
                var _length = data.data.length;
                for (var i = 0; i < _length; i++) {
                    record.push(data.data[i]);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    function doSearch(data) {
        index.search = [];
        $.ajax({
            type: "GET",
            url: SearchResult,
            data: data,
            async: false,
            success: function (data) {
                var _length = data.data.length;
                if (!_length > 0) {
                    for (var i = 0; i < _length; i++) {
                        index.search.push(data.data[i]);
                    }
                } else {
                    index.isEmpty = true;
                }

                if (index.searchRecord.length !== 0) {
                    if (index.searchRecord[0].Record !== 'index.inputValue') {
                        if (index.searchRecord.length < 8) {
                            index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                        } else {
                            index.searchRecord.pop();
                            index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                        }
                    }
                } else {
                    index.searchRecord.unshift({"Id": "2", "Record": index.inputValue});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
});
