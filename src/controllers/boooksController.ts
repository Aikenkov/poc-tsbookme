import { STATUS_CODE } from "../enums/statusCode.js";
import { Request, Response } from "express";
import { Book } from "../protocols/book.js";
import {
    listAllBooks,
    insertNewBook,
    insertFavoriteBook,
    deleteFavoriteBook,
    markAsRead,
    markAsUnRead,
} from "../repositories/booksRepository.js";

export async function listBooks(req: Request, res: Response) {
    try {
        const books = await listAllBooks();
        return res.status(STATUS_CODE.OK).send(books.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function insertBook(req: Request, res: Response) {
    const book = req.body as Book;

    try {
        await insertNewBook(book);
        return res.status(STATUS_CODE.CREATED).send("Created");
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function favoriteBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const user_id: number = res.locals.user;

    try {
        await insertFavoriteBook(Number(book_id), user_id);
        return res.status(STATUS_CODE.CREATED).send("Created");
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function unfavoriteBook(req: Request, res: Response) {
    const { id } = req.params;
    const user_id: number = res.locals.user;

    try {
        await deleteFavoriteBook(Number(id), user_id);
        return res.status(STATUS_CODE.NO_CONTENT).send("Removed");
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function markBookAsRead(req: Request, res: Response) {
    const { id } = req.params;
    const user_id: number = res.locals.user;

    try {
        await markAsRead(Number(id), user_id);
        return res.status(STATUS_CODE.OK);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function markBookAsUnRead(req: Request, res: Response) {
    const { id } = req.params;
    const user_id: number = res.locals.user;

    try {
        await markAsUnRead(Number(id), user_id);
        return res.status(STATUS_CODE.OK);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
