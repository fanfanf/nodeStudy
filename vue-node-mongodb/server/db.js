// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test')

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
/** ************ 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  account: String,
  password: String
})

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
// 动态扩展
phoneSchema.add({color: 'string'})

// 为Model的实例添加自定义方法（将自定义的方法添加到Schema.methods即可）
phoneSchema.methods.printBrief = function () {
  // console.log(this)
  console.log('手机+价格' + this.device, '￥' + this.price)
}

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

/** ************ 定义模型Model **************/
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Phone: mongoose.model('Phone', phoneSchema)
}

// 手机实例start
// var arrPhone = []
// var raw
// // 1
// raw = require('./json/raw.iPhoneSe.json')
// var iPhoneSE = new Models.Phone(raw)
// iPhoneSE.printBrief()
// arrPhone.push(iPhoneSE)
// // 2
// raw = require('./json/raw.huawei.Mate8.json')
// var huaweiMate8 = new Models.Phone(raw)
// // console.log(huaweiMate8)
// huaweiMate8.printBrief()
// arrPhone.push(huaweiMate8)
// // 3
// raw = require('./json/raw.mi.max.json')
// var miMax = new Models.Phone(raw)
// miMax.printBrief()
// arrPhone.push(miMax)
// // 4
// raw = require('./json/raw.samsung.S6Edge.json')
// var s6Edge = new Models.Phone(raw)
// s6Edge.printBrief()
// arrPhone.push(s6Edge)
// // 5
// raw = require('./json/raw.nokia1000.json')
// var nokia1000 = new Models.Phone(raw)
// nokia1000.printBrief()
// arrPhone.push(nokia1000)

// console.log(arrPhone)
// Models.Phone.insertMany(arrPhone, (err, arrPhone) => {
//   if (err) {
//     console.log('insertMany() failed.')
//   } else {
//     console.log('----insertMany()------')
//     console.log('All phone devices saved.insertMany() saved')
//   }
//   Models.Phone.printCount()
// })
// 手机实例end

module.exports = Models
