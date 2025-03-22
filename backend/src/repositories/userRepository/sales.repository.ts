import { ISalesRepositoryMethods } from "../../interface/repository.interface/sales.repository.interface"
import SalesModel, { ISale } from "../../models/Sales.Model"
import { salesInput } from "../../types/user.types"
import BaseRepository from "../base.repository"
import CustomerRepository from "./customer.repository"
import ProductRepository from "./product.repository"
import crypto from "crypto";



export default class SalesRepository extends BaseRepository<{
    Sales: ISale
}> implements ISalesRepositoryMethods {
    private productRepo: ProductRepository;
    private customerRepo: CustomerRepository;

    constructor(productRepo: ProductRepository, customerRepo: CustomerRepository) {
        super({ Sales: SalesModel });
        this.productRepo = productRepo;
        this.customerRepo = customerRepo;
    }


    async getSales(query: any = {}): Promise<{ sales: ISale[]; totalSales: number }> {
        try {
            let { page, limit, search } = query;

            // Convert values to numbers and handle undefined cases
            page = Number(page) > 0 ? Number(page) : undefined;
            limit = Number(limit) > 0 ? Number(limit) : undefined;

            // Construct query object
            const queryObj: any = {};

            if (search) {
                queryObj.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ];
            }

            const totalSales = await this.findAll("Sales", queryObj).countDocuments();

            let salesQuery = this.findAll("Sales", queryObj).sort({ createdAt: -1 });

            // Apply pagination only if page and limit are defined
            if (page && limit) {
                salesQuery = salesQuery.skip((page - 1) * limit).limit(limit);
            }

            const sales = await salesQuery;

            return { sales, totalSales };
        } catch (error) {
            throw error;
        }
    }

    async addSales(data: any): Promise<ISale> {
        const { productId, customerId, quantity, date } = data;

        // Convert quantity to a number (since it might come as a string from frontend)
        const qty = Number(quantity);
        if (qty <= 0) {
            throw new Error("Insufficient quantity");
        }

        if (isNaN(qty)) {
            throw new Error("Invalid quantity");
        }

        // Check if the product exists and has enough stock
        const product = await this.productRepo.findById("Product", productId)
        if (!product) throw new Error("Product not found");
        if (product.quantity < qty) throw new Error("Insufficient stock");

        // Check if customer exists (optional check if `customerId` is provided)
        const customer = await this.customerRepo.findById("Customer", customerId);
        if (!customer) throw new Error("Customer not found");

        // Reduce the stock of the product
        await this.productRepo.updateStock(productId, product.quantity - qty);

        const saleId = crypto.randomBytes(8).toString("hex"); // Generates a 16-character hex string

        const sale: salesInput = {
            saleId,
            productName: product.name,
            customerName: customer.name,
            quantity: qty,
            price: product.price,
            date: date ? new Date(date) : new Date()
        }

        const newSale = await this.createData("Sales", sale)

        return newSale;
    }




}