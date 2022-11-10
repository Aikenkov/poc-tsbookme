import { Router } from "express";

import { authRouter } from "./authRoutes.js";
import { bookRouter } from "./booksRoutes";

const router = Router();

router.use(authRouter);
router.use(bookRouter);

export default router;
