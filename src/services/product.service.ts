import ProductType from '../types/product.type'
import productModel from '../models/product.model'
import { logger } from '../utils/logger'

export const addProductToDB = async (payload: ProductType) => {
    return await productModel.create(payload)
}

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
