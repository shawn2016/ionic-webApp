var path = require( 'path');
var fs = require( 'fs');
var yargs = require( 'yargs').argv;
var gulp = require( 'gulp');
var less = require( 'gulp-less');//less编译
var header = require( 'gulp-header');//style-header说明
var imagemin = require( 'gulp-imagemin');//图片压缩
var htmlmin = require( 'gulp-htmlmin');//页面压缩
var tap = require( 'gulp-tap');
var nano = require( 'gulp-cssnano');
var postcss = require( 'gulp-postcss');
var autoprefixer = require( 'autoprefixer');
var  gulpCopy = require( 'gulp-file-copy');//复制文件
var rename = require( 'gulp-rename');//文件夹重命名
var uglify = require( 'gulp-uglify'); //js压缩
var clean = require( 'gulp-clean'); //清空文件夹
var concat = require( 'gulp-concat'); //合并文件
var sourcemaps = require( 'gulp-sourcemaps');
var browserSync = require( 'browser-sync');//实时刷新浏览器
var pkg = require( './package.json');

var option = {
     base: 'src'
};
var dist = __dirname + '/dist';

//less 处理
gulp.task('build:style', function() {
      var banner = [
            '/*!',
            ' * theme_wapper v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' * Copyright <%= new Date().getFullYear() %> shawn, Inc.',
            ' * Licensed under the <%= pkg.license %> license' ,
            ' */',
            ''
      ].join('\n');
     gulp.src( 'src/style/theme_wapper.less' , option)
           .pipe(sourcemaps.init())
           .pipe(less().on( 'error', function( e) {
                 console.error(e.message);
                this.emit( 'end');
           }))
           .pipe(postcss([autoprefixer]))
           .pipe(header(banner, {
                pkg: pkg
           }))
           .pipe(sourcemaps.write())

     .pipe(gulp.dest(dist))
           .pipe(browserSync.reload({
                stream: true
            }))
           .pipe(nano({
                zindex: false
            }))
           .pipe(rename( function(path) {
                path.basename += '.min';
           }))
           .pipe(gulp.dest(dist));
});

// 图片处理
gulp.task('build:images', function() {
      var imgSrc = './src/images/**/*',
           imgDst = './dist/images';
     gulp.src(imgSrc)
           .pipe(imagemin())
           .pipe(gulp.dest(imgDst))
           .pipe(browserSync.reload({
                stream: true
            }));
})

//压缩controllers
gulp.task('build:controllers', function() {
     gulp.src( 'src/scripts/controller/**/*.js' )
           .pipe(concat( 'controllers.js')) //合并所有js到main.js
            .pipe(gulp.dest('dist/scripts/controller')) //输出main.js到文件夹
            .pipe(rename({
                suffix: '.min'
            })) //rename压缩后的文件名
            .pipe(uglify()) //压缩
            .pipe(gulp.dest('dist/scripts/controller')); //输出
});

// HTML处理
gulp.task('build:html', function() {
      var options = {
           removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
      };
     gulp.src( 'src/views/**/*.html')
           .pipe(htmlmin(options))
           .pipe(gulp.dest( 'dist/views'));
});

//统计所有任务
gulp.task('release', [ 'build:style', 'build:html' , 'build:controllers' , 'build:images']);

//监听所有任务
gulp.task('watch', [ 'release'], function() {
     gulp.watch( 'src/style/**/*', ['build:style' ]);
     gulp.watch( 'src/scripts/controller/**/*.js' , ['build:controllers' ]);
     gulp.watch( 'src/images/**/*.?(png|jpg|gif|js)' , ['build:images' ]);
     gulp.watch( 'src/views/**/*.html', ['build:html' ]);
});
//复制文件
  gulp.task('copy' , function() {
    var start = './src/scripts/plugin'
    gulp.src(start)
      .pipe(gulpCopy( './dist', {
        start: start
      }))

  });
// 清空图片、样式、js
gulp.task('clean', function() {
     gulp.src([ './dist/images','./dist/style' ,'./dist/views', './dist/scripts'], {
                read: false
            })
           .pipe(clean());
});
//启动服务
gulp.task('server', function() {
     yargs.p = yargs.p || 8080;
     browserSync.init({
           server: {
                baseDir: "./dist/views"
            },
           ui: {
                port: yargs.p + 1,
                weinre: {
                     port: yargs.p + 2
                 }
           },
           port: yargs.p,
           startPath: ''
      });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', [ 'release'], function() {
      if (yargs.s) {
           gulp.start( 'server');
     }

      if (yargs.w) {
           gulp.start( 'watch');
     }
});
