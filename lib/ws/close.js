'use strict'

const debug = require('debug')('bfx:api:plugins:seq-audit:ws:open')

/**
 * Clears internal seq numbers on socket close
 *
 * @param {Object} args
 * @param {Object} args.state
 * @return {Array} update
 */
module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
  debug('resetting sequence numbers')

  return [null, {
    lastPubSeq: -1,
    lastAuthSeq: -1
  }]
}
