import joi from "joi";

export const insertBookSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    category_id: joi.number().min(1).required(),
});
