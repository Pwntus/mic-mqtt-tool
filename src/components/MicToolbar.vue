<template lang="pug">
.mic-toolbar
  md-whiteframe(
    md-tag="md-toolbar"
    md-elevation="1"
  )
    .md-toolbar-container
      md-button.md-icon-button.menu(
        @click="$refs.sidenav.toggle()"
      )
        md-icon menu
      h2.md-title MIC MQTT Tool
      span(style="flex:1")
</template>

<script>
export default {
  name: 'MicToolbar'
}
</script>

<style lang="scss" scoped>
.mic-toolbar {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .md-toolbar-container {
    width: 1184px;
    margin: 0 auto;
  }

  @media (min-width: 960px) {
    .menu {
      display: none;
    }

    .md-title {
      margin-left: 8px;
    }
  }
}
</style>
