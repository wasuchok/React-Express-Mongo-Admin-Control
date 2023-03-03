const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const { readdirSync, read } = require('fs')
const connectDB = require('./config/db')

const app = express()

// Connect DB MongoDB
connectDB()

app.use(cors())
app.use(bodyParser.json("limit: 20mb"))

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})