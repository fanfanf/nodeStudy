// var express = require('express');
// var router = express.Router();

/* GET home page. */
// 生成一个路由实例用来捕获访问主页的GET请求
// 当访问主页时，调用ejs模板引擎，来渲染index.ejs模板文件（即将title变量全部替换为字符串Express）,生成静态页面并显示在浏览器中
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// 导出这个路由并在app.js中通过app.use('/', routes); 加载。这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中
// module.exports = router;
// 通过module.exports 导出了一个函数接口，在 app.js 中通过 require 加载了 index.js 然后通过routes(app) 调用了 index.js 导出的函数。
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });
}
