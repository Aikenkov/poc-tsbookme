import connection from "../database/database.js";
import { Book } from "../protocols/book.js";
import { QueryResult } from "pg";

export async function listAllBooks(): Promise<QueryResult> {
    return await connection.query(
        `
            SELECT * FROM books;
        `
    );
}

export async function insertNewBook(book: Book): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO books
            (name, image, category_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        [book.name, book.image, book.category_id]
    );
}

export async function insertFavoriteBook(
    book_id: number,
    user_id: number
): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO user_books
            (book_id, user_id)
            VALUES ($1, $2)
        `,
        [book_id, user_id]
    );
}

export async function deleteFavoriteBook(
    id: number,
    user_id: number
): Promise<QueryResult> {
    return await connection.query(
        `
            DELETE FROM user_books WHERE id = $1 AND user_id = $2
        `,
        [id, user_id]
    );
}

export async function markAsRead(
    id: number,
    user_id: number
): Promise<QueryResult> {
    return await connection.query(
        `
            UPDATE user_books SET readed = true WHERE id = $1 AND user_id = $2
        `,
        [id, user_id]
    );
}

export async function markAsUnRead(
    id: number,
    user_id: number
): Promise<QueryResult> {
    return await connection.query(
        `
            UPDATE user_books SET readed = false WHERE id = $1 AND user_id = $2
        `,
        [id, user_id]
    );
}

export async function listReadedBooks(user_id: number): Promise<QueryResult> {
    return await connection.query(
        `
             SELECT * FROM user_books; WHERE readed = true AND user_id = $1
        `,
        [user_id]
    );
}

export async function listFavoriteBooks(user_id: number): Promise<QueryResult> {
    return await connection.query(
        `
             SELECT * FROM user_books; WHERE user_id = $1
        `,
        [user_id]
    );
}
