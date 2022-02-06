const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')


const dotenv = require('dotenv')
dotenv.config()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello')
})

app.listen(8080, () => {
    console.log('Server is running')
})