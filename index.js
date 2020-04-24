const express = require('express')
const {logger}=require('./startup/logging')
const config=require('config')
const app = express()

const port = process.env.PORT || 8080 

require('./startup/db')()


const server = app.listen(8080, () =>  { console.log("Server listening on port : " , port)})


module.exports = server