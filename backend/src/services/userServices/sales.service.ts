import { ISalesServiceMethods } from "../../interface/service.Interface/sales.service.interface"
import { ISale } from "../../models/Sales.Model"
import CustomerRepository from "../../repositories/userRepository/customer.repository"
import ProductRepository from "../../repositories/userRepository/product.repository"
import SalesRepository from "../../repositories/userRepository/sales.repository"
import { salesInput } from "../../types/user.types"


export default class SalesServices implements ISalesServiceMethods {
    private salesRepository: SalesRepository

    constructor(salesRepository: SalesRepository) {
        this.salesRepository = salesRepository
    }
    async getSales(query: any): Promise<{ sales: ISale[]; totalSales: number }> {
        try {
            const sales = await this.salesRepository.getSales(query)
            return sales
        } catch (error) {
            throw error
        }
    }
    async addSales(data: salesInput): Promise<ISale> {
        try {
            const addSale = await this.salesRepository.addSales(data)
            return addSale
        } catch (error: unknown) {
            throw error
        }
    }
}
const productRepository = new ProductRepository()
const customerRepository = new CustomerRepository()
const salesRepository = new SalesRepository(productRepository, customerRepository)
export const salesServices = new SalesServices(salesRepository)
