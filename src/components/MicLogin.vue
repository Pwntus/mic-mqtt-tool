<template lang="pug">
.mic-login
  .md-headline Login
  p Please provide your <b>Managed IoT Cloud</b> credentials to start using this tool.

  md-input-container(md-inline)
    label Username
    md-input(
      v-model="username"
      v-bind:disabled="loading"
      @keyup.enter.native="login"
    )
  md-input-container(md-inline)
    label Password
    md-input(
      type="password"
      v-model="password"
      v-bind:disabled="loading"
      @keyup.enter.native="login"
    )
  md-button.md-raised.md-primary(
    v-bind:disabled="loading"
    @click.native="login"
  )
    span Login
  .clear
</template>

<script>
export default {
  name: 'MicLogin',
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  computed: {
    payload () {
      return { username: this.username, password: this.password, ctx: this }
    }
  },
  methods: {
    login () {
      if (this.username == '' || this.password == '') return
        
      this.loading = true
      this.$store.dispatch('App/auth', this.payload)
        .catch(error => {
          this.showSnackbar(error)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.mic-login {
  .md-button {
    margin-right: 0;
    float: right;
  }
}
</style>
