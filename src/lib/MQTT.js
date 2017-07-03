import AWSMqtt from 'aws-mqtt-client'
import { MIC } from '@/lib/MIC'

class MqttClient {
  init (ctx) {
    this.ctx = ctx
    this.topic = null
    this.mqtt = new AWSMqtt({
      region:                 MIC.AWS.config.region,
      accessKeyId:            MIC.AWS.config.credentials.accessKeyId,
      secretAccessKey:        MIC.AWS.config.credentials.secretAccessKey,
      sessionToken:           MIC.AWS.config.credentials.sessionToken,
      endpointAddress:        MIC.manifest.IotEndpoint,
      maximumReconnectTimeMs: 8000,
      protocol:               'wss'
    })
    
    this.mqtt.on('reconnect', () => this.reconnect())
    this.mqtt.on('connect',   () => this.connect())
    this.mqtt.on('close',     () => this.close())
    this.mqtt.on('error',     (e) => this.error(e))
    this.mqtt.on('message',   (topic, message) => this.message(topic, message))
  }

  reconnect () {
    MIC.refreshCredentials().then(() => {
      this.mqtt.updateWebsocketCredentials(
        MIC.AWS.config.credentials.accessKeyId,
        MIC.AWS.config.credentials.secretAccessKey,
        MIC.AWS.config.credentials.sessionToken
      )
    })
    .catch(e => {
      // silent
    })
  }

  connect () {
    this.ctx.bus.$emit('mqtt:connect')
  }

  close () {
    this.ctx.bus.$emit('mqtt:close')
  }

  error (e) {
    this.ctx.bus.$emit('mqtt:error', e)
  }

  subscribe (topic) {
    if (this.topic !== null)
      this.mqtt.unsubscribe(this.topic)

    this.topic = topic
    this.mqtt.subscribe(topic, {qos: 1}, (err, granted) => {
      console.log(err, granted)
    })
    this.ctx.bus.$emit('mqtt:subscribe', topic)
  }

  publish(thing, message) {
    const topic = `thing-update${this.ctx.$store.state['Thing'].thingDomain}${thing}`
    this.mqtt.publish(topic, message)
  }

  message (topic, message) {
    console.log("GOT", message)
    this.ctx.bus.$emit('mqtt:message', topic, JSON.parse(message))
  }

  kill () {
    this.mqtt.end(true)
  }
}

export let MQTT = new MqttClient
