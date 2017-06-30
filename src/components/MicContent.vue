<template lang="pug">
md-whiteframe.mic-content(md-elevation="2")
  slot
</template>

<script>
export default {
  name: 'MicContent'
}
</script>

<style lang="scss">
.mic-content {
  background: #FFF;
  padding: 18px;
  flex: 1;
}
</style>
