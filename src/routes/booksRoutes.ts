import { Router } from "express";
import {
    listBooks,
    insertBook,
    favoriteBook,
    unfavoriteBook,
    markBookAsRead,
    markBookAsUnRead,
    listUserReadedBooks,
    listUserFavoriteBooks,
    readedCounter,
} from "../controllers/booksController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { insertBookSchema } from "../schemas/newBookSchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const bookRouter = Router();

bookRouter.get("/book", listBooks);
bookRouter.post("/userbook/:book_id", validateToken, favoriteBook);
bookRouter.delete("/userbook/:id", validateToken, unfavoriteBook);
bookRouter.put("/read/:id", validateToken, markBookAsRead);
bookRouter.put("/unread/:id", validateToken, markBookAsUnRead);
bookRouter.post(
    "/book",
    validateToken,
    validateSchema(insertBookSchema),
    insertBook
);
bookRouter.get("/user/readed", validateToken, listUserReadedBooks);
bookRouter.get("/user/favorite", validateToken, listUserFavoriteBooks);
bookRouter.get("/user/count", validateToken, readedCounter);

export { bookRouter };
