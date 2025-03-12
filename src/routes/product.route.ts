import { NextFunction, Request, Response, Router } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info('Product list success')
    res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu Sport', price: 500000 }] })
    return
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createProductValidation(req.body)
    if (error) {
        logger.error('Validation ERR product-create: ', error.details[0].message)
        res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
        return
    }
    logger.info('Success create new product')
    res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
    return
})
