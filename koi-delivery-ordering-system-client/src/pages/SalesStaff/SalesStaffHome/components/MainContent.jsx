import "./MainContent.scss";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getAllNews } from "../../../../utils/axios/news";

function MainContent() {
  const [postedOrder, setPostedOrder] = useState([]);
  const [receivedOrder, setReceivedOrder] = useState([]);
  const [news, setNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3); // State to track how many news items to display
  const navigate = useNavigate();

  const postedStatus = 1; // Status for posted orders
  const receivedStatus = 4; // Status for received orders

  // Fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await getAllNews();
        setNews(response);
        console.log(response.title);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNewsData();
  }, []);

  // Fetch order data
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const postedOrderResponse = await getOrdersByStatus(postedStatus);
        const receivedOrderResponse = await getOrdersByStatus(receivedStatus);
        setPostedOrder(postedOrderResponse);
        setReceivedOrder(receivedOrderResponse);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, []);

  const handleViewDetail = (order) => {
    navigate(`/sales-order-detail/${order.id}`, {
      state: order,
    });
  };

  const handleViewMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3); // Increase visible news count by 3
  };

  return (
    <div className="main-content-container">
      <div className="news-container-sale">
        <div className="New">
          <strong>News</strong>
        </div>

        <div className="news-container">
          <div className="news-grid">
            {news.slice(0, visibleNewsCount).map((newsItem, index) => (
              <div key={index} className="news-item">
                <img
                  src={newsItem.file.filePath}
                  alt={newsItem.title}
                  className="news-image"
                />
                <div className="news-content">
                  <span className="news-category">{newsItem.category}</span>
                  <h3 className="news-title">{newsItem.title}</h3>
                  <p className="news-description">{newsItem.description}</p>
                  <div className="news-footer">
                    <span className="news-date">{newsItem.createdDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleNewsCount < news.length && ( // Show View More button only if there are more news items to display
            <div className="view-more">
              <Button onClick={handleViewMoreNews}>View more →</Button>
            </div>
          )}
        </div>
      </div>

      <div className="order-container-sale">
        {/* Waiting for accepted orders */}
        {postedOrder.length > 0 && (
          <div className="order-container">
            <div className="order">
              <strong>Waiting For Accepted Order</strong>
            </div>
            <div className="order-card">
              {postedOrder.slice(0, 3).map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-content">
                    <h3 className="order-title">{order.name}</h3>
                    <p className="order-description">
                      Created Date: {dateTimeConvert(order.createdDate)}
                    </p>
                    <p className="order-description">
                      Expected Finish Date:{" "}
                      {dateTimeConvert(order.expectedFinishDate)}
                    </p>
                    <div className="order-footer">
                      <Button
                        variant="contained"
                        onClick={() => handleViewDetail(order)}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="view-more">
              <Link to={"/posted-order-sales-staff"}>View more →</Link>
            </div>
          </div>
        )}

        <div className="gap"></div>

        {/* Waiting for confirm to delivery orders */}
        {receivedOrder.length > 0 && (
          <div className="order-container">
            <div className="order">
              <strong>Waiting For Confirm Order</strong>
            </div>
            <div className="order-card">
              {receivedOrder.slice(0, 3).map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-content">
                    <h3 className="order-title">{order.name}</h3>
                    <p className="order-description">
                      Created Date: {dateTimeConvert(order.createdDate)}
                    </p>
                    <p className="order-description">
                      Expected Finish Date:{" "}
                      {dateTimeConvert(order.expectedFinishDate)}
                    </p>
                    <div className="order-footer">
                      <Button
                        variant="contained"
                        onClick={() => handleViewDetail(order)}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="view-more">
              <a href="#">View more →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;
