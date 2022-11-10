import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import {
    getUserByEmail,
    insertUser,
    insertUserId,
    insertUsername,
    insertUserSession,
} from "../repositories/authRepository.js";

export async function postSignUp(req: Request, res: Response) {
    try {
        const { email, password, username } = req.body;
        const registerUser = await insertUser(email);

        if (registerUser.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este email já está sendo utilizado!");
        }

        const registerUsername = await insertUsername(username);

        if (registerUsername.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este username já está sendo utilizado!");
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        await insertUserId(username, email, passwordHash);

        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function postSignIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const verifyUser = await getUserByEmail(email);

        const validUser = verifyUser.rows[0];
        if (verifyUser.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const passwordValid = bcrypt.compareSync(password, validUser.password);

        if (verifyUser.rows.length != 0 && passwordValid) {
            const token = uuid();
            await insertUserSession(validUser.id, token);

            return res.status(STATUS_CODE.OK).send({
                token: token,
                username: validUser.username,
            });
        } else {
            return res
                .status(STATUS_CODE.UNAUTHORIZED)
                .send("email ou senha inválidos");
        }
    } catch (error) {
        return res.sendStatus(500);
    }
}
