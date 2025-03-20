import { Router } from "express";
import { Request, Response } from "express";
import { userAuthController } from "../controllers/userController/Auth.Controller";

const router = Router();

router.post('/login', (req: Request, res: Response) => userAuthController.userLogin(req, res));

export const userRouter = router;
