'use strict'

const debug = require('debug')('bfx:api:plugins:seq-audit:ws:open')

/**
 * Clears internal seq numbers on socket close
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onWSClose = (h = {}, args = {}) => ({ state = {} } = {}) => {
  debug('resetting sequence numbers')

  return [null, {
    lastPubSeq: -1,
    lastAuthSeq: -1
  }]
}

module.exports = onWSClose
