<template lang="pug">
.mic-output
  .output
    .pre(
      v-for="(item, index) in output"
      :key="index"
      :class="{ s : index % 2 > 0}"
    )
      .num {{ item.time }}
      .message {{ item.message }}
      .clear
</template>

<script>
export default {
  name: 'MicOutput',
  data () {
    return {
      output: []
    }
  },
  methods: {
    pushOutput (message) {
      let d = new Date()

      this.output.push({
        time: `${d.getHours()}:${d.getMinutes()}`,
        message
      })
    }
  },
  created () {
    this.bus.$on('mqtt:connect', () => {
      this.pushOutput('Connected')
    })
    this.bus.$on('mqtt:close', () => {
      this.pushOutput('Connection closed')
    })
    this.bus.$on('mqtt:error', (e) => {
      this.pushOutput(`Error: ${e}`)
    })
    this.bus.$on('mqtt:subscribe', (topic) => {
      this.output = []
      this.pushOutput(`Subscribing to topic: ${topic}`)
    })
    this.bus.$on('mqtt:message', (topic, message) => {
      this.pushOutput(message)
    })
  },
  beforeDestroy () {
    this.bus.$off('mqtt:connect')
    this.bus.$off('mqtt:close')
    this.bus.$off('mqtt:error')
  }
}
</script>

<style lang="scss">
.mic-output {
  flex: 1;
  margin: 18px -18px -18px;
  padding: 15px 0 18px;
  background: rgba(0, 0, 0, .02);
  overflow-x: hidden;
  overflow-y: scroll;

  .output {

    .pre {
      margin: 0;
      padding: 3px 18px 0;
      font-size: 10px;
      font-family: monospace;
      display: flex;

      &.s {
        background: rgba(0, 0, 0, .025);
      }

      .num {
        width: 30px;
        margin-right: 12px;
        font-weight: bold;
        float: left;
      }

      .message {
        flex: 1;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: normal;
        line-break: strict;
        hyphens: none;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        float: left;
      }
    }
  }
}
</style>
