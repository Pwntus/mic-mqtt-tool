import Vue from 'vue'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial)

import '@/../node_modules/vue-material/dist/vue-material.css'
import '@/assets/css/global.scss'

Vue.material.registerTheme('default', {
  primary: {
    color: 'light-blue',
    hue: '400'  
  },
  accent: 'green',
  warn: 'red',
  background: 'white'
})
