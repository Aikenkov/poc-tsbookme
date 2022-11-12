import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User, UserEntity, UserLogin } from "../protocols/user.js";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getUserByEmail,
    insertUser,
    insertUserId,
    insertUsername,
    insertUserSession,
} from "../repositories/authRepository.js";
import { QueryResult } from "pg";

export async function postSignUp(req: Request, res: Response) {
    try {
        const user = req.body as User;
        const registerUser: QueryResult<UserEntity> = await insertUser(
            user.email
        );

        if (registerUser.rowCount != 0) {
            res.status(STATUS_CODE.CONFLICT).send(
                "Este email já está sendo utilizado!"
            );
            return;
        }

        const registerUsername: QueryResult<UserEntity> = await insertUsername(
            user.name
        );

        if (registerUsername.rowCount != 0) {
            res.status(STATUS_CODE.CONFLICT).send(
                "Este username já está sendo utilizado!"
            );
            return;
        }

        const passwordHash: string = bcrypt.hashSync(user.password, 10);

        await insertUserId(user.name, user.email, passwordHash);
        res.sendStatus(STATUS_CODE.CREATED);
        return;
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return;
    }
}

export async function postSignIn(req: Request, res: Response) {
    try {
        const user = req.body as UserLogin;
        const verifyUser: QueryResult<UserEntity> = await getUserByEmail(
            user.email
        );

        const validUser: UserEntity = verifyUser.rows[0];
        if (verifyUser.rows.length === 0) {
            res.sendStatus(STATUS_CODE.UNAUTHORIZED);
            return;
        }

        const passwordValid: boolean = bcrypt.compareSync(
            user.password,
            validUser.password
        );

        if (verifyUser.rows.length != 0 && passwordValid) {
            const token: string = uuid();
            await insertUserSession(validUser.id, token);

            res.status(STATUS_CODE.OK).send({
                token: token,
                name: validUser.name,
            });
            return;
        } else {
            res.status(STATUS_CODE.UNAUTHORIZED).send(
                "email ou senha inválidos"
            );
            return;
        }
    } catch (error) {
        return res.sendStatus(500);
    }
}
