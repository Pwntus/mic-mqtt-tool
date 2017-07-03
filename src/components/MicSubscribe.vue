<template lang="pug">
.mic-subscribe
  .settings
    .md-headline Subscribe
    p Topics exposed by Managed IoT Cloud has the structure: <strong>thing-update/domainPathOfTheThing/thingName</strong> <a href="https://docs.telenorconnexion.com/mic/cloud-api/thing-update/#thing-update-subscription" target="_new">Read more here.</a>

    md-input-container
      label Topic
      md-input(
        v-model="topic"
        @keyup.enter.native="subscribe"
      )
    md-button.md-raised.md-primary(
      @click.native="subscribe"
    )
      span Subscribe
    .clear

  .md-headline Output
  mic-output
</template>

<script>
import MicOutput from '@/components/MicOutput'
import { MQTT } from '@/lib/MQTT'

export default {
  name: 'MicSubscribe',
  components: { MicOutput },
  data () {
    return {
      topic: 'thing-update/'
    }
  },
  methods: {
    subscribe () {
      if (this.topic !== null || this.topic !== '')
        MQTT.subscribe(this.topic)
    }
  }
}
</script>

<style lang="scss">
.mic-subscribe {
  height: 100%;
  display: flex;
  flex-direction: column;

  strong {
    padding: 2px 6px 3px;
    font-weight: 400;
    font-size: 13px;
    background: rgba(0, 0, 0, .05);
    border-radius: 3px;
  }

  .md-button {
    margin-right: 0;
    float: right;
  }
}
</style>
