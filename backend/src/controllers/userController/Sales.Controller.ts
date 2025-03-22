import SalesServices, { salesServices } from "../../services/userServices/sales.service";
import { salesInput } from "../../types/user.types";
import { sendErrorResponse, sendResponse } from "../../utils/ResponseHandler";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { config } from "../../utils/constant";
config

salesServices

export default class SalesController {
    private salesServices: SalesServices

    constructor(salesServices: SalesServices) {
        this.salesServices = salesServices
    }

    async getSales(req: Request, res: Response): Promise<void> {
        try {

            const query = req.query

            const sales = await this.salesServices.getSales(query)
            sendResponse({
                res,
                success: true,
                message: 'Sales Fetched Successfully',
                data: sales,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }

    async addSaleRecord(req: Request, res: Response): Promise<void> {
        try {

            const saleRecord = await this.salesServices.addSales(req.body as unknown as salesInput)
            sendResponse({
                res,
                success: true,
                message: 'Sales Added Successfully',
                data: saleRecord,
                statusCode: 200
            });
            return
        } catch (error) {
            sendErrorResponse(res, (error as Error).message || 'Internal Server Error', 500)
            return
        }
    }
    async sendSalesReport(req: Request, res: Response): Promise<void> {
        try {
            const { sales, email } = req.body; // Expect sales data & recipient email from frontend


            if (!sales || !email) {
                console.log("ITZZ hereeee returning :", email, sales);
                res.status(400).json({ message: "Sales data and email are required" });
                return
            }

            // Generate PDF
            const pdfPath = path.join(__dirname, "sales_report.pdf");
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(pdfPath);
            doc.pipe(stream);

            doc.fontSize(16).text("Sales Report", { align: "center" });
            doc.moveDown();

            // Table Headers
            doc.fontSize(12).text("Sale ID  |  Product Name  |  Customer Name  |  Quantity  |  Price  |  Date", {
                underline: true,
            });
            doc.moveDown();

            // Add Sales Data
            (sales as any[]).forEach(({ saleId, productName, customerName, quantity, price, date }) => {
                doc.text(`${saleId}  |  ${productName}  |  ${customerName || "Cash"}  |  ${quantity}  |  ${price}  |  ${new Date(date).toLocaleDateString()}`);
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
                    subject: "Sales Report",
                    text: "Please find attached the sales report.",
                    attachments: [
                        {
                            filename: "sales_report.pdf",
                            path: pdfPath,
                        },
                    ],
                };

                // Send email
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: "Sales report sent successfully!" });
                return

                // Cleanup: Delete the PDF after sending
                fs.unlinkSync(pdfPath);
            });
        } catch (error) {
            console.error("Error sending sales report:", error);
            res.status(500).json({ message: "Error sending email", error });
            return
        }
    };
}

export const salesController = new SalesController(salesServices)