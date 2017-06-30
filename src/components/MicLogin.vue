<template lang="pug">
.mic-login
  .md-headline Login
  p Please provide your <b>Managed IoT Cloud</b> credentials to start using this tool.

  md-input-container(md-inline)
    label Username
    md-input
  md-input-container(md-inline)
    label Password
    md-input(type="password")
  md-button.md-raised.md-primary(style="float:right")
    span Login
</template>

<script>
export default {
  name: 'MicLogin'
}
</script>

<style lang="scss">
.mic-login {
  .md-button {
    margin-right: 0;
  }
}
</style>
