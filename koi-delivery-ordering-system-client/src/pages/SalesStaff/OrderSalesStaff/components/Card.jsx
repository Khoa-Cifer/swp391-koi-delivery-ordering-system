import "./sales_card.scss";

const Card = () => {
  return (
    <div className="content-container" > 
      <div className ="order-row">
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
    </div>
  );
};

export default Card;
