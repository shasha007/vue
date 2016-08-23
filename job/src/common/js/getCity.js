/**
 * Created by huqiwen on 16/8/15. 根据经纬度获取城市名
 */

var latitude;
var longitude;
var City = {};
var errorCode = -1;
function GetLocation() {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (p) {
            latitude = p.coords.latitude//纬度
            longitude = p.coords.longitude;
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(longitude, latitude);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                City = rs.addressComponents;
                alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            });
        }, function (error) {
            errorCode = error.code;
        }, {
            enableHighAccuracy: true,
        });
    } else {
        alert("浏览器不支持html5来获取地理位置信息");
    }
}