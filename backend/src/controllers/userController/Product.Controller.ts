import ProductServices, { productServices } from "../../services/userServices/product.service";
import { productInput } from "../../types/user.types";
import { sendErrorResponse, sendResponse } from "../../utils/ResponseHandler"
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { config } from "../../utils/constant";


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
                message: 'Product Deleted Successfully',
                data: updatedProduct,
                statusCode: 200
            });
            return

        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async sendItemsReport(req: Request, res: Response): Promise<void> {
        try {
            const { products, email } = req.body; // Receive products data & recipient email

            if (!products || !email) {
                res.status(400).json({ message: "Product data and email are required" });
                return
            }

            // Generate PDF
            const pdfPath = path.join(__dirname, "items_report.pdf");
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(pdfPath);
            doc.pipe(stream);

            doc.fontSize(16).text("Items Report", { align: "center" });
            doc.moveDown();

            // Table Headers
            doc.fontSize(12).text("Product Name  |  Description  |  Quantity  |  Price", {
                underline: true,
            });
            doc.moveDown();

            // Add Products Data
            (products as any[]).forEach(({ name, description, quantity, price }) => {
                doc.text(`${name}  |  ${description}  |  ${quantity}  |  ${price}`);
                doc.moveDown();
            });

            doc.end();

            stream.on("finish", async () => {
                // Configure Nodemailer
                let transporter;
                if (config.MODE === "production") {
                    transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: config.EMAIL,
                            pass: config.PASSWORD,
                        },
                    });
                } else {
                    transporter = nodemailer.createTransport({
                        host: "smtp.ethereal.email",
                        port: 587,
                        auth: {
                            user: config.NODEMAILER_USER,
                            pass: config.NODEMAILER_PASSWORD,
                        },
                    });
                }

                // Email options
                const mailOptions = {
                    from: config.NODEMAILER_USER,
                    to: email,
                    subject: "Items Report",
                    text: "Please find attached the items report.",
                    attachments: [
                        {
                            filename: "items_report.pdf",
                            path: pdfPath,
                        },
                    ],
                };

                // Send email
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: "Items report sent successfully!" });
                return

                // Cleanup: Delete the PDF after sending
                fs.unlinkSync(pdfPath);
            });
        } catch (error) {
            console.error("Error sending items report:", error);
            res.status(500).json({ message: "Error sending email", error });
            return
        }
    };

}

export const productController = new ProductController(productServices)