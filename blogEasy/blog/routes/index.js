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
var crypto = require('crypto'),
  saveUsers = require('../models/user.js');
module.exports = function (app) {
  // 首页
  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });
  // 注册页
  app.get('/reg', function (req, res) {
    res.render('reg', { title: '注册' });
  });
  app.post('/reg', function (req, res) {
    var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
      req.flash('error', '两次输入的密码不一致!');
      return res.redirect('/reg');//返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    //检查用户名是否已经存在 
    saveUsers([req.body], function (err, result) {
      req.session.user = req.body;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    })
    // newUser.get(newUser.name, function (err, user) {
    //   if (err) {
    //     req.flash('error', err);
    //     return res.redirect('/');
    //   }
    //   if (user) {
    //     req.flash('error', '用户已存在!');
    //     return res.redirect('/reg');//返回注册页
    //   }
    //   //如果不存在则新增用户
    //   newUser.save(function (err, user) {
    //     if (err) {
    //       req.flash('error', err);
    //       return res.redirect('/reg');//注册失败返回主册页
    //     }
    //     req.session.user = newUser;//用户信息存入 session
    //     req.flash('success', '注册成功!');
    //     res.redirect('/');//注册成功后返回主页
    //   });
    // });
  });
  // 登录页
  app.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
  });
  app.post('/login', function (req, res) {
  });
  // 发表页
  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });
  app.post('/post', function (req, res) {
  });
  app.get('/logout', function (req, res) {
  });
}
