import { Response, Request } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'

export const getProduct = (req: Request, res: Response) => {
    const products = [
        {
            name: 'sepatu sport',
            price: 500000
        },
        {
            name: 'sepatu vans',
            price: 560000
        },
        {
            name: 'sepatu converse',
            price: 450000
        }
    ]
    const {
        params: { name }
    } = req

    if (name) {
        const filteredProduct = products.filter((product) => {
            if (product.name === name) {
                return product
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
