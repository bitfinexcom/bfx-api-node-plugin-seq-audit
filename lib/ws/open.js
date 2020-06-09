'use strict'

const debug = require('debug')('bfx:api:plugins:seq-audit:ws:open')
const { Config, enableFlag } = require('bfx-api-node-core')

/**
 * Enables sequence numbers on the ws connection
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onWSOpen = (h = {}, args = {}) => ({ state = {} } = {}) => {
  debug('enabling sequence numbers')

  return enableFlag(state, Config.FLAGS.SEQ_ALL)
}

module.exports = onWSOpen
