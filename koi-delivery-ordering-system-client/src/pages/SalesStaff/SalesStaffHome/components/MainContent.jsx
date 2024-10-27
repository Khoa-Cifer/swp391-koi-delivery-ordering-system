import "./MainContent.scss";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteNewsById, getAllNews } from "../../../../utils/axios/news";
import { getFileByFileId } from "../../../../utils/axios/file";
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";
import Paragraph from "antd/es/typography/Paragraph";

function MainContent() {
  const [postedOrder, setPostedOrder] = useState([]);
  const [receivedOrder, setReceivedOrder] = useState([]);
  const [news, setNews] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(4);

  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedNewsId, setSelectedNewsId] = useState(null); // State to track which news to delete

  const navigate = useNavigate();

  const postedStatus = 1; // Status for posted orders
  const receivedStatus = 4; // Status for received orders

  // Fetch news data with image
  const fetchNews = async () => {
    try {
      const response = await getAllNews();

      if (response && response.length > 0) {
        const fileIds = response.map((newsItem) => newsItem.file.id);

        if (fileIds.length > 0) {
          const filePromises = fileIds.map(async (fileId) => {
            const fileResponse = await getFileByFileId(fileId);
            return URL.createObjectURL(fileResponse);
          });

          const imageUrls = await Promise.all(filePromises);

          const newsWithImages = response.map((newsItem, index) => ({
            ...newsItem,
            imageUrl: imageUrls[index],
          }));

          setNews(newsWithImages);
        }
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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

  // Handle the opening of the delete confirmation dialog
  const handleOpenDialog = (newsId) => {
    setSelectedNewsId(newsId);
    setOpenDialog(true);
  };

  // Handle the closing of the dialog without deleting
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle delete confirmation and refresh news
  const handleConfirmDelete = async () => {
    try {
      await deleteNewsById(selectedNewsId);
      setOpenDialog(false);
      await fetchNews();
      toast.success("Delete successfully!");
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleViewDetail = (order) => {
    navigate(`/sales-order-detail/${order.id}`, {
      state: order,
    });
  };

  const handleViewMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + 4);
    navigate("/news");
  };

  const handleNewsClick = (newsItem) => {
    navigate(`/news/${newsItem.id}`, { state: newsItem });
  };

  return (
    <div className="main-content-container">
      <ToastUtil />
      <div className="news-container-sale">
        <div className="New">
          <h2>
            <strong>News</strong>
          </h2>
        </div>

        <div className="news-container">
          <div className="news-grid">
            {news.slice(0, visibleNewsCount).map((newsItem, index) => (
              <div key={index} className="news-item">
                <img
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  className="news-image"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNewsClick(newsItem)}
                />
                <div className="news-content">
                  <h3 className="news-title">{newsItem.title}</h3>

                  <Paragraph
                    ellipsis={{
                      rows: 3,
                      expandable: false,
                      symbol: "...",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: newsItem.description }}
                    />
                  </Paragraph>

                  <div className="news-footer">
                    <span className="news-date">
                      {new Date(newsItem.createdDate).toLocaleDateString()}
                    </span>

                    <div className="card-actions">
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleOpenDialog(newsItem.id)}
                        className="delete-btn"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleNewsCount < news.length && (
            <div className="card-view-more">
              <Button onClick={handleViewMoreNews}>View more →</Button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this news item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
              <Link to={"/posted-order-sales-staff"}>View more →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;
