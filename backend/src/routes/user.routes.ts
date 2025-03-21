import { Router } from "express";
import { Request, Response } from "express";
import { userAuthController } from "../controllers/userController/Auth.Controller";
import { productController } from "../controllers/userController/Product.Controller";

const router = Router();

router.post('/login', (req: Request, res: Response) => userAuthController.userLogin(req, res));

//product CRUD
// router.post("/product/add", (req: Request, res: Response) => productController.addProduct(req,res));
router.post("/product/add", (req, res) => productController.addProduct(req, res));
router.get("/products", (req, res) => productController.getProducts(req, res))
router.put("/product/:id/edit", (req, res) => productController.editProduct(req, res))
router.delete("/product/:id/delete", (req, res) => productController.deleteProduct(req, res))

export const userRouter = router;
