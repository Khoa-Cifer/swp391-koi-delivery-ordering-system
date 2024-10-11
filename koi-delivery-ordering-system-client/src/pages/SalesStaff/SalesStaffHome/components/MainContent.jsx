import "./MainContent.scss";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function MainContent() {
  const [postedOrder, setPostedOrder] = useState();
  const [receivedOrder, setReceivedOrder] = useState();
  const navigate = useNavigate();

  const newsData = [
    {
      category: "ECOMMERCE",
      title: "How to Use the Ezbuy Japan App to Send Goods…",
      description:
        "Are you living in Japan and looking to send goods abroad? With just a few simple steps, you can easily manage cross-border shipping using the Ezbuy...",
      imageUrl:
        "https://img2.thuthuatphanmem.vn/uploads/2019/03/07/hinh-anh-ca-koi-buom-dep_111106426.png",
      author: "Macy",
      date: "2024-08-01",
    },
    {
      category: "B2B Trading",
      title: "B2B Purchase Negotiation Service from Japan for…",
      description:
        "For international enterprises, importing goods from Japan in large quantities is an urgent and frequent need. However, this process comes with many challeng...",
      imageUrl:
        "https://img2.thuthuatphanmem.vn/uploads/2019/03/07/hinh-anh-ca-koi-buom-dep_111106426.png",
      author: "Macy",
      date: "2024-04-09",
    },
    {
      category: "Shipping",
      title: "Professional Japanese White Pine Shipping Service to The…",
      description:
        "Japanese pine stands out as one of the most sought-after trees among plant enthusiasts due to its imposing and robust beauty. However, acquiring these...",
      imageUrl:
        "https://img2.thuthuatphanmem.vn/uploads/2019/03/07/hinh-anh-ca-koi-buom-dep_111106426.png",
      author: "Macy",
      date: "2024-04-06",
    },
  ];

  const postedStatus = 1;
  const receivedStatus = 4;

  useEffect(() => {
    async function fetchOrderData() {
      const postedOrderResponse = await getOrdersByStatus(postedStatus);
      const receivedOrderResponse = await getOrdersByStatus(receivedStatus);
      setPostedOrder(postedOrderResponse);
      setReceivedOrder(receivedOrderResponse);
    }

    fetchOrderData();
  }, [])

  const handleViewDetail = (order) => {
    navigate(`/sales-order-detail/${order.id}`, {
      state: order
    })
  }

  return (
    <div className="main-content-container">
      <div className="news-container-sale">
        <div className="New">
          <strong>News</strong>
        </div>

        <div className="news-container">
          <div className="news-grid">
            {newsData.map((news, index) => (
              <div key={index} className="news-item">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="news-image"
                />
                <div className="news-content">
                  <span className="news-category">{news.category}</span>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-description">{news.description}</p>
                  <div className="news-footer">
                    <span className="news-author">{news.author}</span>
                    <span className="news-date">{news.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-more">
            <a href="#">View more →</a>
          </div>
        </div>
      </div>

      <div className="order-container-sale">
        {/* Waiting for accepted order */}
        {postedOrder && postedOrder.length > 0 && (
          <div className="order-container">
            <div className="order">
              <strong>Waiting For Accepted Order</strong>
            </div>
            <div className="order-card">
              {postedOrder && postedOrder.map && postedOrder.map((order, index) => {
                if (index >= 3) return null;
                return (
                  <div key={order.id} className="order-item">
                    <div className="order-content">
                      <h3 className="order-title">{order.name}</h3>
                      <p className="order-description">Created Date: {dateTimeConvert(order.createdDate)}</p>
                      <p className="order-description">Expected Finish Date: {dateTimeConvert(order.expectedFinishDate)}</p>
                      <div className="order-footer">
                        <Button variant="contained" onClick={() => handleViewDetail(order)}>Detail</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="view-more">
              <a href="#">View more →</a>
            </div>
          </div>
        )}

        <div className="gap">

        </div>

        {/* Waiting for confirm to delivery order */}
        {receivedOrder && receivedOrder.length > 0 && (
          <div className="order-container">
            <div className="order">
              <strong>Waiting For Confirm Order</strong>
            </div>
            <div className="order-card">
              {receivedOrder && receivedOrder.map && receivedOrder.map((order, index) => {
                if (index >= 3) return null;
                return (
                  <div key={order.id} className="order-item">
                    <div className="order-content">
                      <h3 className="order-title">{order.name}</h3>
                      <p className="order-description">Created Date: {dateTimeConvert(order.createdDate)}</p>
                      <p className="order-description">Expected Finish Date: {dateTimeConvert(order.expectedFinishDate)}</p>
                      <div className="order-footer">
                        <Button variant="contained" onClick={() => handleViewDetail(order)}>Detail</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="view-more">
              <a href="#">View more →</a>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default MainContent;
