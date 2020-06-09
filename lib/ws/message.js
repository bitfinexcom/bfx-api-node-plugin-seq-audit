'use strict'

const _isArray = require('lodash/isArray')
const _isFinite = require('lodash/isFinite')

/**
 * Maintains internal lastPubSeq & lastAuthSeq, and emits errors upon
 * receival of an invalid seq #
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onWSMessage = (h = {}) => ({ state = {}, msg = [] } = {}) => {
  const { ev } = state
  const { getState } = h
  const { lastPubSeq, lastAuthSeq } = getState(state)

  if (!_isArray(msg) || msg.length === 0) {
    return null
  }

  // The auth sequence # is the last value in channel 0 non-heartbeat packets.
  const authSeq = msg[0] === 0 && msg[1] !== 'hb'
    ? msg[msg.length - 1]
    : NaN

  // All other packets provide a public sequence # as the last value. For chan
  // 0 packets, these are included as the 2nd to last value
  const seq = (
    (msg[0] === 0) &&
    (msg[1] !== 'hb') &&
    !(msg[1] === 'n' && msg[2][6] === 'ERROR') // error notifications lack seq
  )
    ? msg[msg.length - 2]
    : msg[msg.length - 1]

  if (!_isFinite(seq)) {
    return null
  }

  const update = {
    lastPubSeq: seq
  }

  if (lastPubSeq === -1) { // first pub seq received
    return [null, update]
  }

  if (seq !== lastPubSeq + 1) { // check pub seq
    const err = new Error(`invalid seq #; last ${lastPubSeq}, got ${seq}`)

    ev.emit('error', err)
    return [null, update]
  }

  if (
    (!_isFinite(authSeq)) || // no auth seq on packet
    (authSeq === 0) || // still syncing
    (msg[1] === 'n' && msg[2][6] === 'ERROR') || // err notifications lack seq
    (authSeq === lastAuthSeq) // seq didn't advance
  ) {
    return [null, update]
  }

  // check
  if (lastAuthSeq !== -1 && authSeq !== lastAuthSeq + 1) {
    const err = new Error(
      `invalid auth seq #; last ${lastAuthSeq}, got ${authSeq}`
    )

    ev.emit('error', err)
    return [null, update]
  }

  update.lastAuthSeq = authSeq

  return [null, update]
}

module.exports = onWSMessage
