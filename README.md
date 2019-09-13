# Bitfinex Node API Sequence Number Audit Plugin

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-seq-audit.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-seq-audit)

This plugin enables the sequence reporting flag upon connecting, and emits an `error` event upon receiving an invalid sequence number.

Note that the manager proxies the event as `ws2:error`. If subscribing on a socket instance (`wsState.ev.on(...)`) use the internal event name, otherwise use the manager name with `manager.onWS(...)`.

### Example
```js
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
```
