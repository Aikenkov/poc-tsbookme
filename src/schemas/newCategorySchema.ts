import joi from "joi";

export const insertCategorySchema = joi.object({
    name: joi.string().trim().min(1).strict().required(),
});
