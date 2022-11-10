import joi from "joi";

export const loginSchema = joi.object({
    password: joi.string().required(),
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
});
