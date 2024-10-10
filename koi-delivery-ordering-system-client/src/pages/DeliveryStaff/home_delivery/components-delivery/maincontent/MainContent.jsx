import "./Maincontent.scss";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../../utils/axios/order";

function MainContent() {
  const [ordersAccepted, setOrdersAccepted] = useState([]);
  const [ordersConfirmed, setOrdersConfirmed] = useState([]);

  const fetchOrderAccepted = async () => {
    try {
      const response = await getOrdersByStatus(2);
      console.log("Order Accepted Response:", response);
      
      if (response) {
        console.log("Order Accepted Data:", response);
        setOrdersAccepted(response);
      } else {
        console.warn("Không có dữ liệu trong response cho Order Accepted.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng Accepted:", error);
    }
  };

  const fetchOrderConfirmed = async () => {
    try {
      const response = await getOrdersByStatus(5);
      console.log("Order Confirmed Response:", response);
      
      if (response.data) {
        console.log("Order Confirmed Data:", response.data);
        setOrdersConfirmed(response.data);
      } else {
        console.warn("Không có dữ liệu trong response cho Order Confirmed.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng Confirmed:", error);
    }
  };

  useEffect(() => {
    fetchOrderAccepted();
    fetchOrderConfirmed();
  }, []);

  const columns = [
    {
      title: "Tracking Id",
      dataIndex: "trackingId",
      key: "trackingId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Expected Finish Date",
      dataIndex: "expectedFinishDate",
      key: "expectedFinishDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // Thêm các cột khác nếu cần
  ];

  return (
    <div className="orders-container">
      <div className="orders-accepted">
        <h2>Order Accepted</h2>
        <Table 
          dataSource={ordersAccepted} 
          columns={columns} 
          rowKey="trackingId" 
          loading={ordersAccepted.length === 0} // Hiển thị trạng thái loading
        />
      </div>

      <div className="orders-confirmed">
        <h2>Order Confirmed</h2>
        <Table 
          dataSource={ordersConfirmed} 
          columns={columns} 
          rowKey="trackingId" 
          loading={ordersConfirmed.length === 0} // Hiển thị trạng thái loading
        />
      </div>
    </div>
  );
}

export default MainContent;
