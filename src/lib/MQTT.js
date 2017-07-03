import AWSMqtt from 'aws-mqtt-client'
import { MIC } from '@/lib/MIC'

class MqttClient {
  init (ctx) {
    this.ctx = ctx
    this.topic = null
    this.retries = 0
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

    this.retries++
    if (this.retries > 2) {
      this.ctx.bus.$emit('mqtt:message', null, 'Too many retries, closing connection. Is the topic correct?')
      this.retries = 0
      this.kill(() => {
        this.init(this.ctx)
      })
    }
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
      console.log(err)
      this.ctx.bus.$emit('mqtt:subscribe', topic)
    })
  }

  publish(topic, message) {
    this.mqtt.publish(topic, message, {qos: 1}, (err) => {
      console.log(err)
      this.ctx.bus.$emit('mqtt:publish', topic, message)
    })
  }

  message (topic, message) {
    this.ctx.bus.$emit('mqtt:message', topic, message.toString('utf-8'))
  }

  kill (cb = null) {
    this.mqtt.end(true, cb)
  }
}

export let MQTT = new MqttClient
