import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import '@/init'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
