'use strict'

const debug = require('debug')('bfx:api:plugins:seq-audit:ws:open')
const { Config, enableFlag } = require('bfx-api-node-core')

/**
 * Enables sequence numbers on the ws connection
 *
 * @param {Object} args
 * @param {Object} args.state
 * @return {Object} nextState - with updated flags
 */
module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
  debug('enabling sequence numbers')

  return enableFlag(state, Config.FLAGS.SEQ_ALL)
}
