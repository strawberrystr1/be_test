import express from 'express'
import router from './routes/index'

const PORT = 5000

const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log('started'))