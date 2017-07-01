<template lang="pug">
.mic-output
  .md-headline Output
  .output
    pre(
      v-for="(item, index) in output"
      :key="index"
    )
      b {{ '#' + index }}
      | {{ item }}
</template>

<script>
export default {
  name: 'MicOutput',
  data () {
    return {
      output: []
    }
  },
  created () {
    this.bus.$on('mqtt:connect', () => {
      this.output.push('Connected')
    })
    this.bus.$on('mqtt:close', () => {
      this.output.push('Connection closed')
    })
    this.bus.$on('mqtt:error', (e) => {
      this.output.push(`Error: ${e}`)
    })
    this.bus.$on('mqtt:subscribe', (topic) => {
      this.output.push(`Subscribing to topic: ${topic}`)
    })
    this.bus.$on('mqtt:message', (topic, message) => {
      this.output.push(`${message}`)
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
  .output {
    margin: 18px -18px -18px;
    padding: 15px 0 18px;
    background: rgba(0, 0, 0, .05);

    pre {
      margin: 0;
      padding: 3px 18px 0;
      font-size: 10px;
      font-family: monospace;

      b {
        margin-right: 19px;
      }
    }
  }
}
</style>
