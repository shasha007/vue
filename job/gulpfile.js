//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    //less处理
    less = require('gulp-less'),
    //压缩js
    uglify = require('gulp-uglify'),
    //css前缀修改
    autoprefixer = require('gulp-autoprefixer'),
    //文件合并
    concat = require('gulp-concat'),
    //压缩css
    cssmin = require('gulp-minify-css'),
    //css 添加版本号
    cssver = require('gulp-make-css-url-version'),
    //缓存
    //cache = require('gulp-cache'),
    //动态刷新
    livereload = require('gulp-livereload'),
    //版本控制
    rev = require('gulp-rev-append'),
     //压缩html
     htmlmin = require('gulp-htmlmin');

gulp.task('less', function() {
    gulp.src('src/common/less/*.less')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >=7', '> 5%'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(less())
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            //keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('src/common/css'))
        .pipe(livereload());
});

gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('cssmin', function () {
    gulp.src('src/css/*.css')

        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >=7', '> 5%'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))

        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            //keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('dist/css'));
});

//合并js
gulp.task('cjs', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('function.js'))//合并后的文件名

        .pipe(gulp.dest('dist/js'));
});

//合并三个css
gulp.task('ccss3', function () {
    gulp.src(['src/css/style.css','src/css/style 1.css','src/css/style 2.css'])
        .pipe(concat('style.css'))//合并后的文件名
        .pipe(gulp.dest('dist/css'));
});

//合并除reset之外的css
gulp.task('ccss', function () {
    gulp.src(['src/css/*.css','!src/css/reset.css'])

        .pipe(concat('style.css'))//合并后的文件名

        .pipe(gulp.dest('dist/css'));
});
//3合1
gulp.task('css3', function () {
    gulp.src(['src/css/*.css','!src/css/reset.css'])

        .pipe(concat('style.css'))//合并后的文件名
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >=7', '> 5%'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))

        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            //keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('dist/css'));
});


//修改css前缀
gulp.task('cssfix', function () {
         gulp.src('src/css/*.css')
             //先修改后缀 在压缩
             .pipe(autoprefixer({
                 browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >=7', '> 5%'],
                 cascade: true, //是否美化属性值 默认：true
                 remove: true //是否去掉不必要的前缀 默认：true
             }))
        //.pipe(gulp.dest('dist/css'));
             .pipe(gulp.dest('src/css2'));
});

//给所有html中引入的文件添加版本号
gulp.task('rev', function () {
    gulp.src('src/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
});
//压缩html
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(rev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});
//监控
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/common/less/*.less', ['less']);
});
gulp.task('default', ['jsmin']); //定义默认任务


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径