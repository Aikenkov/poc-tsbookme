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

export async function postSignUp(req: Request, res: Response) {
    try {
        const user = req.body as User;
        const registerUser = await insertUser(user.email);

        if (registerUser.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este email já está sendo utilizado!");
        }

        const registerUsername = await insertUsername(user.username);

        if (registerUsername.rows.length != 0) {
            return res
                .status(STATUS_CODE.CONFLICT)
                .send("Este username já está sendo utilizado!");
        }

        const passwordHash = bcrypt.hashSync(user.password, 10);
        await insertUserId(user.username, user.email, passwordHash);

        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function postSignIn(req: Request, res: Response) {
    try {
        const user = req.body as UserLogin;
        const verifyUser = await getUserByEmail(user.email);

        const validUser: UserEntity = verifyUser.rows[0];
        if (verifyUser.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const passwordValid = bcrypt.compareSync(
            user.password,
            validUser.password
        );

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
