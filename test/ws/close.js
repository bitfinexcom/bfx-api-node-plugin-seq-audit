/* eslint-env mocha */
'use strict'

const assert = require('assert')
const onWSClose = require('ws/close')

describe('ws:close', () => {
  it('resets sequence numbers', () => {
    const handler = onWSClose()
    const res = handler()
    const [, stateUpdate] = res

    assert.strictEqual(stateUpdate.lastPubSeq, -1)
    assert.strictEqual(stateUpdate.lastAuthSeq, -1)
  })
})
