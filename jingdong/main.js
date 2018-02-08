// 读取文件内容
// var fs = require("fs");
// fs.readFile('input.txt', function (err, data) {
//   // 读取input.txt文件出错
//    if (err){
//       console.log(err.stack);
//       return;
//    }
//    // 读取文件未出错，正确读取文件内容
//    console.log(data.toString());
// });
// console.log("程序执行完毕");

// EventEmitter实例
// eventEmitter.on()与eventEmitter.addListener()没有区别，且一个事件可以绑定多个回调函数；
// 若事件队列中出现一个未绑定事件则触发error事件，若未绑定 error事件则程序抛出异常结束执行
// var events = require('events');
// var eventEmitter = new events.EventEmitter();
// // 监听器 #1
// var listener1 = function listener1() {
//   console.log('监听器 listener1 执行。');
// }
// // 监听器 #2
// var listener2 = function listener2() {
//   console.log('监听器 listener2 执行。');
// }
// // 绑定 connection 事件，处理函数为 listener1 
// eventEmitter.addListener('connection', listener1);
// // 绑定 connection 事件，处理函数为 listener2
// eventEmitter.on('connection', listener2);
// var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
// // 处理 connection 事件 
// eventEmitter.emit('connection');
// // 移除监绑定的 listener1 函数
// eventEmitter.removeListener('connection', listener1);
// console.log("listener1 不再受监听。");
// // 触发连接事件
// eventEmitter.emit('connection');
// eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
// console.log("程序执行完毕。");

// Buffer(缓冲区)
// const buf = Buffer.from('runoob', 'ascii');
// // 输出 72756e6f6f62
// console.log(buf.toString('hex'));
// // 输出 cnVub29i
// console.log(buf.toString('base64'));
// 写入缓冲区
// buf = Buffer.alloc(256)
// var len = buf.write('123')
// console.log(len, '实际写入的大小')
// 从缓冲区读取数据
// console.log(buf.toString('ascii'))
// 将 Buffer 转换为 JSON 对象
// buf = Buffer.from('123');
// console.log(buf.toJSON(), '将 Buffer 转换为 JSON 对象')
// 缓冲区合并
// var buf1 = Buffer.from('菜鸟教程');
// var buf2 = Buffer.from('www.runoob.com');
// console.log(Buffer.concat([buf1, buf2]).toString())
// 缓冲区比较
// var compare = buf1.compare(buf2)
// console.log(compare, '缓冲区比较')
// 拷贝缓冲区
// var buf1 = Buffer.from('abcfgre')
// var buf2 = Buffer.from('de')
// 将buf2插入到buf1指定位置上
// buf2.copy(buf1, 1)
// console.log(buf1.toString())
// 缓冲区裁剪
// var buf1 = Buffer.from('abced')
// buf2 = buf1.slice(0, 2)
// console.log(buf2.toString())

// Node.js Stream(流)
// 从流中读取数据
// var fs = require('fs')
// var data = ''
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt')
// // 设置编码为utf-8
// readerStream.setEncoding('utf-8')
// // 处理流事件-->data, end, error, finish
// readerStream.on('data', function (chunk) {
//   data += chunk
// })
// readerStream.on('end', function () {
//   console.log(data)
// })
// readerStream.on('error', function (err) {
//   console.log(err.stack)
// })
// console.log('程序执行完毕')
// 写入流
// var fs = require("fs");
// var data = '写入流';
// // 创建一个可以写入的流，写入到文件output.txt中
// var writerStream = fs.createWriteStream('output.txt')
// // 使用 utf8 编码写入数据
// writerStream.write(data, 'UTF8');
// // 标记文件末尾
// writerStream.end()
// // 处理流事件
// writerStream.on('finish', function () {
//   console.log('写入完成')
// })
// writerStream.on('error', function (err) {
//   console.log(err.stack)
// })
// console.log('程序执行完毕')
// 管道流
// var fs = require('fs')
// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt')
// // 创建一个可写流
// var writeStream = fs.createWriteStream('output.txt')
// // 管道读写操作
// // 读取input.txt文件内容，并将内容写入到output.txt
// readerStream.pipe(writeStream)
// console.log('程序执行完毕')
// 压缩文件并读取二进制文件
// var fs = require('fs')
// var data = ''
// var readerStream = fs.createReadStream('input.txt.gz')
// readerStream.on('data', function (chunk) {
//   data += chunk
// })
// readerStream.on('end', function () {
//   console.log(data)
//   const buf = Buffer.from(data, 'ascii')
//   console.log(buf.toString('hex'))
// })
// readerStream.on('error', function (er) {
//   console.log(err.stack)
// })
// console.log('程序执行完毕')

// 全局对象
// console.log(__filename, '输出文件所在位置的绝对路径')
// console.log( __dirname, '表示当前执行脚本所在的目录。');
// function printHello(){
//    console.log( "Hello, World!");
// }
// // 两秒后执行以上函数
// setTimeout(printHello, 2000);
// function printHello(){
//    console.log( "Hello, World!");
// }
// // 两秒后执行以上函数
// var t = setInterval(printHello, 2000);
// // 清除定时器
// clearTimeout(t);
// process
// process.on('exit', function (code) {
//   // 以下代码永远不会执行
//   setTimeout(function (code) {
//     console.log('该代码不会执行')
//   }, 0)
//   console.log('退出码为', code)
// })
// console.log('程序执行结束')
// 输出到终端
// process.stdout.write("Hello World!" + "\n");
// // 通过参数读取
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
// // 获取执行路径
// console.log(process.execPath);
// // 平台信息
// console.log(process.platform);
// 输出当前目录
// console.log('当前目录: ' + process.cwd());
// // 输出当前版本
// console.log('当前版本: ' + process.version);
// // 输出内存使用情况
// console.log(process.memoryUsage());

// Node.js 常用工具
// util.inherits
var util = require('util')
function Base() {
  this.name = 'base'
  this.base = '1991'
  this.sayHello = function () {
    console.log('Hello' + this.name)
  }
}
Base.prototype.showName = function () {
  console.log(this.name)
}
function Sub() {
  this.name = 'sub'
}
// // Sub继承了Base
// util.inherits(Sub, Base)
// var objBase = new Base()
// objBase.showName()
// objBase.sayHello()
// console.log(objBase)
// var objSub = new Sub()
// objSub.showName()
// // objSub.sayHello()
// console.log(objSub)
// // Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
// util.inspect
// var util = require('util'); 
// function Person() { 
//     this.name = 'byvoid'; 
//     this.toString = function() { 
//     return this.name; 
//     }; 
// } 
// var obj = new Person(); 
// console.log(util.inspect(obj)); 
// console.log(util.inspect(obj, true)); 
// util.isArray(object) 如果给定的参数 "object" 是一个数组返回true，否则返回false。
var util = require('util');
util.isArray([])
// true
util.isArray(new Array)
// true
util.isArray({})
// false
// util.isRegExp(object) 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
var util = require('util');
util.isRegExp(/some regexp/)
// true
util.isRegExp(new RegExp('another regexp'))
// true
util.isRegExp({})
// false
// util.isDate(object) 如果给定的参数 "object" 是一个日期返回true，否则返回false。
var util = require('util');
util.isDate(new Date())
// true
util.isDate(Date())
// false (without 'new' returns a String)
util.isDate({})
// false
// util.isError(object) 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
var util = require('util');

util.isError(new Error())
// true
util.isError(new TypeError())
// true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false
