/**
 * Created by huqiwen on 16/8/11. 第二课堂
 */
//折线图json
var Line = {
    "Name": "这里是名字",
    "xname": [
        "学分",
        "积分"
    ],
    "xcolor": [
        "#3a9fdf",
        "#4ee4c8"
    ],
    "xvalue": [
        "2014.01", "2014.02", "2014.03", "2014.04", "2014.05", "2014.06"
    ],
    "yvalue": [
        {"value": ["100", "1200", "400", "500", "600", "170"]},
        {"value": ["300", "100", "600", "200", "700", "470"]}
    ]
}

//左侧饼状图颜色
var LeftPieColor = new Array("#70d0e9","#fdb163","#fcdf56","#fc8d56","#f05050","#cd8af8","#64f0c8","#70bbef","#c4ef50","#ff95b5");

//左侧饼状图 json
var LeftPie = {
    "xname": ['道德修养', '志愿服务', '技能培训', '学术创新', '实习就业', '文体创业', '身心发展', '其他'],
    "xcolor": [
        "#3a9fdf", "#4ee4c8", "#ea5504", "#f69d08", "#ff6d1d"
    ],
    "xvalue": [
        {value: 20, name: '道德修养'},
        {value: 20, name: '志愿服务'},
        {value: 20, name: '技能培训'},
        {value: 20, name: '学术创新'},
        {value: 20, name: '实习就业'},
        {value: 20, name: '文体创业'},
        {value: 20, name: '身心发展'},
        {value: 20, name: '其他'}
    ],

}
//用于处理饼状图颜色
function SetColor(value) {
    var _length = value.length;
    var _color;
    for (var i = 0; i < _length; i++) {
        _color = {"normal": {"color": LeftPieColor[i]}};
        value[i].itemStyle = _color;
    }
    return value;
}

//折线图初始化
function InitLine(id, name, xname, xvalue, xcolor, yvalue) {
    var Chart = echarts.init(document.getElementById(id));
    Chart.setOption({
        title: {
            text: name,
            padding: [
                10,  // 上
                0, // 右
                0,  // 下
                15, // 左
            ],
            textStyle: {
                fontSize: 16,
                fontWeight: 400,
                color: '#222'          // 主标题文字颜色
            },
        },

        tooltip: { //是否显示提示框组件
//                'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
//                'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            trigger: 'axis'
        },
        //图例组件。
        legend: {
            data: xname, //图例的数据数组。
            padding: [
                10,  // 上
                0, // 右
                0,  // 下
                0, // 左
            ],
        },
        toolbox: {
            //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
//            feature: {
//                saveAsImage: {}
//            }
        },
        //位置 直角坐标系内绘图网格
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        //x轴
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xvalue
            }
        ],
        //y轴
        yAxis: [
            {
                type: 'value'
            }
        ],
        //数据  系列列表。每个系列通过 type 决定自己的图表类型
        series: [
            {
                name: xname[0],
                type: 'line',
//                    stack: '总量',
                //样式
                smooth:true,
                areaStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                lineStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                itemStyle: {
                    normal: {
                        color: xcolor[0]
                    }
                },
                data: yvalue[0].value
            },
            {
                name: xname[1],
                type: 'line',
                smooth:true,
//                    stack: '总量',
                areaStyle: {
                    normal: {
                        color: xcolor[1]
                    }
                },
                lineStyle: {
                    normal: {
                        color: xcolor[1]
                    }
                },
                itemStyle: {
                    normal: {
                        color: xcolor[1]
                    }
                },
                data: yvalue[1].value
            }

        ]
    })
}
//初始化左侧饼状图
function InitLeftPie(id, xname, xvalue) {
    var Chart = echarts.init(document.getElementById(id));
    Chart.setOption({
        title: {
            text: '活动参与次数',
            padding: [
                10,  // 上
                0, // 右
                0,  // 下
                15, // 左
            ],
            textStyle: {
                fontSize: 16,
                fontWeight: 400,
                color: '#222'          // 主标题文字颜色
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            top: 'middle',
            left: 'right',
            containLabel: true,
            data: xname
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['30%', '55%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            color:"#333"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: xvalue
            }
        ]
    });
}