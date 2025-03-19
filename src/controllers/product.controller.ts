import { Response, Request } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductById, getProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const getProduct = async (req: Request, res: Response) => {
    // Get product by id
    const {
        params: { id }
    } = req

    // Get detail product
    if (id) {
        const product = await getProductById(id)
        if (product) {
            logger.info(`Success get product data`)
            res.status(200).send({
                status: true,
                statusCode: 200,
                data: product
            })
            return
        } else {
            logger.info('Product not found')
            res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
            return
        }
    } else {
        // Get all product
        const products: any = await getProductFromDB()
        logger.info('Product list success')
        res.status(200).send({ status: true, statusCode: 200, data: products })
        return
    }
}

export const createProduct = async (req: Request, res: Response) => {
    req.body.product_id = uuidv4()
    const { error, value } = createProductValidation(req.body)
    if (error) {
        logger.error('Validation ERR product-create: ', error.details[0].message)
        res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
        return
    }
    try {
        await addProductToDB(value)
        logger.info('Success create new product')
        res.status(200).send({ status: true, statusCode: 201, message: 'Add new product success' })
        return
    } catch (error) {
        logger.error('Validation ERR product-create: ', error)
        res.status(422).send({ status: false, statusCode: 422, message: error })
        return
    }
}
