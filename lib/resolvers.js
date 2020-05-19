'use strict'

const Mutation = require('./mutations')
const Query = require('./querys')
const types = require('./types')

module.exports = {
  Mutation,
  Query,
  ...types
}
