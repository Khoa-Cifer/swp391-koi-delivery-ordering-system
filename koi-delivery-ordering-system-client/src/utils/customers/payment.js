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

export async function logPaymentHistory(customerId, orderId, amount) {
    try {
        const response = await axiosClient.post("payment-history/log-payment-history", {
            customerId,
            orderId,
            amount
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}