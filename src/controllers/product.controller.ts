import { Response, Request } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
    product_id: string
    name: string
    price: number
    size: string
}

export const getProduct = async (req: Request, res: Response) => {
    const product: any = await getProductFromDB()

    const {
        params: { name }
    } = req

    // Get detail product
    if (name) {
        const filteredProduct = product.filter((productDetail: ProductType) => {
            if (productDetail.name === name) {
                return productDetail
            }
        })
        if (filteredProduct.length === 0) {
            logger.info(`Product ${name} Not Found`)
            res.status(404).send({ status: false, statusCode: 404, message: `Product ${name} Not Found`, data: {} })
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
    res.status(200).send({ status: true, statusCode: 200, data: product })
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
