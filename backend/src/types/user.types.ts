
export type UserLoginInput = {
    email: string;
    password: string;
}

export type IUser = {
    email: string,
}

export type productInput = {
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export type customerInput = {
    name: string;
    address: string;
    phone: number;
}

export type salesInput = {
    saleId: string;
    productName: string;
    customerName: string; // Optional for cash sales
    quantity: number;
    price: number;
    date: Date;
}

