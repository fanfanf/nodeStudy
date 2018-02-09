var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// 生成一个express实例app
var app = express();

app.set('port', process.env.PORT || 3000); // 环境变量要是设置了PORT，那么就用环境变量的PORT,否则就用3000
// 设置views文件夹存放视图文件的目录，即存放模板文件的地方，——dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置/public/favicon.ico为favicon图标。
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(bodyParser.json());
// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port,
    url: 'mongodb://localhost/blog'
  })
}));

// 通过routes(app) 调用了 index.js 导出的函数，实现到哪个路径下该显示什么内容
routes(app);

// 监听当前端口号
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 导出app实例供其他模块调用
module.exports = app;
