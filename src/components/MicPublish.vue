<template lang="pug">
.mic-publish
  .settings
    .md-headline Publish
    p Topics exposed by Managed IoT Cloud has the structure: <strong>thing-update/domainPathOfTheThing/thingName</strong> <a href="https://docs.telenorconnexion.com/mic/cloud-api/thing-update/#thing-update-publishing" target="_new">Read more here.</a>

    md-input-container
      label Topic
      md-input(
        v-model="topic"
        @keyup.enter.native="publish"
      )
    md-input-container
      label Payload
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
      payload: ''
    }
  },
  methods: {
    publish () {
      let message = this.tryParse()
      console.log('B', message)

      if (this.topic !== null || this.topic !== '' && message !== false)
        MQTT.publish(this.topic, message)
    },
    tryParse () {
      let parsed = false

      try {
        console.log('A', this.payload)
        let obj = JSON.parse(this.payload)
        parsed = JSON.stringify(obj)

        //var string = "{firstName:'name1', lastName:'last1'}";
        //eval('var obj='+string);
        //alert(obj.firstName);
      } catch (e) {
        console.log(e)
      }

      return parsed
    }
  },
  created () {
    this.bus.$on('mqtt:publish', (t, m) => {
      console.log('DONE', t, m)
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
