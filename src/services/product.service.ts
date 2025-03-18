import productModel from '../models/product.model'
import { logger } from '../utils/logger'

export const getProductFromDB = async () => {
    return await productModel
        .find()
        .then((data) => {
            return data
        })
        .catch((err) => {
            logger.info('Cannot get product from database')
            logger.error(err)
        })
}
