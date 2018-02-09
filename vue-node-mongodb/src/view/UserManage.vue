<template>
  <div class="login-bg">
    <div style="display:block;overflow:hidden;margin:0 0 10px 200px;text-align:left">
      <Button type="primary" @click="addUser">添加</Button>
    </div>
    <Table border :columns="columns7" :data="userList"></Table>
    <Modal v-model="modal1" title="添加用户" @on-ok="confirm" @on-cancel="cancel">
      <Form :label-width="80" :rules="ruleInline">
        <Form-item label="用户名">
          <Input v-model="newAccount"></Input>
        </Form-item>
        <Form-item label="密码">
          <Input v-model="newPassword"></Input>
        </Form-item>
      </Form>
    </Modal>
    <Modal v-model="editorPop" title="编辑用户信息" @on-ok="confirmEditor" @on-cancel="cancel">
      <Form :label-width="80">
        <Form-item label="用户名">
          <Input v-model="editorAccount"></Input>
        </Form-item>
        <!--<Form-item label="密码">
                <Input v-model="editorPassword"></Input>
            </Form-item>-->
      </Form>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
// import findIndex from 'lodash/findIndex'
// import merge from 'lodash/merge'
// import forEach from 'lodash/forEach'
// import isString from 'lodash/isString'
// import assign from 'lodash/assign'
// import without from 'lodash/without'
// import uniqBy from 'lodash/uniqBy'
// import throttle from 'lodash/throttle' // 节流  eg:slider进度条、鼠标事件、滚轮事件
import VueResource from 'vue-resource'
Vue.use(VueResource)
// import socketIo from 'socket.io/lib/socket.js'
// Vue.use(socketIo)
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      ruleInline: {
        newAccount: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      },
      tempAccount: '',
      editorPop: false,
      editorAccount: '',
      editorPassword: '',
      modal1: false,
      showRegPup: false,
      newAccount: '',
      newPassword: '',
      columns7: [
        {
          title: '序号',
          key: 'name',
          render: (h, params) => {
            console.log(params.index)
            return h('div', [
              // h('Icon', {
              //   props: {
              //     type: 'person'
              //   }
              // }),
              h('strong', params.index + 1)
            ])
          }
        },
        {
          title: '用户名',
          key: 'account'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editor(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      userList: [],
      noDel: '<p>admin用户不能被删除</p>'
    }
  },
  methods: {
    ...mapActions(['callWebSocket', 'userListGet']),
    editor(params) {
      console.log('编辑用户信息')
      if (params.row.account === 'admin') {
        this.noDel = '<p>admin用户不能被编辑</p>'
        this.instance('warning')
        return
      }
      this.editorPop = true
      this.editorAccount = params.row.account
      this.tempAccount = params.row.account
    },
    confirmEditor() {
      const acconuntParams = {
        account: this.tempAccount,
        editorAccount: this.editorAccount
      }
      console.log(acconuntParams)
      this.$http.post('/api/login/updateAccount', acconuntParams).then((response) => {
        console.log(response)
        console.log(response.body)
        this.getUserInfo()
        // console.log(this.userList)
      }).catch((reject) => {
        console.log(reject)
      })
    },
    addUser() {
      this.modal1 = true
    },
    cancel() {
      this.$Message.info('点击了取消')
    },
    instance(type) {
      const title = '警告'
      const content = this.noDel
      switch (type) {
        case 'info':
          this.$Modal.info({
            title: title,
            content: content
          })
          break
        case 'success':
          this.$Modal.success({
            title: title,
            content: content
          })
          break
        case 'warning':
          this.$Modal.warning({
            title: title,
            content: content
          })
          break
        case 'error':
          this.$Modal.error({
            title: title,
            content: content
          })
          break
      }
    },
    show(index) {
      this.$Modal.info({
        title: '用户信息',
        content: `姓名：${this.userList[index].name}<br>年龄：${this.userList[index].age}<br>地址：${this.userList[index].address}`
      })
    },
    remove(params) {
      if (params.row.account === 'admin') {
        this.noDel = '<p>admin用户不能被删除</p>'
        this.instance('warning')
        return
      }
      this.userList.splice(params.index, 1)
      const acconuntParams = {
        account: params.row.account
      }
      console.log(params.row.account)
      this.$http.post('/api/login/deleteAccount', acconuntParams).then((response) => {
      }).catch((reject) => {
        console.log(reject)
      })
    },
    register() {
      this.showRegPup = true
    },
    confirm() {
      // 创建一个账号密码
      if (this.newAccount === '' || this.newPassword === '') {
        this.$Message.info('用户名或密码不能为空')
        return
      }
      let params = {
        account: this.newAccount,
        password: this.newPassword
      }
      // console.log(params)
      this.$http.post('/api/login/createAccount', params)
      this.getUserInfo()
    },
    SystemSet(path) {
      // console.log(path)
      this.$router.push(path)
    },
    getUserInfo() {
      this.$http.post('/api/login/getAccount').then((response) => {
        // console.log(response)
        // console.log(response.body)
        this.userList = response.body
        // const index = findIndex(this.userList, (nav) => {
        //   // console.log(this.userList)
        //   // console.log(nav)
        //   return nav.account === 'admin'
        // })
        // console.log(index) // 返回用户名是admin这个用户的索引
        // forEach(this.userList, (node, index) => { // 遍历
        //   console.log(this.userList)
        //   console.log(node, index)
        // })
        // console.log(isString('是否是字符串'))
        // console.log(this.userList) return nav.key === this.activeKey
      }).catch((reject) => {
        console.log(reject)
      })
    },
    handle_storage(e) {
      console.log(e)
      if (!e) { e = window.event }
      this.showObject(e)
    },
    showObject(obj) {
      console.log(obj)
      // 递归显示object
      if (!obj) { return }
      for (var i in obj) {
        if (typeof (obj[i]) !== 'object' || obj[i] == null) {
          document.write(i + ' : ' + obj[i] + '<br/>')
        } else {
          document.write(i + ' : object' + '<br/>')
        }
      }
    }
  },
  created() {
    this.userListGet()
    this.getUserInfo()
    // console.log('调用websocket')
    this.callWebSocket()
    // console.log(socketIo)
    // lodash使用例子
    // var object = {a: [{b: 2}, {d: 4}]} // 目标对象
    // var other = {a: [{c: 2}, {e: 4}]} // 源对象
    // var obj = merge(object, other)
    // console.log(obj) // {a:[{b: 2, c: 2}, {d: 4, e: 4}]}
    // var obj1 = {a: 3}
    // var obj2 = {b: 4}
    // console.log(assign({}, obj1, obj2)) // {a: 3, b: 4}
    // console.log(without([1, 2, 1, 3], 1, 2)) // [3] 过滤掉[1,2,1,3]中的1、2
    // console.log(uniqBy([2.1, 1.2, 2.3], Math.floor)) // 2,1,2 -->[2.1, 1.2] 返回新的去重后的数组
    // console.log(uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x'))
    if (window.localStorage) {
      console.log('This browser supports localStorage')
      localStorage.setItem('b', 'isaac')
      localStorage.setItem('a', 'aaaaa')
      var storage = window.localStorage
      for (var i = 0; i < storage.length; i++) {
        // key(i)获得相应的键，再用getItem()方法获得对应的值
        console.log(storage.key(i) + ' : ' + storage.getItem(storage.key(i)))
      }
      var details = { author: 'isaac', 'description': 'fresheggs', 'rating': 100 }
      // 目前javascript使用非常多的json格式，如果希望存储在本地，可以直接调用JSON.stringify()将其转为字符串
      storage.setItem('details', JSON.stringify(details))
      // 读取出来后调用JSON.parse()将字符串转为json格式
      details = JSON.parse(storage.getItem('details'))
      console.log(storage.getItem('details'))
      console.log(details)
      // 存储数据
      // 写
      // localStorage.setItem('b', 'isaac')
      // localStorage.setItem('a', 'aaaaa')
      // 读
      // var b = localStorage.getItem('b')
      // console.log(b)
      // 删除
      // localStorage.removeItem('b')
      // var bb = localStorage.getItem('b')
      // console.log(bb)
      // 删除所有属性
      // var bb = localStorage.clear()
      // console.log(bb)
      // console.log(window.addEventListener)
      // if (window.addEventListener) {
      //   console.log('000')
      //   window.addEventListener('storage', this.handle_storage, false)
      // } else if (window.attachEvent) {
      //   console.log('111')
      //   window.attachEvent('onstorage', this.handle_storage)
      // }
    } else {
      console.log('This browser does NOT support localStorage')
    }
  }
}
</script>

<style>
.ivu-table table {
  width: 100%;
}

.ivu-table-wrapper {
  width: 800px;
  margin-left: 200px;
}

.ivu-form {
  width: 350px;
}

.ivu-table td,
.ivu-table th {
  text-align: center;
}
</style>
