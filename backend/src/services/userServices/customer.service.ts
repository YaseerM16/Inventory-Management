import { ICustomerServiceMethods } from "../../interface/service.Interface/customer.service.interface"
import { ICustomer } from "../../models/Customer.Model"
import CustomerRepository from "../../repositories/userRepository/customer.repository"
import { customerInput } from "../../types/user.types"


export default class CustomerServices implements ICustomerServiceMethods {
    private customerRepository: CustomerRepository

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository
    }
    async getCustomers(query: any): Promise<{ customers: ICustomer[]; totalCustomers: number }> {
        try {
            const customers = await this.customerRepository.getCustomers(query)
            return customers
        } catch (error) {
            throw error
        }
    }
    async editCustomer(customerId: string, data: customerInput): Promise<ICustomer> {
        try {
            const addCustomer = await this.customerRepository.editCustomer(customerId, data)
            return addCustomer as ICustomer
        } catch (error) {
            throw error
        }
    }
    async deleteCustomer(customerId: string): Promise<ICustomer> {
        try {
            const updatedCustomer = await this.customerRepository.deleteCustomer(customerId)
            return updatedCustomer as ICustomer
        } catch (error: unknown) {
            throw error
        }
    }
    async addCustomer(data: customerInput): Promise<ICustomer> {
        try {
            const addProduct = await this.customerRepository.addCustomer(data)
            return addProduct
        } catch (error: unknown) {
            throw error
        }
    }
}

const customerRepository = new CustomerRepository()
export const customerServices = new CustomerServices(customerRepository)