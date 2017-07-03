<template lang="pug">
.mic-container
  slot
</template>

<script>
export default {
  name: 'MicContainer'
}
</script>

<style lang="scss" scoped>
.mic-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding-top: 64px;
  position: relative;
  display: flex;
}
</style>
