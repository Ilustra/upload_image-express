require('dotenv').config();

const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'))

app.use("/files", express.static(path.resolve(__dirname,'..', 'tmp', 'uploads')))

require('./app/controller/index')(app);


app.listen(4020)