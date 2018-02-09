// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
'use strict'
const models = require('./db')
const express = require('express')
const router = express.Router()

/** ************ 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  console.log(req.body)
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 调用实例方法
  // newAccount.printBrief()
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})

// 删除账号接口
router.post('/api/login/deleteAccount', (req, res) => {
  console.log(req.body.account)
  if (req.body.account === 'admin') {
    return
  }
  // 调用静态方法
  // models.Login.printCount()
  models.Login.remove({account: req.body.account}, (err, data) => {
    console.log('执行删除')
    if (err) {
      res.send(err)
    } else {
      res.send('deleteAccount successed')
    }
  })
})

// 修改账号接口
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

// 登录
router.post('/api/login/login', (req, res) => {
  // session start
  // console.log(req)
  // console.log(req.session.regenerate)
  // req.session.regenerate(function (err) {
  //   // console.log(err)
  //   if (err) {
  //     return res.json({ret_code: 2, ret_msg: '登录失败'})
  //   }
  //   req.session.loginUser = req.body.account
  //   console.log(req.session)
  //   res.send({ret_code: 0, ret_msg: '登录成功'})
  //   // res.json({ret_code: 0, ret_msg: '登录成功'})
  // })
  // session end

  // console.log(req.body.account)
  // console.log(req.body.password)
  // 通过模型去查找数据库（直接查询）
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
  // 链式查询
  // console.log(models.Login)
  // var query = models.Login.find({})
  // query.select('some select') // 列表中只保留id
  // query.select('occupation') // 列表中只保留id
  // query.select('account occupation') // 列表中保留id + account
  // query.select('password occupation') // 列表中保留id + password
  // query.select('account password occupation') // 列表中保留id + account + password
  // query.where('account').equals('aaa')
  // query.sort('-occupation')
  // 有时我们需要在 MongoDB 中使用 JavaScript 表达式进行查询，
  // 这时可以用 find({$where : javascript}) 方式，$where 是一种快捷方式，并支持链式调用查询
  // query.$where("this.account === 'aaa'")
  // query.exec((err, person) => {
  //   console.log(err + '错误')
  //   console.log(person)
  // })
})

// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {
  var params
  // console.log(req.body.account === undefined)
  // console.log('是的发送到')
  if (req.body.account === undefined) {
    params = {}
  } else {
    params = {account: req.body.account}
  }
  // console.log(req.body.account)
  // console.log(req.body.password)
  // 通过模型去查找数据库（直接查询）
  models.Login.find(params, (err, data) => {
    // console.log('获取登录的用户数据')
    // console.log(data)
    // console.log(!data)
    if (err) {
      res.send(err)
    } if (!data) {
      res.send(data)
    } else {
      // 匹配密码
      if (req.body.account === undefined) {
        res.send(data)
        return
      }
      // console.log(data)
      if (data.length === 0) {
        res.send('用户不存在')
        return
      }
      // console.log(data[0].password)
      if (req.body.password !== data[0].password) {
        // console.log('密码错误')
        res.send(404 + '密码错误')
      } else {
        // console.log('登陆成功')
        res.send(200 + '登陆成功' + data)
      }
    }
  })
  // 链式查询
  // console.log(models.Login)
  // var query = models.Login.find({})
  // query.select('some select') // 列表中只保留id
  // query.select('occupation') // 列表中只保留id
  // query.select('account occupation') // 列表中保留id + account
  // query.select('password occupation') // 列表中保留id + password
  // query.select('account password occupation') // 列表中保留id + account + password
  // query.where('account').equals('aaa')
  // query.sort('-occupation')
  // 有时我们需要在 MongoDB 中使用 JavaScript 表达式进行查询，
  // 这时可以用 find({$where : javascript}) 方式，$where 是一种快捷方式，并支持链式调用查询
  // query.$where("this.account === 'aaa'")
  // query.exec((err, person) => {
  //   console.log(err + '错误')
  //   console.log(person)
  // })
})

// 获取手机列表接口
router.post('/api/login/getPhoneList', (req, res) => {
  // 清除数据库
  // models.Phone.remove({}, (err) => {
  //   console.log('---clean db ---------------------------------------')
  //   if (err) {
  //     console.log('Phone remove all occur a error:', err)
  //   } else {
  //     console.log('Phone remove all success.')
  //   }
  // })
  models.Phone.find((err, data) => {
    console.log(data.length)
    if (err) {
      // console.log('err')
      res.send(err)
    } else {
      console.log('---findAllPhone---------------------------------------')
      res.send(data)
      // data.forEach((element, index, data) => {
      //   console.log(index, element)
      // })
    }
  })
  // 普通字段查询
  // models.Phone.find({isSmart: false}, (err, data) => {
  //   if (err) {
  //     // console.log('err')
  //     res.send(err)
  //   } else {
  //     console.log('---findNoSmartPhone()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 数组下对象字段查询
  // models.Phone.find({'apps.name': 'Radio'}).exec((err, data) => {
  //   if (err) {
  //     // console.log('err')
  //     res.send(err)
  //   } else {
  //     console.log('---findPhoneInstalledRadio()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 涉及到对比条件或逻辑条件的拼装(复杂的组合条件查询)
  // // 方法一：
  // models.Phone.find({
  //   $or: [
  //     {'manufacturer.country': 'China'},
  //     {'manufacturer.country': 'South Korea'}
  //   ],
  //   $and: [
  //     {'price': {$gte: 1000}},
  //     {'price': {$lt: 4000}}
  //   ]
  // }).exec((err, data) => {
  //   if (err) {
  //     // console.log('err')
  //     res.send(err)
  //   } else {
  //     console.log('---findChina_or_SouthKorea_and_1000_4000Phone()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 方法三：
  // models.Phone.find({
  //   'manufacturer.country': {$in: ['China', 'South Korea']},
  //   $and: [
  //     {'price': {$gte: 1000}},
  //     {'price': {$lt: 4000}}
  //   ]
  // }).exec((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     console.log('---findChina_or_SouthKorea_and_1000_4000Phone()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 方法二：
  // models.Phone.find()
  // .or([{'manufacturer.country': 'China'}, {'manufacturer.country': 'South Korea'}])
  // .where('price').gte(1000).lt(4000)
  // .exec((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     console.log('---findChina_or_SouthKorea_and_1000_4000Phone()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 方法四：
  // models.Phone.find()
  // .where('manufacturer.country').in(['China', 'South Korea'])
  // .where('price').gte(1000).lt(4000)
  // .exec((err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     console.log('---findChina_or_SouthKorea_and_1000_4000Phone()---------------------------------------')
  //     res.send(data)
  //     data.forEach((element, index, data) => {
  //       console.log(index, element)
  //     })
  //   }
  // })
  // 排序
  // var query = models.Phone.find({})
  // query.sort('-price') // 高->低 （price）
  // query.sort({price: 'desc'}) // 高->低（asc）
  // query.sort({price: 'descending'}) // 高->低（ascending）
  // query.sort({price: -1}) // 高->低（1）
  // // query.sort({price: -1}).limit(2) // 限制几条数据
  // .exec((err, person) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(person)
  //     res.send(person)
  //   }
  // })
  // 排重
  // query.distinct('manufacturer.country')
  // .exec((err, countrys) => {
  //   console.log('---findAllCountry()---Remove duplicate------------------------------')
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     // 厂商国籍都有哪些（去掉重复的）
  //     console.log(countrys)
  //   }
  // })
  // 计数
  // models.Phone.count({price: '4988'}, (err, count) => {
  //   console.log('---printCount()-----------------------------')
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log('phone count=' + count)
  //   }
  // })
})

// 根据价格排序方式查询手机列表
router.post('/api/login/priceSortList', (req, res) => {
  // console.log(req.body.sortVal)
  var sortWay
  if (req.body.sortVal === 'desc') {
    sortWay = {price: 'desc'}
  } else {
    sortWay = {price: 'asc'}
  }
  var query = models.Phone.find({})
  // query.sort('-price') // 高->低 （price）
  query.sort(sortWay) // 高->低（asc）
  // // query.sort({price: 'descending'}) // 高->低（ascending）
  // // query.sort({price: -1}) // 高->低（1）
  // // query.sort({price: -1}).limit(2) // 限制几条数据
  .exec((err, person) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(person)
      res.send(person)
    }
  })
})

// 根据价格范围查询手机列表
router.post('/api/login/priceSelectList', (req, res) => {
  // console.log(req.body)
  models.Phone.find()
  .where('price').gte(parseInt(req.body.lowest)).lte(parseInt(req.body.highest))
  .exec((err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log('---findPrice_1000_4000Phone()---------------------------------------')
      res.send(data)
      data.forEach((element, index, data) => {
        console.log(index, element)
      })
    }
  })
})

// 是否为智能手机查询列表
router.post('/api/login/isSmartPhoneList', (req, res) => {
  console.log(req.body.value)
  models.Phone.find({isSmart: req.body.value}, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log('---findIsSmartPhone()---------------------------------------')
      res.send(data)
      data.forEach((element, index, data) => {
        console.log(index, element)
      })
    }
  })
})

module.exports = router
