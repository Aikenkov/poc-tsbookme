import { Router } from "express";
import {
    listBooks,
    insertBook,
    favoriteBook,
    unfavoriteBook,
    markBookAsRead,
    markBookAsUnRead,
} from "../controllers/boooksController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { insertBookSchema } from "../schemas/newBookSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const bookRouter = Router();

bookRouter.get("/book", listBooks);
bookRouter.post("/userbook/:book_id", validateToken, favoriteBook);
bookRouter.delete("/userbook/:book_id", validateToken, unfavoriteBook);
bookRouter.put("/read/:id", validateToken, markBookAsRead);
bookRouter.put("/unread/:id", validateToken, markBookAsUnRead);
bookRouter.post(
    "/book",
    validateToken,
    validateSchema(insertBookSchema),
    insertBook
);

export { bookRouter };
