<template>
  <div id="tree">
    <Tree nodeClass='one'
          name='第一棵树'
          v-for='node in data'
          :data='node'
          :config-checkbox='true'
          :config-checked='true'
          :config-open='true'
          @node-route='routeClick(node)'
          :action='action' />
  </div>
</template>
<script>
import Tree from './Tree'
export default {
  components: {
    Tree
  },
  data() {
    return {
      data: [
        {
          text: '一级 1',
          nodes: [
            {
              text: '二级 1.1',
              nodes: [
                { text: '三级 1.1.1', route: { path: 'http://www.baidu.com' } },
                { text: '三级 1.1.2', route: { path: 'http://www.baidu.com' } }
              ]
            },
            {
              text: '二级 2.1', nodes: [
                { text: '三级 2.1.1', route: { path: 'http://www.baidu.com' } },
                { text: '三级 2.1.2', route: { path: 'http://www.baidu.com' } }
              ]
            }
          ]
        },
        {
          text: '一级 2',
          nodes: [
            {
              text: '二级 2.1',
              nodes: [
                { text: '三级 2.1.1', route: { path: 'http://www.baidu.com' } },
                { text: '三级 2.1.2', route: { path: 'http://www.baidu.com' } }
              ]
            },
            { text: '二级 2.2', route: { path: 'http://www.baidu.com' } }
          ]
        }
      ]
    }
  },
  methods: {
    action(node) {

    }
  }
}
</script>
<style>
#tree {
  border: solid 1px #ececec;
}
</style>