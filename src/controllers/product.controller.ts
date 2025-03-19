import { Response, Request } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
    _id: String
    name: String
    price: number
    size: String
}

export const getProduct = async (req: Request, res: Response) => {
    const products: any = await getProductFromDB()
    logger.info(products)
    const {
        params: { id }
    } = req

    // Get detail product
    if (id) {
        logger.info(`Received id: ${id}`)
        logger.info(`Products: ${JSON.stringify(products)}`)
        const filteredProduct = products.filter((product: ProductType) => {
            if (product._id.toString() === id.toString()) {
                return product
            }
        })
        if (filteredProduct.length === 0) {
            logger.info(`Product ${id} Not Found`)
            res.status(404).send({
                status: false,
                statusCode: 404,
                message: `Product ${id} Not Found`,
                data: {}
            })
            return
        }

        logger.info(`Success get product: ${filteredProduct[0].name}`)
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

export const createProduct = (req: Request, res: Response) => {
    const { error, value } = createProductValidation(req.body)
    if (error) {
        logger.error('Validation ERR product-create: ', error.details[0].message)
        res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
        return
    }
    logger.info('Success create new product')
    res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
    return
}
