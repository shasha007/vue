/**
 * Created by huqiwen on 16/8/9.
 */


function getsecCookie(a, b) {
    var c = null;
    if ($.cookie(a)) {
        for (var d = $.cookie(a).split("&"), e = 0; e < d.length; e++)d[e].indexOf(b) > -1 && (c = d[e].substring(b.length + 1));
        return c
    }
}
!function () {
    function a(a) {
        return g.raw ? a : encodeURIComponent(a)
    }

    function b(a) {
        return g.raw ? a : decodeURIComponent(a)
    }

    function c(b) {
        return a(g.json ? JSON.stringify(b) : String(b))
    }

    function d(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(f, " ")), g.json ? JSON.parse(a) : a
        } catch (b) {
        }
    }

    function e(a, b) {
        var c = g.raw ? a : d(a);
        return $.isFunction(b) ? b(c) : c
    }

    var f = /\+/g, g = $.cookie = function (d, f, h) {
        if (void 0 !== f && !$.isFunction(f)) {
            if (h = $.extend({}, g.defaults, h), "number" == typeof h.expires) {
                var i = h.expires, j = h.expires = new Date;
                j.setTime(+j + 864e5 * i)
            }
            return document.cookie = [a(d), "=", c(f), h.expires ? "; expires=" + h.expires.toUTCString() : "", h.path ? "; path=" + h.path : "", h.domain ? "; domain=" + h.domain : "", h.secure ? "; secure" : ""].join("")
        }
        for (var k = d ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], m = 0, n = l.length; n > m; m++) {
            var o = l[m].split("="), p = b(o.shift()), q = o.join("=");
            if (d && d === p) {
                k = e(q, f);
                break
            }
            d || void 0 === (q = e(q)) || (k[p] = q)
        }
        return k
    };
    g.defaults = {}, $.removeCookie = function (a, b) {
        return void 0 === $.cookie(a) ? !1 : ($.cookie(a, "", $.extend({}, b, {expires: -1})), !$.cookie(a))
    }
}(), $(function () {
    $("body").delegate(".touchable", "touchstart", function () {
        $(this).addClass("touched")
    }), $("body").delegate(".touchable", "touchend touchcancel touchmove", function () {
        $(this).removeClass("touched")
    }), $("body").delegate(".page-back", "click", function () {
        var a = this.getAttribute("href");
        a && "javascript" === a.substring(0, 10).toLowerCase() && history.back()
    }), $("body").delegate(".header-menu-btn", "click", function () {
        function a(a, b) {
            for (var c = a.length - 1; c >= 0; c--) {
                var d = a[c];
                if (d.substring(0, b.length + 1) == b + "=")return d.substring(b.length + 1)
            }
            return ""
        }

        var b = $(".header-menu"), c = $(".header-menu-bg");
        c.length ? c.css({display: "block"}) : ($("body").append('<div class="header-menu-bg"></div>'), c = $(".header-menu-bg"), c.on("click", function () {
            $(".header-menu").removeClass("open"), $(this).removeClass("open"), $("body").css({overflow: "auto"});
            var a = this;
            setTimeout(function () {
                a.style.display = "none"
            }, 200)
        })), setTimeout(function () {
            c.addClass("open"), $("body").css({overflow: "hidden"})
        }, 20);
        var d, e, f, g, h, i = ($.cookie("cnUser") || "").split("&"), j = ($.cookie("passport_login_state") || "").split("&"), k = a(i, "userid"), l = a(j, "partner_loginname"), m = encodeURIComponent(location.href);
        parseFloat(k) > 0 || l.length ? (d = "logout", f = "退出", e = "login", m = "https://passport.ly.com/m/logout.html?returnUrl=" + m, h = "wd_m4") : (d = "login", f = "登录/注册", e = "logout", g = $("#headerMenuUrl").val(), m = "https://passport.ly.com/m/login.html?returnUrl=" + (g ? encodeURIComponent(g) : m), h = "wd_m3");
        var n = $(this), o = n.offset().top + n.height() + 9 + "px";
        if (b.length) {
            if (0 === $("." + d, b).length) {
                var p = $("." + e);
                p.removeClass(e).addClass(d).prop("href", m).html("<i></i>" + f)
            }
            b.css({top: o})
        } else {
            var q = "";
            location.href.indexOf("https://") && (q = "http://m.ly.com"), $("body").append('<div class="header-menu" style="top: ' + o + '"><a class="home touchable" data-track="wd_m1" href="' + q + '/home/index.html"><i></i>首页</a><a class="my touchable" data-track="wd_m2" href="' + q + '/member/"><i></i>我的同程</a><a class="' + d + ' touchable" data-track="' + h + '" href="' + m + '"><i></i>' + f + "</a></div>"), b = $(".header-menu")
        }
        setTimeout(function () {
            b.addClass("open")
        }, 20)
    })
}), $(function () {
    function a() {
        window.scrollY >= c ? b.show() : b.hide()
    }

    var b = $(".side-back-top");
    if (b[0]) {
        var c = b.attr("data-top") || 300;
        c = parseFloat(c, 10), $(document).on("touchmove scroll", a), a()
    }
}), function () {
    $.getServiceTel = function (a) {
        var b = sessionStorage.getItem("serviceTel"), c = getRefid();
        if (b)try {
            if (b = JSON.parse(b), b.refid === c)return void a(b.tel)
        } catch (d) {
        }
        $.post("/AjaxHelper/TelConfigHandler.ashx", {refid: c}, function (b) {
            a(b), sessionStorage.setItem("serviceTel", JSON.stringify({refid: c, tel: b}))
        })
    }
}(), $(function () {
    function a(a, b) {
        for (var c, d, e = a.split("&"), f = b ? void 0 : {}, g = 0, h = e.length; h > g; g++)if (c = e[g])if (c = c.split("="), d = c.shift(), b) {
            if (b === d)return c.join("=")
        } else f[d] = c.join("=");
        return f
    }

    0 !== $(".page-footer .nav .service-tel").length && $.getServiceTel(function (a) {
        "4007-555-555" !== a && $(".page-footer .nav .service-tel").attr("href", "tel:" + a)
    });
    var b = $(".page-footer .tool a:first-child");
    if (!b.hasClass("my")) {
        var c, d, e, f, g = $.cookie("cnUser");
        g && (g = decodeURIComponent(a(g, "nickName"))), g ? (g.length > 12 && (g = g.substring(0, 9) + "..."), c = "http://m.ly.com/member/", d = "logined", $(".page-footer .tool span").html("您好！"), f = "wd_wdb") : (g = "登录", e = $("#headerMenuUrl").val(), c = "https://passport.ly.com/m/login.html?returnUrl=" + (e ? encodeURIComponent(e) : encodeURIComponent(location.href)), f = "wd_wdb2"), b.attr("href", c).addClass(d).html(g).attr("data-track", f)
    }
}), function () {
    var a = document.getElementById("pageLoading");
    a && (window.addEventListener("DOMContentLoaded", function () {
        a.style.display = "none"
    }), window.addEventListener("pageshow", function () {
        a.style.display = "none"
    }), window.addEventListener("beforeunload", function () {
        a.style.display = "block"
    }))
}(), $(function () {
    $("body").delegate("*", "click", function (a) {
        if ("undefined" != typeof _tcTraObj) {
            var b = $(this).attr("data-track");
            b && _tcTraObj._tcTrackEvent("click", b)
        }
    })
}), function () {
    $(function () {
        var a = $("#commonHiddenheader"), b = getRefid();
        if (a[0])for (var c = $("#commonHiddenheader").val().split(","), d = 0; d < c.length; d++)c[d] === b && $(".page-header")[0] && !$("#ishome")[0] && $(".page-header").addClass("none")
    })
}(), function () {
    var a = function () {
        function a(a) {
            return h(b(g(a)))
        }

        function b(a) {
            for (var b = a, g = new Array(80), h = 1732584193, i = -271733879, j = -1732584194, k = 271733878, l = -1009589776, m = 0; m < b.length; m += 16) {
                for (var n = h, o = i, p = j, q = k, r = l, s = 0; 80 > s; s++) {
                    16 > s ? g[s] = b[m + s] : g[s] = f(g[s - 3] ^ g[s - 8] ^ g[s - 14] ^ g[s - 16], 1);
                    var t = e(e(f(h, 5), c(s, i, j, k)), e(e(l, g[s]), d(s)));
                    l = k, k = j, j = f(i, 30), i = h, h = t
                }
                h = e(h, n), i = e(i, o), j = e(j, p), k = e(k, q), l = e(l, r)
            }
            return [h, i, j, k, l]
        }

        function c(a, b, c, d) {
            return 20 > a ? b & c | ~b & d : 40 > a ? b ^ c ^ d : 60 > a ? b & c | b & d | c & d : b ^ c ^ d
        }

        function d(a) {
            return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
        }

        function e(a, b) {
            var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }

        function f(a, b) {
            return a << b | a >>> 32 - b
        }

        function g(a) {
            for (var b = (a.length + 8 >> 6) + 1, c = new Array(16 * b), d = 0; 16 * b > d; d++)c[d] = 0;
            for (d = 0; d < a.length; d++)c[d >> 2] |= a.charCodeAt(d) << 24 - 8 * (3 & d);
            return c[d >> 2] |= 128 << 24 - 8 * (3 & d), c[16 * b - 1] = 8 * a.length, c
        }

        function h(a) {
            for (var b = i ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++)c += b.charAt(a[d >> 2] >> 8 * (3 - d % 4) + 4 & 15) + b.charAt(a[d >> 2] >> 8 * (3 - d % 4) & 15);
            return c
        }

        var i = 0;
        return {hex_sha1: a}
    }();
    $.extend($, {commonFn: {SHA1: a}})
}(), function () {
    function a(a) {
        var b = document.createElement("a");
        return b.href = a, {
            protocol: b.protocol,
            host: b.host,
            hostname: b.hostname,
            port: b.port,
            origin: b.origin,
            pathname: b.pathname,
            search: b.search,
            hash: b.hash
        }
    }

    function b(a, b) {
        for (var c, d, e = a.split("&"), f = b ? void 0 : {}, g = 0, h = e.length; h > g; g++)if (c = e[g])if (c = c.split("="), d = c.shift(), b) {
            if (b === d)return c.join("=")
        } else f[d] = c.join("=");
        return f
    }

    function c() {
        var a = location.hostname.match(/\.[^\.]*\.(com|cn|net)$/);
        return a ? a[0].substring(1) : location.hostname
    }

    function d() {
        for (var a = ["RefId", "tcbdkeyid", "SEFrom", "SEKeyWords", "RefUrl"], b = [], d = 0, e = a.length; e > d; d++)b.push(a[d] + "=" + (void 0 === arguments[d] ? "" : arguments[d]));
        $.cookie("CNSEInfo", b.join("&"), {domain: c(), path: "/"}), $.cookie("17uCNRefId", arguments[0], {
            domain: c(),
            path: "/"
        })
    }

    function e(a) {
        var b, d = $.cookie("qdid"), e = [];
        if (d) {
            if ("-99999" === a)return void(m = d);
            e = g(d.split(",")), e.length > 2 && (e = e.splice(-2))
        }
        e.push(a), b = e.join(","), m = b, $.cookie("qdid", b, {domain: c(), path: "/"})
    }

    function f(a) {
        if (a) {
            var b, c, d;
            return b = a.split("|"), c = b.pop(), d = b.join("&"), $.commonFn.SHA1.hex_sha1(d).substr(11, 6) === c
        }
    }

    function g(a) {
        for (var b = [], c = 0, d = a; c < d.length; c++)f(d[c]) && b.push(d[c]);
        return b
    }

    function h(a) {
        var c = $.cookie(a);
        return c ? b(c) : void 0
    }

    $.extend($, {getRootDomain: c, parseUrl: a, parseParam: b}), $.cookie.raw = !0;
    var i, j, k, l, m = "-99999";
    window.getRefid = function () {
        return i
    }, window.getQdid = function () {
        return m
    }, $.buildAppUrl = function (b) {
        if (j && o) {
            var c = b;
            "/" !== c.substring(c.length - 1) && (c += "/");
            var d = a(c), e = d.pathname.split("/").length;
            if (6 === e)return c + j + "|" + o;
            if (5 === e)return c + "tchome/" + j + "|" + o
        }
        return b
    }, window.getMemberId = function () {
        var a, c = $.cookie("CNMember");
        return c && (a = b(c, "MemberId")), a && "0" !== a && "undefined" !== a || (c = $.cookie("cnUser"), c && (a = b(c, "userid"))), a && "undefined" !== a || (a = "0"), a
    }, window.getNmemberId = function () {
        var a = $.cookie("nus"), c = "0";
        return a && (c = b(a, "userid"), c && "undefined" !== c || (c = "0")), c
    }, function () {
        for (var a, b = /[\?&#](refid|tcbdkeyid|qdid|jobnumber)=([^\?&#]*)/gi, c = b.exec(location.href), d = {}; c;)a = c[2], ("" === a || "undefined" === a || "0" === a) && (a = void 0), d[c[1].toLowerCase()] = a, c = b.exec(location.href);
        i = d.refid, j = d.tcbdkeyid, k = d.qdid, l = d.jobnumber
    }();
    var n, o, p, q, r = [{
        name: "baidu",
        searchParam: ["word", "wd", "title", "ref"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47582300",
        tcqdid: "25464|1|47582300|821ad4"
    }, {
        name: "google",
        searchParam: ["q"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47582655",
        tcqdid: "25467|1|47582655|64602e"
    }, {
        name: "yahoo",
        searchParam: ["p"],
        encodeParam: "ei",
        encode: "utf-8",
        refId: "47582788",
        tcqdid: "25469|1|47582788|a42a5c"
    }, {
        name: "bing",
        searchParam: ["q"],
        encode: "utf-8",
        refId: "47582703",
        tcqdid: "25468|1|47582703|8de960"
    }, {name: "soso", searchParam: ["key", "query"], encodeParam: "ie", encode: "gb2312"}, {
        name: "sogou",
        searchParam: ["keyword", "query"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47582611",
        tcqdid: "25466|1|47582611|4be4f4"
    }, {name: "iask", searchParam: ["q"], encode: "gb2312"}, {
        name: "so",
        searchParam: ["q"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47582541",
        tcqdid: "25465|1|47582541|ccebc3"
    }, {
        name: "haosou",
        searchParam: ["q"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47582541",
        tcqdid: "25465|1|47582541|ccebc3"
    }, {name: "jike", searchParam: ["q"], encodeParam: "ie", encode: "utf-8"}, {
        name: "panguso",
        searchParam: ["q"],
        encodeParam: "ie",
        encode: "utf-8"
    }, {
        name: "sm",
        searchParam: ["q"],
        encodeParam: "ie",
        encode: "utf-8",
        refId: "47587956",
        tcqdid: "25472|1|47587956|116f4a"
    }, {name: "zhongsou", searchParam: ["w"], encodeParam: "ie", encode: "utf-8"}, {
        name: "youdao",
        searchParam: ["q"],
        encodeParam: "ue",
        encode: "utf-8"
    }];
    if (function () {
            var c = document.referrer;
            if (c)for (var d, e = a(c), f = b(e.search.substring(1)), g = 0, h = r.length; h > g; g++)if (d = r[g], new RegExp("(^|\\.)" + d.name + "\\.").test(e.hostname)) {
                n = d.refId || "10758821", o = d.name, p = f[d.searchParam[0]] || f[d.searchParam[1]] || "", q = f[d.encodeParam] || d.encode, k = d.tcqdid || "-99999";
                break
            }
        }(), n) {
        if (i = i || n, !j) {
            var s = h("CNSEInfo");
            s && s.SEFrom === o && (j = s.tcbdkeyid)
        }
        return /gb/i.test(q) ? $.ajax({
            url: "http://www." + c() + "/AjaxHelper/Gb2312ToUtf8.ashx?words=" + p,
            dataType: "jsonp",
            success: function (a) {
                var b = "";
                a && a.words && (b = a.words), d(i, j, o, b, encodeURIComponent(document.referrer))
            }
        }) : d(i, j, o, p, encodeURIComponent(document.referrer)), k || (k = "-99999"), void e(f(k) || "-99999" === k ? k : "-88888")
    }
    !function () {
        l && $.cookie("jobnumber", l, {domain: c(), path: "/"});
        var a = $.cookie("CNSEInfo");
        a = a ? b(a) || {} : {};
        var g = a.RefId, h = a.tcbdkeyid;
        return k || (k = "-99999"), e(f(k) || "-99999" === k ? k : "-88888"), i && i !== g ? void d(i, j) : (i = g, g && "0" !== g && "undefined" !== g ? j && j !== h ? void d(i, j) : (j = "" === h ? void 0 : h, void(o = a.SEFrom)) : (i = "10758821", void d(i, j)))
    }()
}(), $(function () {
    var a = $("#publicNotice");
    if (0 !== a.length) {
        var b = {
            hotel: 4,
            flight: 5,
            scenery: 6,
            dujia: 15,
            common: 10,
            selftravel: 12,
            youlun: 18,
            iflight: 14,
            traintickets: 16
        }, c = b[a.attr("data-channel")] || "";
        $.ajax({
            type: "POST", url: "/bulletin/query?channel=" + c, dataType: "json", success: function (b) {
                b && b.Success && ("" !== b.ReturnValue.Text ? a.html('<p class="public-notice"><i></i><span>' + b.ReturnValue.Text + "</span></p>") : a.html(b.ReturnValue.Html))
            }
        })
    }
}), function () {
    function a() {
        function a() {
            var a = new Date;
            return a.setDate(a.getDate() + 1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), a
        }

        var b = !1, c = [];
        $.getCommonDownloadUrl = function (a) {
            var d = sessionStorage.getItem("commonDownload");
            if (d)try {
                d = JSON.parse(d);
                var e = d.config, g = !1;
                if (e) {
                    g = !0;
                    for (var h in f)if (f[h] !== e[h]) {
                        g = !1;
                        break
                    }
                }
                if (g)return void a(d.url)
            } catch (i) {
            }
            return b ? void c.push(a) : ($.post("/AjaxHelper/CommonBottomAdHandler.ashx", f, function (d) {
                b = !1, a(d);
                for (var e = 0, g = c.length; g > e; e++)c[e](d);
                sessionStorage.setItem("commonDownload", JSON.stringify({config: f, url: d}))
            }), void(b = !0))
        };
        var d, e = "commonDownload";
        if (localStorage && (d = localStorage.getItem(e))) {
            if (d = new Date(d), (new Date).getTime() < d.getTime())return;
            localStorage.removeItem(e)
        }
        var f, g = document.getElementById("commonDownload");
        if (g) {
            try {
                f = JSON.parse(g.value)
            } catch (h) {
                return
            }
            f.refid = getRefid(), f.qdid = getQdid();
            var i = {
                flight: ["同程旅游APP订机票", "多返、立减、红包抵现", "//pic4.40017.cn/index/slide/2016/05/03/15/ojOJnW.png"],
                iflight: ["同程旅游APP订国际机票", "多返、立减、红包抵现", "//pic4.40017.cn/index/slide/2016/05/05/11/I1aLXR.png"],
                scenery: ["同程旅游APP订景点门票", "红包立减、购特权享1元", "//pic4.40017.cn/index/slide/2016/07/07/15/0WNxiW.png"],
                selftravel: ["同程旅游APP订周边游", "立减、秒杀、10元特惠", "//pic4.40017.cn/index/slide/2016/05/05/11/sR5Hfb.png"],
                youlun: ["同程旅游APP", "邮轮特卖 击穿底价", "//pic4.40017.cn/index/slide/2016/05/03/16/Rx7Puz.png"],
                dujia: ["同程旅游APP", "出境狂欢，买10000送10000", "//pic4.40017.cn/index/slide/2016/05/05/10/JA4PJV.png"],
                traintickets: ["同程旅游APP订火车票", "多返、立减、红包抵现", "//pic4.40017.cn/index/slide/2016/05/03/15/2wRk0O.png"],
                hotel: ["同程旅游APP订酒店 ", "最高立减100，最高返房费30%", "//pic4.40017.cn/index/slide/2016/05/05/11/NU3G8z.png"],
                bus: ["同程旅游APP订汽车票", "多返、立减、红包抵现", "//pic4.40017.cn/index/slide/2016/05/03/15/v5CZtu.png"],
                guoneiyou: ["同程旅游APP", "随时预订，随性出发！", "//pic4.40017.cn/index/slide/2016/05/03/15/YlO5L0.png"],
                common: ["同程旅游APP", "五一出游，专享更多优惠！", "//pic4.40017.cn/index/slide/2016/06/30/16/SKK4Qn.png"],
                def: ["同程旅游APP", "五一出游，专享更多优惠！", "//pic4.40017.cn/index/slide/2016/05/05/10/JA4PJV.png"]
            }, j = i[f.channel];
            j || (j = i.def);
            var k, l = '<div  style="position:relative"><a href="' + $.buildAppUrl("//m.17u.cn/app/qr/26902982") + '" style="position:absolute;width:100%;height:100%;top:0;left:0;background:transparent" ></a> <i style="position:absolute;width:6.54%;height:10%;left:0;top:0;z-index:5;padding-top:5.54%;"></i> <img style="width:100%;display:block;background:rgb(61, 65, 80);" src=' + j[2] + ' alt=""></div>';
            $("body").prepend(l), k = $("body >div:first-child"), $("i", k).on("click", function () {
                k.remove(), localStorage && localStorage.setItem(e, a().toUTCString())
            }), $.getCommonDownloadUrl(function (a) {
                $("a", k).attr("href", $.buildAppUrl(a) + "?tag=start^2^" + f.qdid + "^" + f.refid)
            }), $("a", k).on("click", function () {
                _tcTraObj && _tcTraObj._tcTrackEvent("touch_xz", "banner", "下载客户端banner", "^" + f.channel + "^" + f.refid)
            })
        }
    }

    function b() {
        var a, b = getRefid(), d = sessionStorage.getItem("isLoadApp") || $.cookie("isLoadApp"), e = /(\/scenery\/scenerydetail_|\/flightnew\/airportbus-|\/hotel\/jiudian_|\/dujia\/tours\/|\/hotel\/hotellist|\/flightnew\/|\/selftrip\/line\/|\/hotel\/hotellist_|\/pub\/train\/trainsearch-|\/guoneiyou\/list\/|)/, f = window.location.href;
        if (-1 === navigator.userAgent.toLowerCase().indexOf("micromessenger") && (!d || "1" !== d))try {
            var g, h = {
                "selftravel-index": "shouji.17u.cn|internal|h5|file|8|main.html",
                "youlun-index": "shouji.17u.cn|internal|h5|file|3|main.html",
                "dujia-index": "shouji.17u.cn|internal|h5|file|14|main.html",
                "flight-index": "shouji.17u.cn|internal|flight|home",
                "scenery-index": "shouji.17u.cn|internal|scenery|home",
                "hotel-index": "shouji.17u.cn|internal|hotel|home",
                "traintickets-index": "shouji.17u.cn|internal|h5|file|18|main.html",
                "home-index": "shouji.17u.cn|internal|tchome|tchome",
                "global-index": "tctclient:||hotel|home?isGlobal=1",
                "guoneiyou-index": "tctclient:||inland|inlandIndex?backPage=0&destgroup=0",
                "iflight-index": "shouji.17u.cn|internal|h5|file|21|main.html?wvc1=1&wvc2=1#|flightindex?tab=20&backType=close",
                "youji-index": "appnew.ly.com|co|guideIndex|Index",
                "movie-index": "shouji.17u.cn|internal|movie|home",
                "bus-index": "shouji.17u.cn|internal|h5|file|16|index.html?wvc1=1"
            }, i = document.getElementById("commonDownload"), j = {};
            if (i)try {
                j = JSON.parse(i.value), g = j.page, a = h[g]
            } catch (k) {
            }
            if (e.test(f) && !a && (a = f.replace(/http:\/\//, "").replace(/\//g, "|").replace(/https:\/\//, "")), !a)return;
            j.refid = b, j.qdid = getQdid(), c(a, j);
            try {
                sessionStorage.setItem("isLoadApp", 1)
            } catch (l) {
                $.cookie("isLoadApp", 1)
            }
        } catch (m) {
        }
    }

    function c(a, b) {
        var c = document.createElement("script");
        c.type = "text/javascript", c.src = "//m.17u.cn/app/la?mode=1&sUrl=" + encodeURIComponent(a) + "&tag=start^2^" + b.qdid + "^" + b.refid, document.getElementsByTagName("HEAD")[0].appendChild(c), c.onload = function () {
            document.getElementsByTagName("HEAD")[0].removeChild(c)
        }
    }

    $(function () {
        if (-1 === navigator.userAgent.toLowerCase().indexOf("tctravel")) {
            var c = getRefid(), d = $("#publicNotice").attr("data-channel"), e = navigator.userAgent.toLowerCase(), f = !1;
            if (document.getElementById("commonDownload"))try {
                f = JSON.parse(document.getElementById("commonDownload").value).page
            } catch (g) {
            }
            try {
                if ($("#hidddenBanner")[0])return;
                if (location.href.indexOf("//m.ly.com/guoneiyou/Zhuanti/TravelHost") > -1)return;
                if (-1 != shieldconfig.refids.indexOf(c))return;
                if (-1 != shieldconfig.channels.indexOf(d))return;
                for (var h = 0, i = shieldconfig.refidandchannels; h < i.length; h++)if (i[h].channel === d && i[h].refid.indexOf(c) > -1)return;
                if (f)for (var j = 0, k = shieldconfig.pagesrefids; j < k.length; j++) {
                    var l = k[j];
                    if (l.page === f && l.refid.indexOf(c) > -1)return
                }
                if (shieldconfig.refidua.swtich)for (var m, n = 0, o = shieldconfig.refidua.refid; n < o.length; n++) {
                    if (m = o[n], m.ua.indexOf("spider") > -1 || m.ua.indexOf("bot") > -1)return;
                    if (m.ua.length > 0) {
                        if (e.indexOf(m.ua) > -1 && m["switch"] && m.refid === c)return
                    } else if (m["switch"] && m.refid === c)return
                }
                a(), b()
            } catch (p) {
            }
        }
    })
}(), window.getopenid = function () {
    function a(a) {
        var b = new RegExp("(^|\\?|&)" + a + "=([^&]*)(\\s|&|$)", "i");
        return b.test(location.href) ? unescape(RegExp.$2.replace(/\+/g, " ")) : ""
    }

    var b = window.location.href.replace(/&/g, "%2526"), c = {
        versions: function () {
            var a = navigator.userAgent;
            return {mobile: !!a.match(/AppleWebKit.*Mobile.*/)}
        }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (c.versions.mobile) {
        var d = navigator.userAgent.toLowerCase();
        if (d.indexOf("micromessenger") > 0) {
            var e = localStorage.getItem("mOpenid");
            if (e)return e;
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=http://wx.17u.cn/flight/getopenid.html?url=" + b + "&showwxpaytitle=1&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            var f = a("code");
            if (void 0 != f && f.length > 0)return window.localStorage && localStorage.setItem("mOpenid", f), f
        }
    }
}, window.addEventListener("load", function () {
    if ($("#fish-nav").length > 0 && $("#fish-nav").hasClass("fish-nav") && "" != ($("#fish-nav").attr("data-channel") || "")) {
        var a = document.getElementsByTagName("head")[0], b = document.createElement("link");
        b.setAttribute("rel", "stylesheet"), b.setAttribute("type", "text/css"), b.setAttribute("href", "//css.40017.cn/touch/c/xxTrip/xxtripheader/tripheader.0.0.1.css?v=20160136"), a.appendChild(b);
        var c = document.createElement("script");
        c.type = "text/javascript", c.src = "//js.40017.cn/touch/c/xxTrip/xxtripheader/header_xxtrip.0.0.5.js?v=20160425051", a.appendChild(c)
    }
}, !1), function () {
    if ("21591781" != getRefid() && "165485401" != getRefid() && /hotel/g.test(location.href) && !/hotellist/g.test(location.href)) {
        var a, b = new Date;
        try {
            a = localStorage.getItem("hoteltime") || "0"
        } catch (c) {
            a = "0"
        }
        if (parseInt(a) < b.getTime()) {
            var d = '<div class="hoteltag" style="position: fixed;background: rgba(0,0,0,.6);z-index: 2;width: 100%;top: 0;height: 100%"><div style="position: fixed;top: 50%;left: 50%;margin-left: -50%;margin-top: -50%;z-index: 5"><b style="position:absolute;top:0;display: block;float: right;width: 60%;height: 20%;left: 50%;"></b><img src="//img1.40017.cn/touch/c/hotelpacks/201607210101.png" alt="" width="100%" height="auto" style="max-width: 640px;"><a href="/redpackage/HotelPacket" style="position:absolute;bottom:0;display: block;width: 100%;height: 25%"></a></div></div>';
            $("body").append(d), $(".hoteltag b,.hoteltag a").click(function () {
                $(".hoteltag").remove();
                try {
                    localStorage.setItem("hoteltime", b.setHours(b.getHours() + 12))
                } catch (a) {
                }
            })
        }
        $(".hoteltag b").click(function () {
            _tcTraObj._tcTrackEvent("hotel10656", "click", "close", "1")
        }), $(".hoteltag a").click(function () {
            _tcTraObj._tcTrackEvent("hotel10656", "click", "take", "2")
        })
    }
}();