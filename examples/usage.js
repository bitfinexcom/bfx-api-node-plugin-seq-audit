'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:api:plugins:seq-audit:example')
const { Manager, subscribe } = require('bfx-api-node-core')
const SeqAuditPlugin = require('../')

const SYMBOL = 'tBTCUSD'
const mgr = new Manager({
  transform: true,
  plugins: [SeqAuditPlugin()]
})

mgr.onWS('open', {}, () => debug('connection open'))

// Catch checksum errors
mgr.onWS('ws2:error', {}, (err) => {
  if (err.message.match(/invalid(.*)seq/)) {
    debug('recv invalid seq # error: %s', err.message)
  }
})

const wsState = mgr.openWS()

subscribe(wsState, 'trades', { symbol: SYMBOL })
