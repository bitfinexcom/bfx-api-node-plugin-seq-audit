<a name="bfx-api-node-plugin-seq-audit"></a>

## bfx-api-node-plugin-seq-audit() ⇒ <code>bfx-api-node-core.Plugin</code>
This module enables the sequence reporting flag upon connecting, and emits
an `error` event upon receiving an invalid sequence number, for
[bfx-api-node-core](https://github.com/bitfinexcom/bfx-api-node-core).

Note that the `Manager. proxies the event as `ws2:error`. If subscribing on
a socket instance (`wsState.ev.on(...)`) use the internal event name,
otherwise use the manager name with `manager.onWS(...)`.

**Kind**: global function  
**Returns**: <code>bfx-api-node-core.Plugin</code> - pluginState  
**License**: MIT  
**Example**  
```js
const debug = require('debug')('bfx:api:plugins:seq-audit:example')
const { Manager, subscribe } = require('bfx-api-node-core')
const SeqAuditPlugin = require('bfx-api-node-plugin-seq-audit')

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
