import { Margin } from "@mui/icons-material";
import "./Maincontent.scss";

function MainContent() {
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
        <div className="order">
          <strong>Waiting For Confirm Order</strong>
        </div>
        <div className="order-row">
          <div className="order-card">
            <h5 className="card-title">Order Name</h5>
            <p className="card-text">Last Updated Date: 2024-09-26</p>
            <p className="card-text">Destination Address: ABC Street</p>
            <div className="button-container">
              <button className="status-btn">Order Status</button>
              <button className="detail-btn">Detail</button>
            </div>
          </div>

          <div className="order-card">
            <h5 className="card-title">Order Name</h5>
            <p className="card-text">Last Updated Date: 2024-09-26</p>
            <p className="card-text">Destination Address: ABC Street</p>
            <div className="button-container">
              <button className="status-btn">Order Status</button>
              <button className="detail-btn">Detail</button>
            </div>
          </div>

          <div className="order-card">
            <h5 className="card-title">Order Name</h5>
            <p className="card-text">Last Updated Date: 2024-09-26</p>
            <p className="card-text">Destination Address: ABC Street</p>
            <div className="button-container">
              <button className="status-btn">Order Status</button>
              <button className="detail-btn">Detail</button>
            </div>
          </div>
        </div>
        <div className="view-more">
          <a href="#">View more →</a>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
