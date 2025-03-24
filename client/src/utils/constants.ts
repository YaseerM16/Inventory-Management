export interface IProduct {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export interface ICustomer {
    _id: string;
    name: string;
    address: string;
    phone: number;
}

export interface ISale {
    saleId: string;
    productName: string;
    customerName: string;
    quantity: number;
    price: number;
    date: Date;
}

export interface ISalesInput {
    customerId: string,
    productId: string,
    date: Date | "",
    quantity: number
}

export const BACKEND_URL = "https://inventory-management-3-camc.onrender.com"