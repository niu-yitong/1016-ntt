//引入模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var listJson = require('./mock/list.json');

//启服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            host: "localhost",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end("");
                    return false;
                }
                if (pathname === "/api/listJson") {
                    res.end(JSON.stringify({ code: 1, data: listJson }));
                } else if (pathname === "/api/addlist") {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    })
                    req.on('end', function() {
                        console.log(arr);
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        console.log(params);
                        var obj = {};
                        obj.tit = params.tit;
                        obj.content = params.content;
                        console.log(obj.tit);
                        listJson.push(obj);
                        fs.writeFileSync("./mock/list.json", JSON.stringify(listJson));
                        res.end(JSON.stringify({ code: 1, msg: "发布成功" }));
                    })

                } else {
                    pathname = pathname === "/" ? "/page/detail.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})
gulp.task("devCss", function() {
    return gulp.src('./src//scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browers: ["last 2 versions", "Android>=4.0"]
        }))
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devCss'));
})
gulp.task('dev', gulp.series('devCss', 'server', 'watch'));