import ProductServices, { productServices } from "../../services/userServices/product.service";
import { productInput } from "../../types/user.types";
import { sendErrorResponse, sendResponse } from "../../utils/ResponseHandler"
import { Request, Response } from "express";


export default class ProductController {
    private productServices: ProductServices

    constructor(productServices: ProductServices) {
        this.productServices = productServices
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {

            const query = req.query

            const products = await this.productServices.getProducts(query)
            sendResponse({
                res,
                success: true,
                message: 'Products Fetched Successfully',
                data: products,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const addProduct = await this.productServices.addProduct(data as unknown as productInput)
            sendResponse({
                res,
                success: true,
                message: 'Product Added Successfully',
                data: addProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async editProduct(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const { id } = req.params
            const updatedProduct = await this.productServices.editProduct(id, data as unknown as productInput)
            sendResponse({
                res,
                success: true,
                message: 'Product Added Successfully',
                data: updatedProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const updatedProduct = await this.productServices.deleteProduct(id)
            sendResponse({
                res,
                success: true,
                message: 'Product Added Successfully',
                data: updatedProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

}

export const productController = new ProductController(productServices)