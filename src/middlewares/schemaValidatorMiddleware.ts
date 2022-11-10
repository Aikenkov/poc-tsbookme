import { STATUS_CODE } from "../enums/statusCode";
import { NextFunction, Request, Response } from "express";
import { MessageName } from "pg-protocol/dist/messages.js";

export function validateSchema(schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const erros = validation.error.details.map(
                (details) => details.message
            );
            return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(erros);
        }
        next();
    };
}
