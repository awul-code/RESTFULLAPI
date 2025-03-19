import Joi from 'joi/lib'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().allow('', null),
        size: Joi.string().required()
    })

    return schema.validate(payload)
}
