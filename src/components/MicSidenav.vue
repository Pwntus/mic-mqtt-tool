<template lang="pug">
.mic-sidenav
  md-list
    md-list-item
      span Subscribe
    md-list-item
      span Publish
</template>

<script>
export default {
  name: 'MicSidenav'
}
</script>

<style lang="scss">
.mic-sidenav {
  width: 262px;

  @media (max-width: 959px) {
    display: none;
  }

  .md-list {
    background: transparent;

    .md-list-item-container {
      cursor: pointer;

      &:hover {
        color: #29b6f6;
      }
    }
  }
}
</style>
