/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Config } = require('bfx-api-node-core')
const onWSOpen = require('ws/open')

describe('ws:open', () => {
  it('enables sequencing flag', (done) => {
    const handler = onWSOpen()

    handler({
      state: {
        isOpen: true,
        sendBuffer: [],
        ws: {
          send: (packetJSON) => {
            const packet = JSON.parse(packetJSON)
            assert.strictEqual(packet.event, 'conf')
            assert.strictEqual(packet.flags, Config.FLAGS.SEQ_ALL)
            done()
          }
        },

        ev: { emit: () => {} },
        flags: 0
      }
    })
  })
})
