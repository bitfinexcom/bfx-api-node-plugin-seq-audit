/* eslint-env mocha */
'use strict'

const assert = require('assert')
const onWSMessage = require('ws/message')

describe('ws:message', () => {
  it('emits error on invalid public seq #', (done) => {
    let n = 0
    const handler = onWSMessage({
      getState: () => ({
        lastPubSeq: 42,
        lastAuthSeq: -1
      })
    })

    const state = {
      ev: {
        emit: (eventName, data) => {
          if (eventName === 'error') {
            assert(data instanceof Error)
            assert.strictEqual(n, 1)
            done()
          }
        }
      }
    }

    handler({ state, msg: [123, [], 43] })
    n++
    handler({ state, msg: [123, [], 44] }) // will error due to stale state
  })

  it('emits error on invalid auth seq #', (done) => {
    let n = 0
    const handler = onWSMessage({
      getState: () => ({
        lastPubSeq: 30,
        lastAuthSeq: 42
      })
    })

    const state = {
      ev: {
        emit: (eventName, data) => {
          if (eventName === 'error') {
            assert(data instanceof Error)
            assert.strictEqual(n, 1)
            done()
          }
        }
      }
    }

    handler({ state, msg: [0, [], 31, 43] })
    n++
    handler({ state, msg: [0, [], 31, 44] }) // will error due to stale state
  })
})
