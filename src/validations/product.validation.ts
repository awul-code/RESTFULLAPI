import Joi from 'joi/lib'
interface ProductInterface {
    name: string
    price: number
    size: string
}

export const createProductValidation = (payload: ProductInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().allow('', null),
        size: Joi.string().required()
    })

    return schema.validate(payload)
}
