# Bitfinex Sequence Number Audit Plugin for the Node.JS API

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-seq-audit.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-api-node-plugin-seq-audit)

This plugin enables the sequence reporting flag upon connecting, and emits an `error` event upon receiving an invalid sequence number.

Note that the manager proxies the event as `ws2:error`. If subscribing on a socket instance (`wsState.ev.on(...)`) use the internal event name, otherwise use the manager name with `manager.onWS(...)`.

### Features

* Automatically enables sequence numbers on all connections
* Emits a `ws2:error` event in case of sequence number miss-match

### Installation

```bash
npm i --save bfx-api-node-plugin-seq-audit
```

### Quickstart & Example
```js
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

### Docs

For an executable example, [see `examples/usage.js`](/examples/usage.js)

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
