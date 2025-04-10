import { Response, Request } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
    addProductToDB,
    deleteProductById,
    getProductById,
    getProductFromDB,
    updateProductById
} from '../services/product.service'
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
        res.status(201).send({ status: true, statusCode: 201, message: 'Add new product success' })
        return
    } catch (error) {
        logger.error('Validation ERR product-create: ', error)
        res.status(422).send({ status: false, statusCode: 422, message: error })
        return
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    const { error, value } = updateProductValidation(req.body)
    if (error) {
        logger.error('Validation ERR product-update: ', error.details[0].message)
        res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
        return
    }

    try {
        const result = await updateProductById(id, value)

        if (result) {
            logger.info('Success update  product')
            res.status(201).send({ status: true, statusCode: 201, message: 'Update product success' })
            return
        } else {
            logger.info('Data not found')
            res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
            return
        }
    } catch (error) {
        logger.error('Validation ERR product-update: ', error)
        res.status(422).send({ status: false, statusCode: 422, message: error })
        return
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req
    try {
        const result = await deleteProductById(id)

        if (result) {
            logger.info('Success delete product')
            res.status(200).send({ status: true, statusCode: 200, message: 'Delete product success' })
            return
        } else {
            logger.info('Data not found')
            res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
            return
        }
    } catch (error) {
        logger.error('Validation ERR product-delete: ', error)
        res.status(422).send({ status: false, statusCode: 422, message: error })
        return
    }
}
