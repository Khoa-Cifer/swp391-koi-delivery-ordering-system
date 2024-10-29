import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewsDetail.scss";
import Header from "../../Layout/SalesStaffLayout/components/Header/Header";
import dateTimeConvert from "../../../components/utils";

function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState(null);

  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (location.state) {
      setNewsDetail(location.state);
    } else {
      console.error("No news detail available.");
    }
  }, [location.state]);

  if (!newsDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="back-button">
        <button onClick={handleBackClick}>← Quay lại</button>
      </div>

      <div className="news-detail-container">
        <div className="news-detail-content">
          <img
            src={newsDetail.imageUrl}
            alt={newsDetail.title}
            className="news-detail-image"
          />
          <h1 className="news-detail-title">{newsDetail.title}</h1>
          <div
            className="news-detail-description"
            dangerouslySetInnerHTML={{ __html: newsDetail.description }}
          />

            <span>Author: {newsDetail.createdBy.username}</span>{" "}
          <p className="news-detail-date">
            <strong>Created date:</strong> {dateTimeConvert(newsDetail.createdDate)}
          </p>
        </div>
      </div>
    </>
  );
}

export default NewsDetail;
