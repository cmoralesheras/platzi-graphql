'use strict'
const connectDb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  createCourse: async (root, { input }) => {
    try {
      const defaults = {
        teacher: '',
        topic: ''
      }
      const newCourse = Object.assign(defaults, input)
      const db = await connectDb()
      const course = await db.collection('courses').insertOne(newCourse)
      input._id = course.insertedId
      return input
    } catch (error) {
      console.log(error)
    }
  },
  editCourse: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('courses').updatedOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      const resultado = await db.collection('courses').findOne({ _id: ObjectID(_id) })
      return resultado
    } catch (error) {
      console.log(error)
    }
  },
  createStudent: async (root, { input }) => {
    try {
      const defaults = {
        email: '',
        name: ''
      }
      const newStudent = Object.assign(defaults, input)
      const db = await connectDb()
      const student = await db.collection('students').insertOne(newStudent)
      input._id = student.insertedId
      return input
    } catch (error) {
      console.log(error)
    }
  },
  editStudent: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      const student = await db.collection('students').findOne({ _id: ObjectID(_id) })
      return student
    } catch (error) {
      console.log(error)
    }
  }
}
