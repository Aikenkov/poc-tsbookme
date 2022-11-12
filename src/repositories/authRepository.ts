import connection from "../database/database.js";
import { QueryResult } from "pg";
import { User, UserEntity } from "../protocols/user.js";
import { Session } from "../protocols/session.js";

export async function insertUser(
    email: string
): Promise<QueryResult<UserEntity>> {
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

export async function insertUsername(
    username: string
): Promise<QueryResult<UserEntity>> {
    return await connection.query(
        `
            SELECT * FROM 
                users
            WHERE
                name = $1;
        `,
        [username]
    );
}

export async function insertUserId(
    name: string,
    email: string,
    passwordHash: string
): Promise<QueryResult> {
    return await connection.query(
        `
            INSERT INTO 
                users(name, email, password)
            VALUES
                ($1, $2, $3)
            RETURNING id    
            ;
        `,
        [name, email, passwordHash]
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

export async function getSessionByToken(
    token: string
): Promise<QueryResult<Session>> {
    return connection.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);
}

export async function getUserByEmail(
    email: string
): Promise<QueryResult<UserEntity>> {
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
