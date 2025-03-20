interface ResponseParams {
    res: any;
    statusCode?: number;
    success: boolean;
    message: string;
    data?: any;
}
export const sendResponse = ({
    res,
    statusCode = 200,
    success,
    message,
    data,
}: ResponseParams) => {

    return res.status(statusCode).send({
        success,
        message,
        data,
    });
};


export const sendErrorResponse = (res: any, message = "Internal Server Error", statusCode = 500): void => {
    res.status(statusCode).json({ success: false, message });
};