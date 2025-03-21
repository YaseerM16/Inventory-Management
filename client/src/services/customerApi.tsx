import { AxiosError } from "axios";

import { ICustomer } from "../utils/constants";
import { axiosInstance } from "./userApi";

export const addCustomerApi = async (data: ICustomer) => {
    try {
        const response = await axiosInstance.post(`/customer/add`, data);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const getCustomersApi = async (page: number, limit: number, query: string) => {
    try {
        const response = await axiosInstance.get(`/customers?page=${page}&limit=${limit}&search=${query}`);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const editCustomerApi = async (productId: string, data: ICustomer) => {
    try {
        const response = await axiosInstance.put(`/customer/${productId}/edit`, data);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const deleteCustomerApi = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(`/customer/${productId}/delete`);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};