import { ICustomer } from "../../models/Customer.Model"
import { customerInput } from "../../types/user.types"

export interface ICustomerServiceMethods {
    getCustomers(query: any): Promise<{ customers: ICustomer[], totalCustomers: number }>
    addCustomer(data: customerInput): Promise<ICustomer>
    editCustomer(customerId: string, data: customerInput): Promise<ICustomer>
    deleteCustomer(customerId: string): Promise<ICustomer>
}