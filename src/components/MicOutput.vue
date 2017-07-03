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
      this.output = []
      this.pushOutput('MQTT client connected, please select a topic.')
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

      &.s {
        background: rgba(0, 0, 0, .025);
      }

      .num {
        max-width: 30px;
        font-weight: bold;
        position: relative;
        float: left;
      }

      .message {
        padding-left: 42px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: normal;
        line-break: strict;
        hyphens: none;
        -webkit-hyphens: none;
        -moz-hyphens: none;
      }
    }
  }
}
</style>
