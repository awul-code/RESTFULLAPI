import { Response, Request } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import ProductType from '../types/product.type'

export const getProduct = async (req: Request, res: Response) => {
    const products: any = await getProductFromDB()
    logger.info(products)
    const {
        params: { name }
    } = req

    // Get detail product
    if (name) {
        logger.info(`Received id: ${name}`)
        logger.info(`Products: ${JSON.stringify(products)}`)
        const filteredProduct = products.filter((product: ProductType) => {
            if (product.name === name) {
                return product
            }
        })
        if (filteredProduct.length === 0) {
            logger.info(`Product ${name} Not Found`)
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: `Product ${name} Not Found`,
                data: {}
            })
            return
        }

        logger.info(`Success get product: ${name}`)
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: 'Success get product',
            data: filteredProduct[0]
        })
        return
    }

    // Get all product
    logger.info('Product list success')
    res.status(200).send({ status: true, statusCode: 200, data: products })
    return
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
