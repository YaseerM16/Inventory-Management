import axios, { AxiosError } from "axios";
import { FormValues } from "../pages/user/Login";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Cache-Control": "no-store",  // Prevents caching
        "Pragma": "no-cache",
        "Expires": "0",
    },
    withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if ((error.response?.status === 403 || error.response?.status === 401) && window.location.pathname !== "/login") {
//             console.log("Redirecting due to 403 error...");
//             await handleLogout(); // Call the function
//         }
//         return Promise.reject(error);
//     }
// );

/////////////   Auth   //////////////

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




