<template lang="pug">
#app
  mic-snackbar
  mic-toolbar
  mic-container
    mic-sidenav
    mic-content
        mic-login(v-if="page == 0")
        keep-alive
          mic-subscribe(v-if="page == 1")
          mic-publish(v-if="page == 2")
</template>

<script>
import MicSnackbar from '@/components/MicSnackbar.vue'
import MicToolbar from '@/components/MicToolbar.vue'
import MicContainer from '@/components/MicContainer.vue'
import MicSidenav from '@/components/MicSidenav.vue'
import MicContent from '@/components/MicContent.vue'
import MicLogin from '@/components/MicLogin.vue'
import MicSubscribe from '@/components/MicSubscribe.vue'
import MicPublish from '@/components/MicPublish.vue'

export default {
  name: 'App',
  components: {
    MicSnackbar,
    MicToolbar,
    MicContainer,
    MicSidenav,
    MicContent,
    MicLogin,
    MicSubscribe,
    MicPublish
  },
  computed: {
    page () {
      return this.$store.getters['App/page']
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
