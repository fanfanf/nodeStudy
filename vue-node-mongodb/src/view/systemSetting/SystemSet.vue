<template>
  <div>
    <Select v-model="model1" style="width:230px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Input v-model="value" placeholder="请输入..." style="width: 300px"></Input>
    <Radio-group v-model="phone" type="button">
      <Radio label="apple">
          <Icon type="social-apple"></Icon>
          <span>Apple</span>
      </Radio>
      <Radio label="android">
          <Icon type="social-android"></Icon>
          <span>Android</span>
      </Radio>
      <Radio label="windows">
          <Icon type="social-windows"></Icon>
          <span>Windows</span>
      </Radio>
    </Radio-group>
    <Radio-group v-model="animal">
      <Radio label="金斑蝶"></Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </Radio-group>
    <Rate v-model="value222"></Rate>
    <Button type="primary" @click="changeSelect">保存</Button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value222: 0,
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        model1: '',
        value: '',
        phone: 'apple',
        animal: '爪哇犀牛'
      }
    },
    methods: {
      changeSelect () {
        console.log(this.model1)
        console.log(this.value)
        console.log(this.phone)
        console.log(this.animal)
        console.log(this.value222)
      }
    }
  }
</script>
