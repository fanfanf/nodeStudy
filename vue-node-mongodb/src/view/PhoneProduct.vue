<template>
  <div class="login-bg">
    <div style="overflow:hidden">
      <Select @on-change="styleChange" placeholder='全部分类' v-model="phoneStyleVal" style="float:left;width:200px;display:inline-block;margin:0 0 10px 200px">
          <Option v-for="item in phoneStyle" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select @on-change="sortingChange" placeholder='排序方式' v-model="sortingVal" style="float:left;width:200px;display:inline-block;margin:0 0 10px 20px">
          <Option v-for="item in sortingStyle" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div style="float:left;margin-left:20px">
        <Input @on-change="lowestBlur" v-model="lowest" placeholder="￥最低价格" style="width: 100px"></Input> -
        <Input @on-change="lowestBlur" v-model="highest" placeholder="￥最高价格" style="width: 100px"></Input>
        <Button type="primary" @click="selectPrice" :disabled="disabled">确定</Button>
      </div>
    </div>
    <Table border :columns="columns7" :data="phoneList"></Table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  export default {
    data () {
      return {
        disabled: true,
        sortingVal: '',
        highest: '',
        lowest: '',
        sortingStyle: [
          {
            value: 'desc',
            label: '价格由高到低'
          },
          {
            value: 'asc',
            label: '价格由低到高'
          }
        ],
        phoneStyle: [
          {
            value: 'smart',
            label: '智能'
          },
          {
            value: 'noSmart',
            label: '非智能'
          }
        ],
        trueValue: true,
        phoneStyleVal: '',
        phoneList: [],
        columns7: [
          {
            title: '序号',
            key: '_id',
            render: (h, params) => {
              return h('div', [
                h('strong', params.index + 1)
              ])
            }
          },
          {
            title: '名称',
            key: 'device'
          },
          {
            title: '手机类型',
            key: 'isSmart'
          },
          {
            title: '发布时间',
            key: 'releaseTime'
          },
          {
            title: '售价',
            key: 'price'
          },
          // {
          //   title: 'App名称',
          //   key: 'apps',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('strong', params.row.name)
          //     ])
          //   }
          // },
          {
            title: '厂商名称',
            key: 'manufacturer',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.manufacturer.name)
              ])
            }
          },
          {
            title: '厂商国籍',
            key: 'manufacturer',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.manufacturer.country)
              ])
            }
          }
          // {
          //   title: '手机类型',
          //   key: 'action',
          //   width: 150,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'info',
          //           size: 'small'
          //         },
          //         on: {
          //           click: () => {
          //             this.editor(params)
          //           }
          //         }
          //       }, '编辑'),
          //       h('Button', {
          //         props: {
          //           type: 'warning',
          //           size: 'small'
          //         },
          //         on: {
          //           click: () => {
          //             this.remove(params)
          //           }
          //         }
          //       }, '删除')
          //     ])
          //   }
          // }
        ]
      }
    },
    methods: {
      lowestBlur () {
        if (this.lowest !== '' && this.highest !== '' && (parseInt(this.lowest) <= parseInt(this.highest))) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      sortingChange (val) {
        const params = {
          sortVal: val
        }
        this.$http.post('/api/login/priceSortList', params).then((response) => {
          // console.log(response)
          this.phoneList = response.body
          for (var i = 0; i < this.phoneList.length; i++) {
            if (this.phoneList[i].isSmart === true) {
              this.phoneList[i].isSmart = '智能'
            } else {
              this.phoneList[i].isSmart = '非智能'
            }
          }
        })
      },
      styleChange (val) {
        // console.log(val)
        if (val === 'smart') {
          this.trueValue = true
        } else {
          this.trueValue = false
        }
        const phoneStyleVal = {value: this.trueValue}
        // console.log(phoneStyleVal)
        this.$http.post('/api/login/isSmartPhoneList', phoneStyleVal).then((response) => {
          // console.log(response)
          this.phoneList = response.body
          for (var i = 0; i < this.phoneList.length; i++) {
            if (this.phoneList[i].isSmart === true) {
              this.phoneList[i].isSmart = '智能'
            } else {
              this.phoneList[i].isSmart = '非智能'
            }
          }
        })
      },
      selectPrice () {
        const priceRange = {
          lowest: this.lowest,
          highest: this.highest
        }
        this.$http.post('/api/login/priceSelectList', priceRange).then((response) => {
          // console.log(response)
          this.phoneList = response.body
          for (var i = 0; i < this.phoneList.length; i++) {
            if (this.phoneList[i].isSmart === true) {
              this.phoneList[i].isSmart = '智能'
            } else {
              this.phoneList[i].isSmart = '非智能'
            }
          }
        })
      }
    },
    created () {
      this.$http.post('/api/login/getPhoneList').then((response) => {
        // console.log(response.body)
        this.phoneList = response.body
        for (var i = 0; i < this.phoneList.length; i++) {
          if (this.phoneList[i].isSmart === true) {
            this.phoneList[i].isSmart = '智能'
          } else {
            this.phoneList[i].isSmart = '非智能'
          }
        }
      })
    },
    watch: {
    }
  }
</script>

<style>
  .ivu-table table {
    width:100%;
  }
  .ivu-table-wrapper {
    width:800px;
    margin-left: 200px;
  }
  .ivu-form {
    width:350px;
  }
  .ivu-table td, .ivu-table th {
    text-align:center;
  }
</style>
