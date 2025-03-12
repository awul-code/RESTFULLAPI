import express from 'express'
import type { Application } from 'express'
import { routes } from './routes/index'
import { logger } from './utils/logger'

const app: Application = express()
const port: number = 4000

routes(app)

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
