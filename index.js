'use strict'

require('dotenv-flow').config()
const app = require('express')()
const { makeExecutableSchema } = require('graphql-tools')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const PORT = process.env.PORT
const resolvers = require('./lib/resolvers')

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({ schema, rootValue: resolvers, graphiql: true }))
app.listen(PORT, () => console.log('YA INICIE EL PUERTO'))
