<template lang="pug">
md-snackbar(
  md-position="top center"
  ref="snackbar"
)
  span {{ message }}
</template>

<script>
export default {
  name: 'MicSnackbar',
  data () {
    return {
      message: null
    }
  },
  created () {
    this.bus.$on('mic:snackbar', (message) => {
      this.message = message
      this.$refs.snackbar.open()
    })
  }
}
</script>
