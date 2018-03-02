var gulp = require("gulp");
var webserver = require("gulp-webserver");
var url =require("url");
var fs =require("fs");

var sass = require('gulp-sass');
//css压缩
var minifyCSS =require("gulp-minify-css");
//丑化  
var uglify =require("gulp-uglify");
//打包

var webpack = require("gulp-webpack");
//命名
var named =require("vinyl-named");
//版本模块
var rev= require("gulp-rev");
//版本控制模块
var revCollector =require("gulp-rev-collector");
//监控模块
var watch =require("gulp-watch");
//队列模块
var sequence =require("gulp-watch-sequence");
//压缩html
var minifyHTML =require("gulp-minify-html")

gulp.task('webserver', function() {
  gulp.src('WWW')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
     // port:9999  s设置端口
      //实现我们的Mock数据原理是
      //1.用户在浏览器里输入URL地址，比如http://laoclhost/queryList
      //2.系统通过判断，获取到url地址参数即queryList
      //3.通过url的地址参数queryList，去查找相对应得json文件，比如说queryList.json
      //4.读取（read）queryList.json文件并将这个文件内容写到（write）我们的浏览器上
      middleware:function (req,res,next){
      	var urlObj=url.parse(req.url,true),
      	    method =req.method;
      	console.log(urlObj);
      	switch(urlObj.pathname){
      		case'/api/skill':
      		//设置的头信息
      		res.setHeader("Content-type","application/json");
      		//读取本地的json文件，并将读的信息内容设置编码，然后将内容转成data数据返回
      		fs.readFile("mock/skill.json","utf-8",function (err,data){
      			//res的全称是response，end是结束的意思，就是把我们的data数据渲染到浏览器上
      			res.end(data);
      		});
      		return;
      		case'/api/project':
      		//设置的头信息
      		res.setHeader("Content-type","application/json");	
      		fs.readFile("mock/project.json","utf-8",function (err,data){      			
      			res.end(data);
      		});
      		return;
            case'/api/product':
          //设置的头信息
          res.setHeader("Content-type","application/json"); 
          fs.readFile("mock/product.json","utf-8",function (err,data){            
            res.end(data);
          });
          return;
      		case'/api/work':
      		//设置的头信息
      		res.setHeader("Content-type","application/json");	
      		fs.readFile("mock/work.json","utf-8",function (err,data){      			
      			res.end(data);
      		});
      		return;
      		default:;
      	}

      	next(); //这行代码非常重要，next解决的是循环遍历的操作
      }//end middleware



    }));
});


gulp.task("copy-index",function () {
	return gulp.src("./src/index.html")
	.pipe(gulp.dest("./WWW"));
})


gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('WWW/css'));
});
gulp.task("images",function () {
  return gulp.src("./src/images/**")
  .pipe(gulp.dest("WWW/images"))
})
gulp.task("iconfont",function () {
  return gulp.src("./src/styles/iconfont/**")
  .pipe(gulp.dest("WWW/iconfont"))
})
//js模块化管理工具
var jsFiles=["src/scripts/index.js"];

//打包js
gulp.task("packjs",function () {
  return gulp.src(jsFiles)
  .pipe(named())
  .pipe(webpack())
  .pipe(uglify())
  .pipe(gulp.dest("WWW/js"))
})
// 版本控制
var cssDistFiles= ["WWW/css/style.css"];
var jsDistFiles =["WWW/js/index.js"];

//css的ver 控制
gulp.task("verCss",function () {
  return gulp.src(cssDistFiles)
  //生成一个版本
  .pipe(rev())
  //复制到指定文件目录
  .pipe(gulp.dest("WWW/css"))
  //生成版本对应的映射关系
  .pipe(rev.manifest())
  //将映射文件输出到指定的目录
  .pipe(gulp.dest('WWW/ver/css'))
})

//js的ver 控制
gulp.task("verJs",function () {
  return gulp.src(jsDistFiles)
  //生成一个版本
  .pipe(rev())
  //复制到指定文件目录
  .pipe(gulp.dest("WWW/js"))
  //生成版本对应的映射关系
  .pipe(rev.manifest())
  //将映射文件输出到指定的目录
  .pipe(gulp.dest('WWW/ver/js'))
})
// 对html文件的版本内容的替换
gulp.task("html",function () {
  return gulp.src(["WWW/ver/**/*json","WWW/*.html"])
        .pipe(revCollector({replaceReved:true}))
        .pipe(gulp.dest("WWW/"))
})

// 设置监控
  gulp.task("watch",function () {
    gulp.watch("./src/index.html",["copy-index"]);
    gulp.watch("./src/styles/iconfont/**",["iconfont"]);
    var queue = sequence(300);
    watch("src/scripts/**/*.js",{
      name:"JS",
      emitOnGlob:false,
    },queue.getHandler("packjs","verJs","html"));
    
    watch("src/styles/**/*.*",{
      name:"CSS",
      emitOnGlob:false,
    },queue.getHandler("sass","verCss","html"));

    })
    //s设置默认任务
    gulp.task("default",["webserver","watch"])


   