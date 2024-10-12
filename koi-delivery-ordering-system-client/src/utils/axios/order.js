import { jwtDecode } from "jwt-decode";
import axiosClient from "../axios";

export async function createGeneralOrderInfo(
  name,
  description,
  destinationAddress,
  destinationLongitude,
  destinationLatitude,
  senderAddress,
  senderLongitude,
  senderLatitude,
  expectedFinishDate
) {
  try {
    const token = localStorage.getItem("token");
    let customerId;
    if (token) {
      const customerInfo = jwtDecode(token);
      customerId = customerInfo.sub.substring(2);
    }
    const response = await axiosClient.post("orders/createOrderGeneralData", {
      customerId,
      name,
      description,
      destinationAddress,
      destinationLongitude,
      destinationLatitude,
      senderAddress,
      senderLongitude,
      senderLatitude,
      expectedFinishDate,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postOrder(orderId) {
  try {
    const response = await axiosClient.post(`orders/postOrder/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getOrderById(orderId) {
  try {
    const response = await axiosClient.get(`orders/getOrderById/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function calculateOrderPrice(orderId) {
  try {
    const response = await axiosClient.post(`orders/calculatePrice/${orderId}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function getOrdersByStatus(orderStatus) {
  try {
    const response = await axiosClient.get(
      `orders/getOrderByStatus/${orderStatus}`,{
        headers: {
          Authorization: `Bearer your-token-here`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const response = await axiosClient.post(
      `orders/updateOrderStatus/${orderId}/${status}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrderSalesAction(orderId, salesId, actionStatus) {
  try {
    const response = await axiosClient.put("orders/updateOrderSales", {
      orderId,
      salesId,
      actionStatus,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOrdersRecommendedForDeliveryStaff(deliveryStaffId) {
  try {
    const response = await axiosClient.get(
      `orders/recommendOrdersForDelivery/${deliveryStaffId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOrderByTrackingId(trackingId) {
  try {
    const response = await axiosClient.get(
      `orders/searchOrderByTrackingId/${trackingId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOnGoingOrderForDeliveryStaff(deliveryStaffId, deliveryProcessType, orderStatus) {
  try {
    const response = await axiosClient.get(`orders/onGoingOrder/${deliveryStaffId}/${deliveryProcessType}/${orderStatus}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function finishOrder(
  orderId,
  orderDeliveringId,
  deliveryStaffId,
  storageId,
  processType
) {
  try {
    const response = await axiosClient.put(`orders/finishOrder`, {
      orderId,
      orderDeliveringId,
      deliveryStaffId,
      storageId,
      processType
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}