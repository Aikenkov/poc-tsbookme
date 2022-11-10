import joi from "joi";

const postGameSchema = joi.object({
    name: joi.string().trim().min(1).strict().required(),
    image: joi.string().min(1).required(),
    stockTotal: joi.number().integer().greater(0).required(),
    pricePerDay: joi.number().integer().greater(0).required(),
    categoryId: joi.number().integer().greater(0).required(),
});

export { postGameSchema };
