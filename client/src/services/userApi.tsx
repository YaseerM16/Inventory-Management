import axios, { AxiosError } from "axios";
import { FormValues } from "../pages/user/Login";
import { BACKEND_URL, ISale, ISalesInput } from "../utils/constants";


export const axiosInstance = axios.create({
    baseURL: BACKEND_URL || "http://localhost:5000",
    headers: {
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
    },
    withCredentials: true,
});


export const loginApi = async (loginData: FormValues) => {
    try {
        const response = await axiosInstance.post(`/login`, loginData);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const getSalesApi = async (page: number | undefined, limit: number | undefined, query: string | undefined) => {
    try {
        const response = await axiosInstance.get(`/sales?page=${page}&limit=${limit}&search=${query}`);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const addSalesRecordApi = async (sale: ISalesInput) => {
    try {
        const response = await axiosInstance.post(`/sales/add`, sale);
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

export const sendSalesReportApi = async (sale: ISale[], email: string) => {
    try {
        const response = await axiosInstance.post(`/send-sales-report`, { sales: sale, email });
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.message)
        }
    }
};

