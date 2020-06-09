'use strict'

const { definePlugin } = require('bfx-api-node-core')

const onOpenWS = require('./ws/open')
const onCloseWS = require('./ws/close')
const onMessageWS = require('./ws/message')

const Plugin = definePlugin('bfx.seq-audit', {}, (h = {}, args = {}) => ({
  type: 'ws2',
  initialState: {
    lastPubSeq: -1,
    lastAuthSeq: -1
  },

  ws: {
    open: onOpenWS(h, args),
    message: onMessageWS(h, args),
    close: onCloseWS(h, args)
  }
}))

module.exports = Plugin
