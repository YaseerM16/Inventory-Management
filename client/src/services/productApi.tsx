import { AxiosError } from "axios";

import { IProduct } from "../utils/constants";
import { axiosInstance } from "./userApi";

export const getProductsApi = async (page: number | undefined, limit: number | undefined, query: string | undefined) => {
    try {
        const response = await axiosInstance.get(`/products?page=${page}&limit=${limit}&search=${query}`);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const addProductApi = async (data: IProduct) => {
    try {
        const response = await axiosInstance.post(`/product/add`, data);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const editProductApi = async (productId: string, data: IProduct) => {
    try {
        const response = await axiosInstance.put(`/product/${productId}/edit`, data);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const deleteProductApi = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(`/product/${productId}/delete`);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const sendItemsReportApi = async (products: IProduct[], email: string) => {
    try {
        const response = await axiosInstance.post(`/send-items-report`, { products, email });
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};
