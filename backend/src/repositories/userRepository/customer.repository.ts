import { ICustomerServiceMethods } from "../../interface/service.Interface/customer.service.interface";
import CustomerModel, { ICustomer } from "../../models/Customer.Model";
import { customerInput } from "../../types/user.types";
import BaseRepository from "../base.repository";


export default class CustomerRepository extends BaseRepository<{
    Customer: ICustomer
}> implements ICustomerServiceMethods {
    constructor() {
        super({
            Customer: CustomerModel
        })
    }
    // getCustomers(query: any): Promise<{ customers: ICustomer[]; totalCustomers: number; }> {
    //     throw new Error("Method not implemented.");
    // }
    async getCustomers(query: any): Promise<{ customers: ICustomer[]; totalCustomers: number; }> {
        try {
            const { page = 1, limit = 6, search } = query;

            const queryObj: any = {
                isDeleted: false,
                ...(search && {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { address: { $regex: search, $options: "i" } }
                    ]
                })
            };


            if (search) {
                queryObj.name = { $regex: search, $options: "i" };
            }

            const totalCustomers = await this.findAll("Customer", queryObj).countDocuments();

            const customers = await this.findAll("Customer", queryObj)
                .skip((page - 1) * limit)
                .limit(parseInt(limit, 10));

            return { customers, totalCustomers };
        } catch (error) {
            throw error;
        }
    }
    async addCustomer(data: customerInput): Promise<ICustomer> {
        try {

            // Check if category already exists
            const customerExists = await this.findOne("Customer", { name: data.name });
            if (customerExists) {
                throw new Error("Customer already exists. Try Edit ..!!");
            }

            const newData: customerInput = {
                name: data.name,
                address: data.address,
                phone: data.phone
            }
            const addCustomer = await this.createData('Customer', newData as unknown as Partial<ICustomer>);
            return addCustomer
        } catch (error: unknown) {
            throw error
        }
    }
    async editCustomer(customerId: string, data: customerInput): Promise<ICustomer> {
        try {
            const existingProduct = await this.findById("Customer", customerId);
            if (!existingProduct) {
                throw new Error("Customer not found.");
            }

            if (data.name) {
                const nameConflict = await this.findOne("Customer", { name: data.name, _id: { $ne: customerId } });
                if (nameConflict) {
                    throw new Error("A customer with this name already exists.");
                }
            }

            const updatedProduct = await this.updateById("Customer", customerId, {
                name: data.name,
                address: data.address,
                phone: data.phone,
            });

            return updatedProduct as ICustomer
        } catch (error) {
            throw error;
        }
    }
    async deleteCustomer(customerId: string): Promise<ICustomer> {
        try {
            const existingCustomer = await this.findById("Customer", customerId);
            if (!existingCustomer) {
                throw new Error("Customer not found");
            }
            const updatedCustomer = await this.updateById(
                "Customer",
                customerId,
                { isDeleted: true }
            );

            if (!updatedCustomer) {
                throw new Error("Failed to update customer");
            }

            return updatedCustomer;
        } catch (error) {
            throw error;
        }
    }
}