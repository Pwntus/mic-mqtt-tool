import Vue from 'vue'
import { mapGetters } from 'vuex'

const bus = new Vue()

Vue.mixin({
  data () {
    return {
      bus,
      sidebar: {
        open: () => {
          this.bus.$emit('mic:sidenav', true)
        },
        close: () => {
          this.bus.$emit('mic:sidenav', false)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      auth: 'App/auth',
      page: 'App/page'
    })
  },
  methods: {
    showSnackbar (message = null) {
      this.bus.$emit('mic:snackbar', message)
    }
  }
})
