import { Router } from "express";
import { Request, Response } from "express";
import { userAuthController } from "../controllers/userController/Auth.Controller";
import { productController } from "../controllers/userController/Product.Controller";
import { customerController } from "../controllers/userController/Customer.Controller";

const router = Router();

router.post('/login', (req: Request, res: Response) => userAuthController.userLogin(req, res));

//product CRUD
router.post("/product/add", (req, res) => productController.addProduct(req, res));
router.get("/products", (req, res) => productController.getProducts(req, res))
router.put("/product/:id/edit", (req, res) => productController.editProduct(req, res))
router.delete("/product/:id/delete", (req, res) => productController.deleteProduct(req, res))

//customer CRUD

router.post("/customer/add", (req, res) => customerController.addCustomer(req, res))
router.get("/customers", (req, res) => customerController.getCustomers(req, res))
router.put("/customer/:id/edit", (req, res) => customerController.editCustomer(req, res))
router.delete("/customer/:id/delete", (req, res) => customerController.deleteCustomer(req, res))


export const userRouter = router;
