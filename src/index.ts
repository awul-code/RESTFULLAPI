import express from 'express'
import type { Application } from 'express'
import { routes } from './routes/index.route'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
// Connect to mongodb
import './utils/connectDB'

const app: Application = express()
const port: number = 4000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

routes(app)

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
