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
