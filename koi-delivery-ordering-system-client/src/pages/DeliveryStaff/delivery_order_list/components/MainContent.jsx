import "./MainContent.scss";
const MainContent = () => {
  return (
    <div className="Order-list-container">
      {/* Tiêu đề cho hàng đầu tiên */}
      <h3 className="order-row-title">Delivering Order</h3>

      <div className="order-list-row">
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        <div className="view-more-list-container">
          <button className="view-more-list-button">View More >>></button>
        </div>
      </div>
      {/* Tiêu đề cho hàng thứ 2 */}
      <h3 className="order-row-title">Assigned Order</h3>

      <div className="order-list-row">
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        <div className="view-more-list-container">
          <button className="view-more-list-button">View More >>></button>
        </div>
      </div>
      {/* Tiêu đề cho hàng thứ 3 */}
      <h3 className="order-row-title">Delivered Order</h3>

      <div className="order-list-row">
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        {/* Order Card */}
        <div className="order-list-card ">
          <h5 className="card-list-title">Order Name</h5>
          <p className="card-list-text">Last Updated Date: 2024-09-26</p>
          <p className="card-list-text">Destination Address: ABC Street</p>
          <div className="button-list-container">
            <button className="status-btn">Order Status</button>
            <button className="detail-btn">Detail</button>
          </div>
        </div>
        <div className="view-more-list-container">
          <button className="view-more-list-button">View More >>></button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
