import CustomerServices, { customerServices } from "../../services/userServices/customer.service";
import { customerInput } from "../../types/user.types";
import { sendErrorResponse, sendResponse } from "../../utils/ResponseHandler";
import { Request, Response } from "express";


export default class CustomerController {
    private customerServices: CustomerServices

    constructor(customerServices: CustomerServices) {
        this.customerServices = customerServices
    }

    async getCustomers(req: Request, res: Response): Promise<void> {
        try {

            const query = req.query

            const customers = await this.customerServices.getCustomers(query)
            sendResponse({
                res,
                success: true,
                message: 'Customers Fetched Successfully',
                data: customers,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }


    async addCustomer(req: Request, res: Response): Promise<void> {
        try {
            const customer = await this.customerServices.addCustomer(req.body as unknown as customerInput)
            sendResponse({
                res,
                success: true,
                message: 'Products Fetched Successfully',
                data: customer,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async editCustomer(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const { id } = req.params
            const updatedCustomer = await this.customerServices.editCustomer(id, data as unknown as customerInput)
            sendResponse({
                res,
                success: true,
                message: 'Product Added Successfully',
                data: updatedCustomer,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const updatedCustomer = await this.customerServices.deleteCustomer(id)
            sendResponse({
                res,
                success: true,
                message: 'Customer Deleted Successfully',
                data: updatedCustomer,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }
}

export const customerController = new CustomerController(customerServices)