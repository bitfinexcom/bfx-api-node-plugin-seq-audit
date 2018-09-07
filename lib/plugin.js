'use strict'

const { definePlugin } = require('bfx-api-node-core')

const onOpenWS = require('./ws/open')
const onCloseWS = require('./ws/close')
const onMessageWS = require('./ws/message')

/**
 * Enables sequence numbers on all ws2 clients, and emits errors on mis-match
 */
module.exports = definePlugin('bfx.seq-audit', {}, (h = {}, args = {}) => ({
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
