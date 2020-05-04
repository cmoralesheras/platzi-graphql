'use strict'
const { MongoClient } = require('mongodb')

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
let connection

async function connectDB () {
  if (connection) return connection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
    // connection = client.db(DB_NAME)
    connection = client.db()

    return connection
  } catch (error) {
    console.log('Could not connect to db', mongoUrl, error.message)
    process.exit(1)
  }
}

module.exports = connectDB
