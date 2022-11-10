import connection from "../database/database.js";
import { QueryResult } from "pg";

export async function insertUser(email: string): Promise<QueryResult> {
    return await connection.query(
        `
            SELECT * FROM 
                users
            WHERE
                email=$1;

        `,
        [email]
    );
}

export async function insertUsername(username: string): Promise<QueryResult> {
    return await connection.query(
        `
            SELECT * FROM 
                users
            WHERE
                username=$1;
        `,
        [username]
    );
}

export async function insertUserId(
    username: string,
    email: string,
    passwordHash: string
): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO 
                users(username, email, password)
            VALUES
                ($1, $2, $3)
            RETURNING id    
            ;
        `,
        [username, email, passwordHash]
    );
}

export async function insertUserSession(
    validUser_id: number,
    token: string
): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO 
                sessions(user_id, token)
            VALUES 
                ($1,$2);
        `,
        [validUser_id, token]
    );
}

export async function getUserByEmail(email: string): Promise<QueryResult> {
    return await connection.query(
        `
        SELECT * FROM
            users
        WHERE 
            email=$1;
    `,
        [email]
    );
}
