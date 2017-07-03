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
  max-width: 938px;
  background: #FFF;
  padding: 18px;
  overflow: hidden;
  flex: 1;
}
</style>
