const express = require('express')
const router = require('./router/meetupRouter')

const PORT = 5000

const app = express()

app.use(express.json())
app.use('/meetup', router)

app.listen(PORT, () => console.log('started'))