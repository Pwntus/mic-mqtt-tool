<template lang="pug">
.mic-subscribe
  .md-headline Subscribe
  p Topics exposed by <b>Managed IoT Cloud</b> has the structure: <strong>thing-update/domainPathOfTheThing/thingName</strong>. <a href="https://docs.telenorconnexion.com/mic/cloud-api/thing-update/#thing-update-subscription" target="_new">Read more here.</a>

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
  .output
    pre kjnwedkjnjkj kjewndkjw ed wekjdn
    pre kjnwedkjnjkj kjewndkjw ed wekjdn
    pre kjnwedkjnjkj kjewndkjw ed wekjdn
</template>

<script>
export default {
  name: 'MicSubscribe',
  data () {
    return {
      topic: 'thing-update/'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.mic-subscribe {
  height: 100%;

  strong {
    padding: 2px 4px;
    font-weight: 400;
    font-size: 13px;
    background: rgba(0, 0, 0, .04);
    color: #555;
  }

  .md-button {
    margin-right: 0;
    float: right;
  }

  .output {
    margin: 18px -18px -18px;
    background: rgba(0, 0, 0, .04);
    border-top: 1px solid #DEDEDE;

    pre {
      margin: 0;
      padding: 10px 18px;
      font-size: 10px;
      font-family: monospace;
      border-bottom: 1px solid #DEDEDE;
    }
  }
}
</style>
