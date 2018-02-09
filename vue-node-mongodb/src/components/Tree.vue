<!--
  Tree 使用说明及参数
  props: {
    /* 当前节点若存在子集,则是否打开 */
    configOpen: { type: Boolean, default: false },
    /* 是否存在复选框 */
    configCheckbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    configChecked: { type: Boolean, default: false },
    /* 缩进 ，默认 2 em */
    configRetract: { type: Number, default: 1 },
    retract: { type: Number, default: 0 },

    /* tree 名称，默认无名 */
    name: { type: String, default: '' },
    action(){
      // 路由方法
    },
    data:{
      text: '一级 1',
      nodes: [
        {
          text: '二级 1.1',
          nodes: [
            { text: '三级 1.1.1', route: { path: 'http://www.baidu.com' } },
            { text: '三级 1.1.2', route: { path: 'http://www.baidu.com' } }
          ]
        },
        { text: '二级 2.1', route: { path: 'http://www.baidu.com' } }
      ]
    }
  }
-->

<template>
  <div :name='name'
       class="tree">
    <div :class='outerClass'
         @mouseover='mouse($event,true)'
         @mouseout='mouse($event,false)'>
      <div :class='["innerBox",{selectLast:last}]'
           :style="{paddingLeft:retract + 'em'}"
           @click='toggle'>
        <input v-if='configCheckbox'
               type="checkbox"
               v-model='checked' />
        <span class="node-icon"
              :class='data.icon'></span>
        <span class="node-icon-text">{{data.text}}</span>
        <span class="node-arrow"
              :class='fontIconStyle'
              v-if="last == false" />
      </div>
    </div>
    <div class='childrens'
         v-show='open === true && last == false'>
      <Tree :name='name'
            :config-open='configOpen'
            :config-checkbox='configCheckbox'
            :config-checked='configChecked'
            :config-retract='configRetract'
            @changeParentCheckBox='changeParentCheckBox'
            @changeParentState='changeParentState'
            :action='action'
            :active-key='activeKey'
            :retract='retract + configRetract'
            v-for='node in data.nodes'
            :data='node'></Tree>
    </div>
  </div>
</template>
<script>
import forEach from 'lodash/forEach'
import { eventTarget } from '@/assets/common/DOMUtil'
export default {
  name: 'Tree',
  props: {
    /* 当前节点若存在子集,则是否打开 */
    configOpen: { type: Boolean, default: false },
    /* 是否存在复选框 */
    configCheckbox: { type: Boolean, default: false },
    /* 是否默认选中 */
    configChecked: { type: Boolean, default: false },
    configAloneOpen: { type: Boolean, default: false },
    /* 缩进 ，默认 2 em */
    configRetract: { type: Number, default: 1 },
    retract: { type: Number, default: 0 },
    nodeClass: { type: String, default: '' },
    icon: '',
    activeKey: {
      type: String,
      default: ''
    },
    /* tree 名称，默认无名 */
    name: { type: String, default: '' },
    action: {
      type: Function,
      default: function () {
      }
    },
    data: {
      type: Object,
      default () {
        return {
          text: '一级 1',
          nodeClass: '',
          nodes: [
            {
              text: '二级 1.1',
              nodes: [
                { text: '三级 1.1.1', route: { path: 'http://www.baidu.com' } },
                { text: '三级 1.1.2', route: { path: 'http://www.baidu.com' } }
              ]
            },
            { text: '二级 2.1', route: { path: 'http://www.baidu.com' } }
          ]
        }
      }
    }
  },
  data () {
    return {
      height: '200px',
      open: this.configOpen,
      checked: this.configChecked,
      /* 复选框状态：1 全选，0 未选，-1 半选 */
      checkboxState: this.configChecked ? 1 : 0,
      active: false
    }
  },
  computed: {
    last () {
      /* 判断当前节点是否为最后一个节点 */
      return !(this.data.nodes && this.data.nodes.length)
    },
    fontIconStyle () {
      return [
        'icon',
        'iconfont',
        { 'icon-arrow-up': this.open },
        { 'icon-arrow-down': this.open === false }
      ]
    },
    outerClass () {
      return [
        'outerBox'
        // ,{ 'node-active': this.active }
      ]
    },
    nodesLength () {
      /* 获取当前节点的子节点数 */
      if (this.last === false) {
        return this.data.nodes.length
      }
      return 0
    }
  },
  watch: {
    open (newValue, oldValue) {
      this.$emit('changeParentState', newValue)
    },
    checked (newValue, oldValue) {
      this.checkboxState = this.checked ? 1 : 0
      this.changeChildCheckBox(this.checked)
    },
    checkboxState (newValue, oldValue) {
      const box = this.$el.querySelector('input[type=checkbox]')
      if (newValue === -1) {
        box.indeterminate = true
      } else {
        this.checked = newValue
        box.indeterminate = false
      }
      /* 变更 父组件 状态 */
      this.$emit('changeParentCheckBox', newValue)
    }
  },
  created () {
    this.childCheckedSize = this.configChecked ? this.nodesLength : 0
  },
  mounted () {
    if (this.activeKey === this.data.path) {
      this.$emit('changeParentState', true)
      this.toggle({ currentTarget: this.$el.querySelector('div.innerBox') })
    }
  },
  methods: {
    toggle (event) {
      { /* 点击节点 样式 处理  */
        const selector = this.name ? `div[name=${this.name}] ` : ''
        const selectedNodeList = document.querySelectorAll(`div.tree ${selector}div.node-selected`)
        forEach(selectedNodeList, (node) => {
          node.removeClass('node-selected')
        })
        eventTarget(event).parentNode.appentClass('node-selected')
      }

      if (this.last) {
        /* 路由界面 */
        this.action(this.data)
      } else {
        /* 切换子集状态 */
        this.$parent.$children.forEach((comp, index) => {
          if (this !== comp && comp.$data.open === true) {
            comp.$set(comp, 'open', false)
            return false
          }
        })
        this.open = !this.open
      }
    },
    changeParentState (value) {
      this.open = value
    },
    changeChildCheckBox (value) {
      this.$children.forEach((comp, index) => {
        comp.$set(comp, 'checked', value)
      })
    },
    changeParentCheckBox (value) {
      let childCheckedSize = 0
      for (const index in this.$children) {
        const comp = this.$children[index]
        const childState = comp.$data['checkboxState']
        if (childState === -1) {
          /* 只要 子节点 有一个半选状态 */
          this.checkboxState = childState
          return
        }
        if (childState === 1) {
          /* 当前node 子 node 选中的个数 */
          childCheckedSize += 1
        }
      }

      if (childCheckedSize === 0) {
        this.checkboxState = 0
      } else if (childCheckedSize === this.nodesLength) {
        this.checkboxState = 1
      } else {
        this.checkboxState = -1
      }
    },
    mouse (event, state) {
      eventTarget(event)[state ? 'appentClass' : 'removeClass']('node-active')
    }
  }
}

</script>
<style>
.tree {
  line-height: 44px;
  background: #f2f4f7;
  font-size: 14px;
  color: #333;
}

.tree .outerBox {
  padding-left: 6px;
  cursor: pointer;
}

.tree .outerBox .innerBox {
  background-color: #f2f4f7;
}

.tree .node-selected {
  background-color: #fc6e30;
}

.tree .node-active {
  background-color: #fc6e30;
  color: #fc6e30;
}

.tree .node-selected .selectLast {
  background: #fff;
  color: #fc6e30;
}

.tree .node-icon {
  padding-left: 30px;
  margin-right: 15px;
}

.tree .node-icon-text {
  width: 105px;
  display: inline-block;
}

.tree .node-arrow {
  padding-right: 19px;
  font-size: 12px !important;
}
</style>