import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { insertCategorySchema } from "../schemas/newCategorySchema.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import {
    deleteCategory,
    insertCategory,
    listAllCategories,
} from "../controllers/categoriesController.js";

const categoryRouter = Router();

categoryRouter.post(
    "/category",
    validateSchema(insertCategorySchema),
    validateToken,
    insertCategory
);
categoryRouter.delete("/category/:id", validateToken, deleteCategory);
categoryRouter.get("/category", listAllCategories);

export { categoryRouter };
