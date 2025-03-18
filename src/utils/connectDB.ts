import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

mongoose
    .connect(`${config.db}`)
    .then(() => {
        logger.info('Success connect to database')
    })
    .catch((err) => {
        logger.info('Error connect to database', err)
        logger.info(err)
        process.exit(1)
    })
