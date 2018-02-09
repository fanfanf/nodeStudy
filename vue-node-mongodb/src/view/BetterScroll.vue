<template>
  <div class="wrapper" ref="wrapper" style="height:30px">
    <ul class="content">
      <li v-for="item in userList">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
/** 通过了 this.$refs.wrapper 访问到了这个 DOM 对象,
 * 并且我们在 mounted 这个钩子函数里，
 * this.$nextTick 的回调函数中初始化 better-scroll  */
export default {
  data() {
    return {
      userList: [],
      scroll: ''
    }
  },
  /**
   * 我们获取到数据的后，需要通过异步的方式再去初始化 better-scroll，
   * 因为 Vue 是数据驱动的， Vue 数据发生变化（this.data = res.data）
   * 到页面重新渲染是一个异步的过程，我们的初始化时机是要在 DOM 重新渲染后，
   * 所以这里用到了 this.$nextTick，当然替换成 setTimeout(fn, 20) 也是可以的
   */
  created() {
    this.$http.post('/api/login/getAccount').then((res) => {
      this.userList = res.body
      this.$nextTick(() => {
        const options = {
          scrollY: true // 因为scrollY默认为true，其实可以省略
        }
        // options.scrollbar = true
        options.scrollbar = {
          fade: false
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
        console.log(this.scroll)
      })
    }).catch((reject) => {
      console.log(reject)
    })
  }
}
</script>
<style scoped>

</style>