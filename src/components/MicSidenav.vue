<template lang="pug">
.mic-sidenav
  md-list(v-if="auth")
    md-list-item.md-primary(
      :class="{ active : page == 1 }"
      @click.native="setPage(1)"
    )
        md-icon play_for_work
        span Subscribe
    md-list-item.md-primary(
      :class="{ active : page == 2 }"
      @click.native="setPage(2)"
    )
        md-icon settings_remote
        span Publish
  md-list(v-if="!auth")
    md-list-item.md-primary(
      :class="{ active : page == 0 }"
    )
      md-icon exit_to_app
      span Login
</template>

<script>
export default {
  name: 'MicSidenav',
  methods: {
    setPage (page) {
      this.$store.dispatch('App/page', page)
    }
  }
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

    .active {
      background: rgba(0, 0, 0, .05);
    }

    .md-list-item-container {
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;

      .md-icon {
        width: 10px;
        min-width: 10px;
      }
    }
  }
}
</style>
