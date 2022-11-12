import { STATUS_CODE } from "../enums/statusCode.js";
import { Request, Response } from "express";
import { Category } from "../protocols/category.js";
import {
    insertNewCategory,
    removeCategory,
} from "../repositories/categoriesRepository.js";

export async function insertCategory(req: Request, res: Response) {
    const category = req.body as Category;

    try {
        await insertNewCategory(category);
        res.status(STATUS_CODE.OK).send("created");
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await removeCategory(Number(id));
        res.status(STATUS_CODE.OK).send("removed");
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
