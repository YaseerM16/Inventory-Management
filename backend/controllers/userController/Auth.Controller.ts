import UserAuthServices, { userAuthServices } from "../../src/services/userServices/AuthService"
import { sendErrorResponse, sendResponse } from "../../src/utils/ResponseHandler"
import { Request, Response } from "express";

export default class UserAuthController {
    private userAuthServices: UserAuthServices

    constructor(userAuthServices: UserAuthServices) {
        this.userAuthServices = userAuthServices
    }
    async userLogin(req: Request, res: Response): Promise<any> {
        try {
            console.log("THE User Auth Controller HIts ;", req.body);
            const { email, password } = req.body as any

            const loginUser = this.userAuthServices.userLogin(email, password)
            sendResponse({
                res,
                success: true,
                message: 'User Login Successfully',
                data: loginUser,
            })
            return
        } catch (error: unknown) {
            console.log("This is hte error sending ::", error);

            sendErrorResponse(res, (error as Error).message || "Internal Server Error", 500);
            return
        }
    }
}

export const userAuthController = new UserAuthController(userAuthServices)
