<template lang="pug">
.mic-sidenav
  md-list.wide(v-if="auth")
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
  md-list.wide(v-if="!auth")
    md-list-item.md-primary(
      :class="{ active : page == 0 }"
    )
      md-icon exit_to_app
      span Login

  md-sidenav.md-left.md-fixed(ref="sidenav")
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
        @click="$refs.sidenav.close()"
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
      this.$refs.sidenav.close()
    }
  },
  created () {
    this.bus.$on('mic:sidenav', (state) => {
      if (state)
        this.$refs.sidenav.open()
      else
        this.$refs.sidenav.close()
    })
  }
}
</script>

<style lang="scss">
.mic-sidenav {
  width: 262px;

  @media (max-width: 959px) {
    width: 0;
  }

  .md-list {
    background: transparent !important;

    &.wide {
      @media (max-width: 959px) {
        display: none;
      }
    }

    .active .md-list-item-container {
      color: #03a9f4 !important;
      //background: rgba(0, 0, 0, .05);

      .md-icon {
        color: #03a9f4 !important;
      }
    }

    .md-list-item-container {
      color: rgba(0, 0, 0, 0.87) !important;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;

      .md-icon {
        width: 10px;
        min-width: 10px;
        color: rgba(0, 0, 0, 0.87) !important;
      }
    }
  }

  .md-sidenav {
    @media (min-width: 959px) {
      display: none;
    }
  }
}
</style>
