<template lang="pug">
#app
  mic-toolbar
  mic-container
    mic-sidenav
    mic-content
      mic-login
</template>

<script>
import MicToolbar from '@/components/MicToolbar.vue'
import MicContainer from '@/components/MicContainer.vue'
import MicSidenav from '@/components/MicSidenav.vue'
import MicContent from '@/components/MicContent.vue'
import MicLogin from '@/components/MicLogin.vue'

export default {
  name: 'App',
  components: {
    MicToolbar,
    MicContainer,
    MicSidenav,
    MicContent,
    MicLogin
  },
  mounted () {

  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
