<template lang="pug">
.mic-publish
  .settings
    .md-headline Publish
    p Topics exposed by Managed IoT Cloud has the structure: <strong>thing-update/domainPathOfTheThing/thingName</strong>
      md-button.md-icon-button(
        href="https://docs.telenorconnexion.com/mic/cloud-api/thing-update/#thing-update-publishing"
        target="_new"
      )
        md-icon open_in_new
      .clear

    md-input-container
      label Topic
      md-input(
        v-model="topic"
        @keyup.enter.native="publish"
      )
    md-input-container(:class="{ 'md-input-invalid' : invalid }")
      label JSON Payload
      span.md-error Invalid
      md-textarea(v-model="payload")
    md-button.md-raised.md-primary(
      @click.native="publish"
    )
      span Publish
    .clear
</template>

<script>
import { MQTT } from '@/lib/MQTT'

export default {
  name: 'MicPublish',
  data () {
    return {
      topic: 'thing-update/',
      invalid: false,
      payload: `{
  "state": {
    "desired": {
      "key": "value"
    }
  }
}`
    }
  },
  watch: {
    payload () {
      this.invalid = false
    }
  },
  methods: {
    publish () {
      let message = this.tryParse()
      if (message == false) {
        this.invalid = true
        return
      }
      this.invalid = false

      if (this.topic !== null || this.topic !== '')
        MQTT.publish(this.topic, message)
    },
    tryParse () {
      let parsed = false

      try {
        let obj = JSON.parse(this.payload)
        parsed = JSON.stringify(obj)
      } catch (e) {
        // Silent
      }

      return parsed
    }
  },
  created () {
    this.bus.$on('mqtt:publish', (t, m) => {
      // ...
    })
  },
  beforeDestroy () {
    this.bus.$off('mqtt:publish')
  }
}
</script>

<style lang="scss">
.mic-publish {
  height: 100%;
  display: flex;
  flex-direction: column;

  .settings {
    p {
      line-height: 36px;

      strong {
        padding: 2px 6px 3px;
        font-weight: 400;
        font-size: 13px;
        background: rgba(0, 0, 0, .05);
        border-radius: 3px;
      }

      .md-button {
        margin: 13px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  .md-button {
    margin-right: 0;
    float: right;
  }
}
</style>
