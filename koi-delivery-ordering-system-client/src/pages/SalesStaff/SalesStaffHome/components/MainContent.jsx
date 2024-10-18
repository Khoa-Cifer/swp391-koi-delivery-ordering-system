import "./MainContent.scss";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { getAllNews } from "../../../../utils/axios/news";
import { getFileByFileId } from "../../../../utils/axios/file";

function MainContent() {
  const [postedOrder, setPostedOrder] = useState([]);
  const [receivedOrder, setReceivedOrder] = useState([]);
  const [news, setNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const navigate = useNavigate();

  const postedStatus = 1; // Status for posted orders
  const receivedStatus = 4; // Status for received orders

  // Fetch news data
  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await getAllNews();
        const sortedNews = response.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Fetch file data for each news item, checking for Blob URLs
        const updatedNews = await Promise.all(
          sortedNews.map(async (newsItem) => {
            if (newsItem.fileId) {
              const fileData = await getFileByFileId(newsItem.fileId);

              // Check if the filePath is a Blob URL and fetch the file content
              const fileURL = fileData.filePath;
              if (fileURL.startsWith("blob:")) {
                const fileBlob = await fetchBlobFromUrl(fileURL);
                const objectURL = URL.createObjectURL(fileBlob); // Create object URL for Blob
                return { ...newsItem, filePath: objectURL }; // Attach the Blob URL
              }
              return { ...newsItem, filePath: fileURL }; // Otherwise, just return the file path
            }
            return newsItem;
          })
        );

        setNews(updatedNews);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    }

    fetchNewsData();
  }, []);

  // Utility function to fetch Blob from Blob URL
  const fetchBlobFromUrl = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  };

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
    setVisibleNewsCount((prevCount) => prevCount + 3);
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
                {newsItem.filePath && (
                  <img
                    src={newsItem.filePath}
                    alt={newsItem.title}
                    className="news-image"
                  />
                )}
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

          {visibleNewsCount < news.length && (
            <div className="view-more">
              <Button onClick={handleViewMoreNews}>View more →</Button>
            </div>
          )}
        </div>
      </div>

      <div className="order-container-sale">
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
