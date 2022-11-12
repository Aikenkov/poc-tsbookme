import { Router } from "express";

import { authRouter } from "./authRoutes.js";
import { bookRouter } from "./booksRoutes.js";
import { categoryRouter } from "./categoriesRoutes.js";

const router = Router();

router.use(authRouter);
router.use(bookRouter);
router.use(categoryRouter);

export default router;
