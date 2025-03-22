import { ISale } from "../../models/Sales.Model"
import { salesInput } from "../../types/user.types"

export interface ISalesRepositoryMethods {
    addSales(data: salesInput): Promise<ISale>
    getSales(query: any): Promise<{ sales: ISale[], totalSales: number }>
    // editCustomer(customerId: string, data: customerInput): Promise<ICustomer>
    // deleteCustomer(customerId: string): Promise<ICustomer>
}