import "./MainContent.scss";
const MainContent = () => {
  return (
    <div className="container">
      {/* Row for Filter Buttons */}
      <div className="filter-buttons">
        <button className="filter-button">Filter By Receiver Address</button>
        <button className="filter-button">Filter By Name</button>
        <button className="filter-button">Find By Tracking Id</button>
        <button className="filter-button">Filter By Status</button>
      </div>

      {/* Row for Orders */}
      <div className="order-row">
        {/* Order Card */}
        <div className="order-card">
          <h5 className="card-title">Order Name</h5>
          <p className="card-text">Last Updated Date: 2024-09-26</p>
          <p className="card-text">Destination Address: ABC Street</p>
          <div className="button-group">
            <button className="btn secondary-btn">Order Status</button>
            <button className="btn danger-btn">Detail</button>
          </div>
        </div>

        <div className="order-card">
          <h5 className="card-title">Order Name</h5>
          <p className="card-text">Last Updated Date: 2024-09-26</p>
          <p className="card-text">Destination Address: ABC Street</p>
          <div className="button-group">
            <button className="btn secondary-btn">Order Status</button>
            <button className="btn danger-btn">Detail</button>
          </div>
        </div>
        <div className="order-card">
          <h5 className="card-title">Order Name</h5>
          <p className="card-text">Last Updated Date: 2024-09-26</p>
          <p className="card-text">Destination Address: ABC Street</p>
          <div className="button-group">
            <button className="btn secondary-btn">Order Status</button>
            <button className="btn danger-btn">Detail</button>
          </div>
        </div>
        <div className="order-card">
          <h5 className="card-title">Order Name</h5>
          <p className="card-text">Last Updated Date: 2024-09-26</p>
          <p className="card-text">Destination Address: ABC Street</p>
          <div className="button-group">
            <button className="btn secondary-btn">Order Status</button>
            <button className="btn danger-btn">Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
