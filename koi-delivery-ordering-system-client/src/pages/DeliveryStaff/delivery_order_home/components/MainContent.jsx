import "./MainContent.scss";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import { Button } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  // State để lưu trữ dữ liệu lấy từ API
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [confirmedOrders, setConfirmedOrders] = useState();
  const navigate = useNavigate();

  // Hàm lấy dữ liệu từ API
  // const fetchCards = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/orders/getAllOrders"
  //     );
  //     console.log(response);
  //     setCards(response.data); // Giả sử API trả về một mảng các đối tượng 'cards'
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const acceptedOrderStatus = 2;
  const confirmedOrderStatus = 5;

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    async function fetchAcceptedOrders() {
      const acceptedOrderResponse = await getOrdersByStatus(acceptedOrderStatus);
      const confirmedOrderResponse = await getOrdersByStatus(confirmedOrderStatus);
      setAcceptedOrders(acceptedOrderResponse);
      setConfirmedOrders(confirmedOrderResponse);
    }

    fetchAcceptedOrders();
  }, [])

  const handleViewDetail = (order) => {
    navigate(`/delivery-order-detail/${order.id}`, {
      state: order
    })
  }

  // useEffect(() => {
  //   fetchCards();
  // }, []);

  return (
    <div className="delivery-order-container">
      <div className="map-container">
        <p>Google Map</p>
      </div>
      {/* <div className="card-container">
        {acceptedOrders.map((card) => (
          <div key={card.id} className="card">
            <p>Name: {card.name}</p>
            <p>Last Updated Date: {card.expectedFinishDate}</p>
            <p>Destination Address: {card.destinationAddress}</p>
            <div className="button-container">
              <button className="status-button">Order Status</button>
              <button className="detail-button">Detail</button>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more-container">
        <button className="view-more-button">View More >>></button>
      </div> */}

      <div className="order-container-sale">
        {/* Waiting for accepted order */}
        {acceptedOrders && acceptedOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Your Working Order</strong>
            </div>
            <div className="order-row">
              {acceptedOrders && acceptedOrders.map && acceptedOrders.map((order, index) => {
                // Show all orders if showAll is true, otherwise show only the first 3
                if (index >= 3) return null;
                return (
                  <div className="order-card" key={order.id}>
                    <h5 className="card-title">Order {order.name}</h5>
                    <p className="card-text">Created Date: {dateTimeConvert(order.createdDate)}</p>
                    <p className="card-text">Expected Finish Date: {dateTimeConvert(order.expectedFinishDate)}</p>
                    <div className="button-container">
                      <Button variant="contained" onClick={() => handleViewDetail(order)}>Detail</Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {acceptedOrders.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}

        {acceptedOrders && acceptedOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Waiting For Getting Order</strong>
            </div>
            <div className="order-row">
              {acceptedOrders && acceptedOrders.map && acceptedOrders.map((order, index) => {
                // Show all orders if showAll is true, otherwise show only the first 3
                if (index >= 3) return null;
                return (
                  <div className="order-card" key={order.id}>
                    <h5 className="card-title">Order {order.name}</h5>
                    <p className="card-text">Created Date: {dateTimeConvert(order.createdDate)}</p>
                    <p className="card-text">Expected Finish Date: {dateTimeConvert(order.expectedFinishDate)}</p>
                    <div className="button-container">
                      <Button variant="contained">Detail</Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {acceptedOrders.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}

        {confirmedOrderStatus && confirmedOrderStatus.length > 0 && (
          <div>
            <div className="order">
              <strong>Waiting For Delivered Order</strong>
            </div>
            <div className="order-row">
              {confirmedOrderStatus && confirmedOrderStatus.map && confirmedOrderStatus.map((order, index) => {
                // Show all orders if showAll is true, otherwise show only the first 3
                if (index >= 3) return null;
                return (
                  <div className="order-card" key={order.id}>
                    <h5 className="card-title">Order {order.name}</h5>
                    <p className="card-text">Created Date: {dateTimeConvert(order.createdDate)}</p>
                    <p className="card-text">Expected Finish Date: {dateTimeConvert(order.expectedFinishDate)}</p>
                    <div className="button-container">
                      <Button variant="contained">Detail</Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {confirmedOrderStatus.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
