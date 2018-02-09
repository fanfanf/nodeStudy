<template>
  <div class="login-bg">
    <Form class="formStyle" ref="formInline" :model="formInline" label-position="left" :label-width="100" :rules="ruleInline">
      <h4 class="title">管理员登录</h4>
      <Form-item prop="user" label="用户名">
        <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password" label="密码">
        <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="userLogin('formInline', '/homePage')">登录</Button>
      </Form-item>
    </Form>
    <Alert v-show="tip" type="success" show-icon closable>
        失败
        <span slot="desc">请确认用户名和密码</span>
    </Alert>
  </div>
  <!--
  <div>
    <button type="submit" class="btn btn-default" @click="register">注册</button>
    <button type="submit" class="btn btn-default" @click="login('/homePage')">登录</button>
    <div v-show="showRegPup">
      <input class="form-control" id="newAccount" placeholder="请输入账号" v-model="newAccount">
      <input type="password" class="form-control" id="newPsw" placeholder="请输入密码" v-model="newPassword">
      <button type="submit" class="btn btn-default" @click="confirm">确认</button>
    </div>
  </div>
  -->
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        tip: false
        // showRegPup: false,
        // newAccount: '',
        // newPassword: '',
        // account: '',
        // password: ''
      }
    },
    methods: {
      userLogin (name, path) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('提交成功!') // message全局提示
            // this.$Notice.success(config) Notice通知提醒
            let params = {
              account: this.formInline.user,
              password: this.formInline.password
            }
            console.log(params)
            // 获取已有账号密码
            this.$http.post('/api/login/login', params).then((response) => {
              // 响应成功回调
              console.log('刷新成功')
              console.log('获取数据成功', response)
              console.log(response.body)
              if (response.body.ret_code === 65535 && response.body.ret_msg === '用户不存在') {
                console.log('此用户不存在')
                this.tip = true
                var _this = this
                setTimeout(function () {
                  _this.tip = false
                }, 3000)
                return
              } if (response.body.ret_code === 404 && response.body.ret_msg === '密码错误') {
                console.log('密码输入错误')
              } else {
                // 进入主页
                this.$router.push(path)
              }
              // let params = {
              //   account: this.formInline.user,
              //   password: this.formInline.password
              // }
              // 创建一个账号密码
              // return this.$http.post('/api/login/createAccount', params)
            })
            // .then((response) => {
            //   console.log(response)
            .catch((reject) => {
              console.log(reject)
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      // register () {
      //   console.log('注册一个账号')
      //   this.showRegPup = true
      // },
      // confirm () {
      //   // 创建一个账号密码
      //   let params = {
      //     account: this.newAccount,
      //     password: this.newPassword
      //   }
      //   console.log(params)
      //   this.$http.post('/api/login/createAccount', params)
      // },
      login (path) {
        let params = {
          account: this.formInline.user,
          password: this.formInline.password
        }
        console.log(params)
        // 获取已有账号密码
        this.$http.post('/api/login/getAccount', params).then((response) => {
          // 响应成功回调
          console.log('刷新成功')
          console.log('获取数据成功', response)
          // 进入主页
          this.$router.push(path)
          // let params = {
          //   account: this.formInline.user,
          //   password: this.formInline.password
          // }
          // 创建一个账号密码
          // return this.$http.post('/api/login/createAccount', params)
        })
        // .then((response) => {
        //   console.log(response)
        .catch((reject) => {
          console.log(reject)
        })
      }
    }
}
</script>
<style>
  /*.login-bg {
    background: url()
  }*/
  .ivu-btn-primary {
    width: 100%;
  }
  .formStyle {
    width:300px;
    height: 260px;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: 130px;
  }
  .title {
    margin-bottom: 20px;
    font-size: 18px;
  }
  .ivu-form-item-error .ivu-input:focus {
    box-shadow: 0 0 0 2px rgba(237,63,20,0);
  }
  .ivu-input:focus {
    box-shadow: 0 0 0 2px rgba(45,140,240,0);
  }
  .ivu-alert-with-desc.ivu-alert-with-icon {
    width: 300px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
  }
  .ivu-alert-with-desc .ivu-alert-message {
    margin-left: -186px;
  }
</style>
