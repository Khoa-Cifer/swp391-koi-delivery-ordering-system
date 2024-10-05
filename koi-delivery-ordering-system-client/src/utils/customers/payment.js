import axiosClient from "../axios";

export async function paymentOpenGateway(customerId, amount, bankCode) {
    try {
        const response = await axiosClient.get(`payment/vn-pay/${customerId}?amount=${amount}&bankCode=${bankCode}`,
            {
                amount,
                bankCode
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}