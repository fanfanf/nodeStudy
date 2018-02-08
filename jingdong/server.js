// var http = require('http');

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');
// // 另外一种写法
// var http = require('http')
// function onRequest(request, response) {
//     response.writeHead(200, {'Content-Type': 'text/plain'})
//     response.write('Hello World')
//     response.end()
// }
// http.createServer(onRequest).listen(8888)

// 给 onRequest() 函数加上一些逻辑，用来找出浏览器请求的 URL 路径：
// var http = require('http')
// var url = require('url')
// function start(route) {
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname
//         console.log(url.parse(request.url))
//         console.log(pathname)
//         response.writeHead(200, { 'Content-Type': 'text/plain' })
//         response.write('Hello World')
//         response.end()
//     }
//     http.createServer(onRequest).listen(8888)
//     console.log('Server has started')
// }
// exports.start = start

// Node.js GET/POST请求
// var http = require('http')
// var url = require('url')
// var util = require('util')
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
//     // 获取GET请求内容
//     // res.end(util.inspect(url.parse(req.url, true)))
//     // 解析url参数
//     var params = url.parse(req.url, true).query
//     res.write('网络名：' + params.name)
//     res.write('/n')
//     res.write('网络URL：' + params.url)
//     res.end()
// }).listen(3000)
// 获取 POST 请求内容
// var http = require('http');
// var querystring = require('querystring');

// var postHTML =
//     '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//     '<body>' +
//     '<form method="post">' +
//     '网站名： <input name="name"><br>' +
//     '网站 URL： <input name="url"><br>' +
//     '<input type="submit">' +
//     '</form>' +
//     '</body></html>';

// http.createServer(function (req, res) {
//     var body = "";
//     req.on('data', function (chunk) {
//         body += chunk;
//     });
//     req.on('end', function () {
//         // 解析参数
//         body = querystring.parse(body);
//         // 设置响应头部信息及编码
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

//         if (body.name && body.url) { // 输出提交的数据
//             res.write("网站名：" + body.name);
//             res.write("<br>");
//             res.write("网站 URL：" + body.url);
//         } else {  // 输出表单
//             res.write(postHTML);
//         }
//         res.end();
//     });
// }).listen(3000);

// 使用 Node 创建 Web 服务器
// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// // 创建服务器
// http.createServer( function (request, response) {  
//    // 解析请求，包括文件名
//    var pathname = url.parse(request.url).pathname;
//    // 输出请求的文件名
//    console.log("Request for " + pathname + " received.");
//    // 从文件系统中读取请求的文件内容
//    fs.readFile(pathname.substr(1), function (err, data) {
//       if (err) {
//          console.log(err);
//          // HTTP 状态码: 404 : NOT FOUND
//          // Content Type: text/plain
//          response.writeHead(404, {'Content-Type': 'text/html'});
//       }else{             
//          // HTTP 状态码: 200 : OK
//          // Content Type: text/plain
//          response.writeHead(200, {'Content-Type': 'text/html'});
//          // 响应文件内容
//          response.write(data.toString()); 
//       }
//       //  发送响应数据
//       response.end();
//    });   
// }).listen(8080);
// // 控制台会输出以下信息
// console.log('Server running at http://127.0.0.1:8080/');

// Node.js Express 框架 GET 方法
// var express = require('express');
// var app = express();

// app.use(express.static('public'));
// //  主页输出 "Hello World"
// app.get('/', function (req, res) {
//   console.log("主页 GET 请求");
//   res.send('主页 GET 请求');
// })
// app.get('/index.html', function (req, res) {
//   res.sendFile(__dirname + "/" + "index.html");
// })

// app.get('/process_get', function (req, res) {

//   // 输出 JSON 格式
//   var response = {
//     "first_name": req.query.first_name,
//     "last_name": req.query.last_name
//   };
//   res.end(JSON.stringify(response));
// })

// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })

// Node.js Express 框架 POST 方法
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// // 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(express.static('public'));
// app.get('/', function (req, res) {
//   console.log("主页 POST 请求");
//   res.send('主页 POST 请求');
// })
// app.get('/index.html', function (req, res) {
//   res.sendFile(__dirname + "/" + "index.html");
// })

// app.post('/process_post', urlencodedParser, function (req, res) {

//   // 输出 JSON 格式
//   var response = {
//     "first_name": req.body.first_name,
//     "last_name": req.body.last_name
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// })

// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })
// Node.js Express 框架 文件上传
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.post('/file_upload', function (req, res) {
   console.log(req.files[0]);  // 上传的文件信息
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})