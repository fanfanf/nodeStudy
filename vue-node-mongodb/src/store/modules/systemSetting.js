import { userList } from '@/http/userManage.api.js'

const state = {
  socket: {
    socketOpen: '1',
    appId: 'websocket_bsralarm',
    content: {
      session: '',
      method: 'register'
    }
  }
}

const getters = {
}

const mutations = {
}

const actions = {
  // WebSocket 客户端 API{ dispatch, commit, rootState, state }, payLoad
  callWebSocket () {
    var host = window.location.host
    console.log(host)
    var logWebsocket = new WebSocket('ws://echo.websocket.org')
    console.log(logWebsocket)
    logWebsocket.onopen = function (evt) {
      console.log('Connection open ...')
      logWebsocket.send('Hello WebSockets!')
    }
    logWebsocket.onmessage = function (evt) {
      console.log('Received Message:' + evt.data)
      logWebsocket.close()
    }
    logWebsocket.onerror = function (evt) {
      console.log('Connection onerror.')
    }
    logWebsocket.onclose = function (evt) {
      console.log('Connection closed.')
    }
  },
  userListGet () {
    userList()
    // userList(() => {
    //   console.log('ppppp')
    // })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
