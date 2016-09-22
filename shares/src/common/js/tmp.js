/**
 * Created by huqiwen on 16/8/19. vue模版 (公共尾部)
 */

define(['jquery','vue'], function ($,Vue) {
    //type {1:index}
    function setPublicBottom(flagType,complete){
        // 定义
        var publicFoot = Vue.extend({

            template: "<div @click=\"go(1)\"><p><img :src=\"flag==1 ? 'common/images/job_on.png':'common/images/job.png'\"></p><p :style=\"flag==1 ? 'color:#ea5504' : ''\">职位列表</p></div><div @click=\"go(2)\"><p><img :src=\"flag==2 ? 'common/images/vita_on.png':'common/images/vita.png'\"></p><p :style=\"flag==2 ? 'color:#ea5504' : ''\">简历({{complete}}%)</p></div><div @click=\"go(3)\"><p><img :src=\"flag==3 ? 'common/images/foot_on.png':'common/images/foot.png'\"></p><p :style=\"flag==3 ? 'color:#ea5504' : ''\">足迹</p></div>",
            data: function () {
                return {
                    flag: flagType,
                    complete: complete
                }
            },
            methods: {
                go: function (type) {
                    if (type == 1) {
                        if(this.flag!=1){
                            window.location.href = 'index1.html';
                        }
                    }else if(type ==2 ){
                        if(this.flag!=2){
                            window.location.href = 'vitae.html';
                        }
                    }else{
                        if(this.flag!=3){
                            window.location.href = 'Person.html';
                        }
                    }
                },
            }
        })

        // 注册
        Vue.component('public-foot', publicFoot);

        // 创建根实例
        new Vue({
            el: '#PublicFooter',
        })
    }
    return {
        setPublicBottom : setPublicBottom,
    }
});

