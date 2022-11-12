import { STATUS_CODE } from "../enums/statusCode.js";
import { Request, Response } from "express";
import { Book, BookEntity } from "../protocols/book.js";
import {
    listAllBooks,
    insertNewBook,
    insertFavoriteBook,
    deleteFavoriteBook,
    markAsRead,
    markAsUnRead,
    listFavoriteBooks,
    listReadedBooks,
    countReadedBooks,
} from "../repositories/booksRepository.js";
import { Count } from "../protocols/count.js";

export async function listBooks(req: Request, res: Response) {
    try {
        const books: BookEntity[] = (await listAllBooks()).rows;
        res.status(STATUS_CODE.OK).send(books);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function insertBook(req: Request, res: Response) {
    const book = req.body as Book;

    try {
        await insertNewBook(book);
        res.status(STATUS_CODE.CREATED).send("Created");
        return;
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
        res.status(STATUS_CODE.CREATED).send("Created");
        return;
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
        res.status(STATUS_CODE.NO_CONTENT).send("Removed");
        return;
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

        res.sendStatus(STATUS_CODE.OK);
        return;
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

        res.sendStatus(STATUS_CODE.OK);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function listUserFavoriteBooks(req: Request, res: Response) {
    const user_id: number = res.locals.user;
    try {
        const books: BookEntity[] = (await listFavoriteBooks(user_id)).rows;
        res.status(STATUS_CODE.OK).send(books);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function listUserReadedBooks(req: Request, res: Response) {
    const user_id: number = res.locals.user;
    try {
        const books: BookEntity[] = (await listReadedBooks(user_id)).rows;
        return res.status(STATUS_CODE.OK).send(books);
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function readedCounter(req: Request, res: Response) {
    const user_id: number = res.locals.user;
    try {
        const count: Count = (await countReadedBooks(user_id)).rows[0];
        res.status(STATUS_CODE.OK).send(count);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
