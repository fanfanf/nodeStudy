var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
// 注册some_event事件
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
});
setTimeout(function() { 
  // 触发some_event事件
    event.emit('some_event'); 
}, 1000); 
// 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 