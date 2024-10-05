import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainContent.scss";

const MainContent = () => {
  // State để lưu trữ các orders
  const [orders, setOrders] = useState([]);

  // Hàm lấy dữ liệu từ API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/getAllOrders"
      );
      setOrders(response.data); // Giả sử API trả về mảng các orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Lọc các orders theo trạng thái orderStatus
  const deliveringOrders = orders.filter((order) => order.orderStatus === 6);
  const assignedOrders = orders.filter((order) => order.orderStatus === 5);
  const deliveredOrders = orders.filter((order) => order.orderStatus === 7);

  // Hàm render các thẻ đơn hàng
  const renderOrderCard = (order) => (
    <div key={order.id} className="order-list-card">
      <h5 className="card-list-title">{order.name}</h5>
      <p className="card-list-text">
        Last Updated Date: {order.expectedFinishDate}
      </p>
      <p className="card-list-text">
        Destination Address: {order.destinationAddress}
      </p>
      <div className="button-list-container">
        <button className="status-btn">Order Status</button>
        <button className="detail-btn">Detail</button>
      </div>
    </div>
  );

  return (
    <div className="Order-list-container">
      {/* Delivering Order */}
      <h3 className="order-row-title">Delivering Order</h3>
      <div className="order-list-row">
        {deliveringOrders.length > 0 ? (
          deliveringOrders.map(renderOrderCard)
        ) : (
          <p>No Delivering Orders</p>
        )}
        <div className="view-more-list-container">
          <button className="view-more-list-button">
            View More &gt;&gt;&gt;
          </button>
        </div>
      </div>

      {/* Assigned Order */}
      <h3 className="order-row-title">Assigned Order</h3>
      <div className="order-list-row">
        {assignedOrders.length > 0 ? (
          assignedOrders.map(renderOrderCard)
        ) : (
          <p>No Assigned Orders</p>
        )}
        <div className="view-more-list-container">
          <button className="view-more-list-button">
            View More &gt;&gt;&gt;
          </button>
        </div>
      </div>

      {/* Delivered Order */}
      <h3 className="order-row-title">Delivered Order</h3>
      <div className="order-list-row">
        {deliveredOrders.length > 0 ? (
          deliveredOrders.map(renderOrderCard)
        ) : (
          <p>No Delivered Orders</p>
        )}
        <div className="view-more-list-container">
          <button className="view-more-list-button">
            View More &gt;&gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
