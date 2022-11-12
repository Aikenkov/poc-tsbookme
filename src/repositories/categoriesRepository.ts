import connection from "../database/database.js";
import { QueryResult } from "pg";
import { Category, CategoryEntity } from "../protocols/category.js";

export async function listAllBooks(): Promise<QueryResult> {
    return await connection.query(
        `
            SELECT * FROM books;
        `
    );
}

export async function insertNewCategory(
    category: Category
): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO categories
            (name)
            VALUES ($1)
        `,
        [category.name]
    );
}

export async function removeCategory(id: number): Promise<QueryResult> {
    return await connection.query(
        `
            DELETE FROM categories WHERE id = $1
        `,
        [id]
    );
}

export async function listCategories(): Promise<QueryResult<CategoryEntity>> {
    return await connection.query(
        `
            SELECT * FROM categories;
        `
    );
}
