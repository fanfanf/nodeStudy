<!-- TITLE: node入门一 -->
<!-- SUBTITLE: node入门一 -->
express框架介绍：http://ourjs.com/detail/56b2a6f088feaf2d031d2468

# 什么是node
1.Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，就好比JDK是java的运行环境
2.Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。
3.Node.js 的包管理器为npm，是全球最大的开源库生态系统。 
4.通俗理解什么是node:
a.最传统的web：浏览器给网站发请求的过程一直没怎么变过。当浏览器给网站发了请求。服务器收到了请求，然后开始搜寻被请求的资源。如果有需要，服务器还会查询一下数据库，最后把响应结果传回浏览器。不过，在传统的web服务器中（比如Apache），每一个请求都会让服务器创建一个新的进程来处理这个请求。
b.后来有了Ajax：有了Ajax，我们就不用每次都请求一个完整的新页面了，取而代之的是，每次只请求需要的部分页面信息就可以了。这显然是一个进步。但是比如你要建一个FriendFeed这样的社交网站（类似人人网那样的刷朋友新鲜事的网站），你的好友会随时的推送新的状态，然后你的新鲜事会实时自动刷新。要达成这个需求，我们需要让用户一直与服务器保持一个有效连接。目前最简单的实现方法，就是让用户和服务器之间保持长轮询（long polling）。
（1）长轮询：HTTP请求不是持续的连接，你请求一次，服务器响应一次，然后就完了。长轮询是一种利用HTTP模拟持续连接的技巧。具体来说，只要页面载入了，不管你需不需要服务器给你响应信息，你都会给服务器发一个Ajax请求。这个请求不同于一般的Ajax请求，服务器不会直接给你返回信息，而是它要等着，直到服务器觉得该给你发信息了，它才会响应。比如，你的好友发了一条新鲜事，服务器就会把这个新鲜事当做响应发给你的浏览器，然后你的浏览器就刷新页面了。浏览器收到响应刷新完之后，再发送一条新的请求给服务器，这个请求依然不会立即被响应。于是就开始重复以上步骤。利用这个方法，可以让浏览器始终保持等待响应的状态。虽然以上过程依然只有非持续的Http参与，但是我们模拟出了一个看似持续的连接状态。
做对比：传统的服务器（比如Apache）。每次一个新用户连到你的网站上，你的服务器就得开一个连接。每个连接都需要占一个进程，这些进程大部分时间都是闲着的（比如等着你好友发新鲜事，等好友发完才给用户响应信息。或者等着数据库返回查询结果什么的）。虽然这些进程闲着，但是照样占用内存。这意味着，如果用户连接数的增长到一定规模，你服务器没准就要耗光内存直接瘫了。【阻塞模式导致】
c.什么是非阻塞和事件驱动？
你把非阻塞的服务器想象成一个loop循环，这个loop会一直跑下去。一个新请求来了，这个loop就接了这个请求，把这个请求传给其他的进程（比如传给一个搞数据库查询的进程），然后响应一个回调（callback）。完事了这loop就接着跑，接其他的请求。这样下来。服务器就不会像之前那样傻等着数据库返回结果了。【有吃饭的人来了,传菜员去点菜，给服务员说哪个桌点了什么菜，服务员告诉后厨，后厨开始做菜，传菜员继续去下一桌点菜，传菜员不用傻等着后端做好菜送到顾客那】；
如果数据库把结果返回来了，loop就把结果传回用户的浏览器，接着继续跑。在这种方式下，你的服务器的进程就不会闲着等着。从而在理论上说，同一时刻的数据库查询数量，以及用户的请求数量就没有限制了。服务器只在用户那边有事件发生的时候才响应，这就是事件驱动。【传菜员刚点完第三桌菜，后厨做好了第一桌点的菜，传菜员给第一桌送上菜，再继续去点第四桌的】
一个传菜员就是一个进程，因为这个传菜员一直在忙，没有闲着等待，可以节省饭店的资源。
Node:Node.js就比前者更妙了。Node.js的应用是通过javascript开发的，然后直接在Google的变态V8引擎上跑。用了Node.js，你就不用担心用户端的请求会在服务器里跑了一段能够造成阻塞的代码了。因为javascript本身就是事件驱动的脚本语言。你回想一下，在给前端写javascript的时候，更多时候你都是在搞事件处理和回调函数。javascript本身就是给事件处理量身定制的语言。
# 安装配置
- 以Node.js v4.4.3 LTS(长期支持版本)版本为例。
- Node.js安装包及源码下载地址为：https://nodejs.org/en/download/。
-检测PATH环境变量是否配置了Node.js，点击开始=》运行=》输入"cmd" => 输入命令"path",在环境变量中看是否包含了某安装路径:\node.js
-检查Node.js版本：node --version
# Node.js 创建第一个应用
- 使用 Node.js 时，我们不仅仅 在实现一个应用，同时还实现了整个 HTTP 服务器。事实上，我们的 Web 应用以及对应的 Web 服务器基本上是一样的。
-  Node.js 应用是由哪几部分组成的:
1.引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
2.创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3.接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。
- 创建 Node.js 应用
1.引入 required 模块:使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http:
var http = require("http");
2.创建服务器:使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。
实例如下，在你项目的根目录下创建一个叫 server.js 的文件，并写入以下代码：
var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);
以上代码我们完成了一个可以工作的 HTTP 服务器。
使用 node 命令执行以上的代码：
node server.js
Server running at http://127.0.0.1:8888/
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
接下来，打开浏览器访问 http://127.0.0.1:8888/，你会看到一个写着 "Hello World"的网页
分析Node.js 的 HTTP 服务器：
第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
接下来我们调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
# Node.js 回调函数
Node.js 异步编程的直接体现就是回调。
-异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。
回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
-了解了阻塞与非阻塞调用的不同
1.阻塞代码实例
创建一个文件 input.txt ，内容如下：
菜鸟教程官网地址：www.runoob.com
创建 main.js 文件, 代码如下：
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");
以上代码执行结果如下：
$ node main.js
菜鸟教程官网地址：www.runoob.com
程序执行结束!
2.非阻塞代码实例
创建一个文件 input.txt ，内容如下：
菜鸟教程官网地址：www.runoob.com
创建 main.js 文件, 代码如下：
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
以上代码执行结果如下：
$ node main.js
程序执行结束!
-Node.js 事件循环
1.Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
【什么是进程，什么是线程？】
进程：CPU执行任务的模块。
线程：模块中的最小单元。
例举：cpu比作我们每个人，到饭点吃饭了。可以点很多菜(cpu中的进程)：宫保鸡丁，鱼香肉丝，酸辣土豆丝。每样菜具体包含了哪些内容(cpu每个进程中的线程)：宫保鸡丁(详情：黄瓜、胡萝卜、鸡肉、花生米)。而详情构成了宫保鸡丁这道菜，吃了以后不饿。就可以干活了，cpu中的进程里的线程也是同理。当线程完成自己的内容将结果返回给进程，进程返回给cpu的时候。cpu就能处理日常需求。
单进程单线程：一盘炒苦瓜，里面只有苦瓜。
单进程多线程：一盘宫保鸡丁，里面有黄瓜、胡萝卜、鸡肉、花生米
2.Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
3.Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
4.Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
【我们写的js代码就像是一个国王，而nodejs给国王提供了很多仆人。早上，一个仆人叫醒了国王，问他有什么需要。国王给他一份清单，上面列举了所有需要完成的任务，然后睡回笼觉去了。当国王回去睡觉之后，仆人才离开国王，拿着清单，给其它的仆人一个个布置任务。仆人们各自忙各自的去了，直到完成了自己的任务后，才回来把结果禀告给国王。国王一次只召见一个人，其它的人就在外面排着队等着。国王处理完这个结果后，可能给他布置一个新的任务，或者就直接让他走了，然后再召见下一个人。等所有的结果都处理完了，国王就继续睡觉去了。直接有新的仆人完成任务后过来找他。这就是国王的幸福生活。】
这段话对于理解nodejs的运行方式非常重要。
在nodejs中，有一个队列（先进先出），保存着一个个待执行的任务。第一个任务就是我们写的js代码，它最先被执行（相当于国王给第一个仆人任务清单）。在它执行完以后（国王睡回笼觉去了），其它的任务才会加到队列上（相当于第一个仆人按照清单给其它仆人分配任务）。
（1）Node.js采用事件驱动程序：
通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");
（2）Node 应用程序是如何工作的？
在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。
-Node.js EventEmitter
所有这些产生事件的对象都是 events.EventEmitter 
events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。
EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
让我们以下面的例子解释这个过程：
(1)EventEmitter方法：
a. addListener(event, listener)
为指定事件添加一个监听器到监听器数组的尾部。
b. on(event, listener)
为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
server.on('connection', function (stream) {
  console.log('someone connected!');
});
c. once(event, listener)
为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
d. removeListener(event, listener)
移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
它接受两个参数，第一个是事件名称，第二个是回调函数名称。
var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
e. removeAllListeners([event])
移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
f.setMaxListeners(n)
默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
g. listeners(event)
返回指定事件的监听器数组。
h. emit(event, [arg1], [arg2], [...])
按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
(2)EventEmitter类方法：
	listenerCount(emitter, event)返回指定事件的监听器数量。
（3）事件:
 a. newListener该事件在添加新监听器时被触发。
      event - 字符串，事件名称
      listener - 处理事件函数
 b. removeListener从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。
    event - 字符串，事件名称
    listener - 处理事件函数
-error事件
当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃
-继承 EventEmitter
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

## Node.js Buffer(缓冲区)
JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
[在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。]
-Buffer 与字符编码
Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。
const buf = Buffer.from('runoob', 'ascii');
// 输出 72756e6f6f62
console.log(buf.toString('hex'));
// 输出 cnVub29i
console.log(buf.toString('base64'));
Node.js 目前支持的字符编码包括：
  ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
  utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
  utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
  ucs2 - utf16le 的别名。
  base64 - Base64 编码。
  latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
  binary - latin1 的别名。
  hex - 将每个字节编码为两个十六进制字符。
-创建 Buffer 类
Buffer 提供了以下 API 来创建 Buffer 类：
  Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
  Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
  Buffer.allocUnsafeSlow(size)
  Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
  Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
  Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
  Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
  // 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
-写入缓冲区
buf.write(string[, offset[, length]][, encoding])
参数：
string - 写入缓冲区的字符串
offset - 缓冲区开始写入的索引值，默认为 0 。
length - 写入的字节数，默认为 buffer.length
encoding - 使用的编码。默认为 'utf8' 。
返回值：
返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
实例：
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");
console.log("写入字节数 : "+  len);
-从缓冲区读取数据
buf.toString([encoding[, start[, end]]])
参数：
encoding - 使用的编码。默认为 'utf8' 。
start - 指定开始读取的索引位置，默认为 0。
end - 结束位置，默认为缓冲区的末尾。
返回值：
解码缓冲区数据并使用指定的编码返回字符串。
实例:
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
-将 Buffer 转换为 JSON 对象
buf.toJSON()
实例：
var buf = Buffer.from('www.runoob.com');
var json = buf.toJSON(buf);
console.log(json); // { type: 'Buffer',
  data: [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ] }
-缓冲区合并
Buffer.concat(list[, totalLength])
参数：
list - 用于合并的 Buffer 对象数组列表。
totalLength - 指定合并后Buffer对象的总长度。
返回值：
返回一个多个成员合并的新 Buffer 对象。
实例：
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
// buffer3 内容: 菜鸟教程 www.runoob.com
-缓冲区比较
buf.compare(otherBuffer);
参数：
otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
实例：
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
// ABC在ABCD之前
-拷贝缓冲区
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
参数：
targetBuffer - 要拷贝的 Buffer 对象。
targetStart - 数字, 可选, 默认: 0
sourceStart - 数字, 可选, 默认: 0
sourceEnd - 数字, 可选, 默认: buffer.length
返回值:
没有返回值。
实例:
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);
console.log(buf1.toString());
// abRUNOOBijkl
-缓冲区裁剪
buf.slice([start[, end]])
参数:
start - 数字, 可选, 默认: 0
end - 数字, 可选, 默认: buffer.length
返回值:
返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切
实例:
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
// buffer2 content: ru
-缓冲区长度
buf.length;
返回值:
返回 Buffer 对象所占据的内存长度
实例：
var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);
// buffer length: 14

# Node.js Stream(流)
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
Node.js，Stream 有四种流类型：
Readable - 可读操作。
Writable - 可写操作。
Duplex - 可读可写操作.
Transform - 操作被写入数据，然后读出结果。
所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
data - 当有数据可读时触发。
end - 没有更多的数据可读时触发。
error - 在接收和写入过程中发生错误时触发。
finish - 所有数据已被写入到底层系统时触发。
从流中读取数据实例：
var fs = require("fs");
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end',function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");
写入流
// var data = '要写入的数据'
创建可以写入的流，并写入一个文件
var writeStream = fs.createWriteStream('oupput.txt')
管道流
管道提供了一个输出流到输入流的机制，通常我们用于从一个流中获取数据并将数据传递到另一个流中
创建一个可读流
var readerStream = fs.createReadStream('input.txt');
创建一个可写流
var writerStream = fs.createWriteStream('output.txt');
通过管道进行读写操作
// 读取input.txt文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);
链式流
链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
## Node.js模块系统
为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统
模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
创建模块main.js
var hello = require('./hello')
hello.world
创建hello.js文件
exports.world = function() {
  console.log('hello world')
}
有时只想把一个对象封装到模块中
module.exports = funtion() {
  // ....
}
// hello.js
function Hello() {
  var name;
  this.setName = function(thyName) {
    name = thyName
  }
  this.sayHello = function() {
    console.log('Hello' + name)
  }
}
module.exports = Hello

//main.js 
var Hello = require('./hello'); 
hello = new Hello(); 
hello.setName('BYVoid'); 
hello.sayHello(); 
## Node.js 函数
在JavaScript中，一个函数可以作为另一个函数的参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。
## Node.js 路由（暂未看懂）
## Node.js 全局对象
在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
在最外层定义的变量；
全局对象的属性；
隐式定义的变量（未定义直接赋值的变量）。
当定义一个全局变量时，这个变量同事也会成为全局对象的属性，但是在Node.js中不可能在最外层定义变量，因为多有用户代码都是属于当前模块的，而模块本身不是最外层上下文
__filename：表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
__dirname:表示当前执行脚本所在的目录。
setTimeout(cb, ms):只执行一次指定函数。
返回一个代表定时器的句柄值。
clearTimeout(t):全局函数用于停止一个之前通过 setTimeout() 创建的定时器
setInterval(cb, ms):setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
console: console 对象的方法,常用console.log([data][, ...])
process：它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道【属性和方法较多】
## Node.js 常用工具
util是一个Node.js核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
util.inherits：
util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
JavaScript 的面向对象特性是基于原型的，但是没有提供对象集成的语言级别特别，而是通过原型复制来实现的
util.inspect:
util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
showHidden: 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
depth :表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了toString 方法也不会调用。
util.isArray(object):
如果给定的参数 "object" 是一个数组返回true，否则返回false。
util.isRegExp(object):如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
util.isDate(object):如果给定的参数 "object" 是一个日期返回true，否则返回false。
util.isError(object):如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
## Node.js 文件系统
 Node 导入文件系统模块(fs)语法:
 var fs = require("fs")
异步和同步:
Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
打开文件（异步模式）：
fs.open(path, flags[, mode], callback)
获取文件信息：
fs.stat(path, callback)
写入文件：
fs.writeFile(file, data[, options], callback)
读取文件:
fs.read(fd, buffer, offset, length, position, callback)
关闭文件:
fs.close(fd, callback)
截取文件:
fs.ftruncate(fd, len, callback)
删除文件：
fs.unlink(path, callback)
创建目录：
fs.mkdir(path[, mode], callback)
读取目录：
fs.readdir(path, callback)
删除目录：
fs.rmdir(path, callback)
## Node.js GET/POST请求
获取GET请求内容：由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
node.js 中 url 模块中的 parse 函数提供了这个功能
获取GET请求内容：util.inspect(url.parse(req.url, true))
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=pl&url=www.pl.com',
  query: { name: 'pl', url: 'www.pl.com' },
  pathname: '/user',
  path: '/user?name=pl&url=www.pl.com',
  href: '/user?name=pl&url=www.pl.com' }
获取 POST 请求内容：
POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
## Node.js 工具模块
常用的几种模块：
OS 模块：提供基本的系统操作函数
Path 模块：提供了处理和转换文件路径的工具
Net 模块：用于底层的网络通信。提供了服务端和客户端的的操作
DNS 模块：用于解析域名
Domain 模块：简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的
## Node.js Web 模块
什么是 Web 服务器？
目前最主流的三个Web服务器是Apache、Nginx、IIS。
Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
Data - 数据层，一般由数据库组成。
使用 Node 创建 Web 服务器：
Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块：
var http = require('http');
使用 Node 创建 Web 服务器:
server.js
使用 Node 创建 Web 客户端:
client.js
## Node.js Express 框架
Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
使用 Express 可以快速地搭建一个完整功能的网站。
Express 框架核心特性：
可以设置中间件来响应 HTTP 请求;
定义了路由表用于执行不同的 HTTP 请求动作;
可以通过向模板传递参数来动态渲染 HTML 页面;
安装 Express:
$ cnpm install express --save
一下几个重要的模块也需要一起安装：
$ cnpm install body-parser --save
$ cnpm install cookie-parser --save
$ cnpm install multer --save
安装完后，我们可以查看下 express 使用的版本号：
$ cnpm list express
请求和响应：
Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
app.get('/', function (req, res) {
   // --
})
req.query： 处理 get 请求，获取 get 请求参数；
req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数；
req.body： 处理 post 请求，获取 post 请求体；
req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query；
Request 对象：request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性
Response 对象：response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。
路由：
路由决定了由谁(指定脚本)去响应客户端请求。
在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。
静态文件:
Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
app.use(express.static('public')); // public为存放静态文件的目录
GET方法和POST方法
文件上传
Cookie 管理: 我们可以使用中间件向 Node.js 服务器发送 cookie 信息
express框架详解（代码每句都有注释）
什么是模板引擎？
模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成 HTML 页面的工具。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端，因此客户端甚至无法判断页面是否是模板引擎生成的。有时候模板引擎也可以运行在客户端，即浏览器中，典型的代表就是 XSLT，它以 XML 为输入，在客户端生成 HTML 页面。但是由于浏览器兼容性问题，XSLT 并不是很流行。目前的主流还是由服务器运行模板引擎。
在 MVC 架构中，模板引擎包含在服务器端。控制器得到用户请求后，从模型获取数据，调用模板引擎。模板引擎以数据和页面模板为输入，生成 HTML 页面，然后返回给控制器，由控制器交回客户端。
如果express 中的路由控制方法相当于 MVC 中的控制器的话，那模板引擎就相当于 MVC 中的视图。
ejs 是模板引擎的一种，它使用起来十分简单，而且与 express 集成良好。
如何学习node.js
学习node.js最重要的不是仅仅学些框架和工具，而是学习node.js本身，学习它和os交互的api，学习它的开发理念，新手可以先从模仿开始，用着宽假，工具什么的然后自己写出一样的画着简化版的出来
在node.js开发的半壁江山expredd，其实就是封装了一下常用的http api，然后提供了一个中间件风格的脚手架让人可以很方便的写插件

```js
/** ************ 定义模式phoneSchema **************/
const phoneSchema = mongoose.Schema({
  device: String, // 设备名称
  isSmart: Boolean, // 是否为智能手机
  releaseTime: Date, // 发布时间
  price: Number, // 售价
  apps: [{name: String}], // 手机中安装的App名称，是数组
  manufacturer: { // 手机厂商
    name: String, // 厂商名称
    country: String // 厂商国籍
  }
})
```
### 实例方法
-Model实例方法只能被Model的实例调用，不能被Model直接调用，否则会抛出 is not a function 异常
```js
// 为Model的实例添加自定义方法（将自定义的方法添加到Schema.methods即可）
phoneSchema.methods.printBrief = function () {
  // console.log(this)
  console.log('手机+价格' + this.device, '￥' + this.price)
}

let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 调用实例方法
  // newAccount.printBrief()
```
### 静态方法
```js
// 为Model添加静态方法
phoneSchema.statics.printCount = function () {
  // 进行计数
  this.count({}, (err, count) => {
    console.log('----printCount()-----------')
    if (err) {
      console.log(err)
    } else {
      console.log('phone count=' + count)
    }
  })
}

// 调用静态方法
// models.Login.printCount()
```
# 增删改查（CURD）

## 增加
```js
// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  console.log(req.body)
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  // 用Model创建Entity
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 保存newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})
```
## 删除
```js
// 删除账号接口
router.post('/api/login/deleteAccount', (req, res) => {
  console.log(req.body.account)
  if (req.body.account === 'admin') {
    return
  }
  // 调用remove方法
  models.Login.remove({account: req.body.account}, (err, data) => {
    console.log('执行删除')
    if (err) {
      res.send(err)
    } else {
      res.send('deleteAccount successed')
    }
  })
})
```
## 修改
```js
// 修改账号接口 update
router.post('/api/login/updateAccount', (req, res) => {
  console.log(req.body.account)
  console.log(req.body.editorAccount)
  var conditions = {account: req.body.account}
  var update = {$set: {account: req.body.editorAccount}}
  var options = {upsert: true}
  console.log(conditions)
  console.log(update)
  console.log(options)
  models.Login.update(conditions, update, options, (err, data) => {
    console.log('执行修改')
    if (err) {
      res.send(err)
    } else {
      res.send('updateAccount successed')
    }
  })
})
```
## 查询
### 直接查询
在查询时带有回调函数的，称之为直接查询，查询的条件往往通过API来设定
```js
// 通过模型去查找数据库
  models.Login.find({account: req.body.account}, (err, data) => {
    // console.log('获取登录的用户数据')
    // console.log(!data)
    if (err) {
      res.send(err)
    } if (!data) {
      res.send(data)
    } else {
      // 匹配密码
      // if (req.body.account === undefined) {
      //   res.send(data)
      //   return
      // }
      // console.log(data)
      if (data.length === 0) {
        res.send({ret_code: 65535, ret_msg: '用户不存在'})
        return
      }
      // console.log(data)
      // console.log(data.account, req.body.account)
      // console.log(data.password, req.body.password)
      // if (data.account === req.body.account && data.password === req.body.password) {
      //   console.log('用户名和密码已经匹配')
      // } else {
      //   console.log('用户名或密码不正确')
      // }
      // console.log(data[0].password)
      if (req.body.password !== data[0].password) {
        res.send({ret_code: 404, ret_msg: '密码错误'})
      } else {
        console.log('用户名和密码已经匹配')
        // session start
        req.session.regenerate(function (err) {
          if (err) {
            res.send({ret_code: 2, ret_msg: '登录失败'})
          }
          req.session.loginUser = data[0].account
          res.send({ret_code: 0, ret_msg: '登录成功'})
          console.log(req.session)
        })
        // console.log('登陆成功')
        // res.send({ret_code: 0, ret_msg: '登录成功'})
      }
    }
  })
```
### 链式查询
在查询时候，不带回调，而查询条件通过API函数来制定
```js
  // 链式查询
  console.log(models.Login)
  var query = models.Login.find({})
  query.select('some select') // 列表中只保留id
  query.select('occupation') // 列表中只保留id
  query.select('account occupation') // 列表中保留id + account
  query.select('password occupation') // 列表中保留id + password
  query.select('account password occupation') // 列表中保留id + account + password
  query.where('account').equals('aaa')
  query.sort('-occupation')
  // 有时我们需要在 MongoDB 中使用 JavaScript 表达式进行查询，
  // 这时可以用 find({$where : javascript}) 方式，$where 是一种快捷方式，并支持链式调用查询
  query.$where("this.account === 'aaa'")
  query.exec((err, person) => {
    console.log(err + '错误')
    console.log(person)
  })
```

# 学习连接
1.  http://openlayers.org/ 