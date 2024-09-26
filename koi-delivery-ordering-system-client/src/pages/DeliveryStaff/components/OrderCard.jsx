import "bootstrap/dist/css/bootstrap.min.css";
const OrderCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h className="card-title">Order Name</h>

        <p className="card-text">Last Updated Date: 2024-09-26</p>
        <p className="card-text">Destination Address: ABC Street</p>

        <div className="d-flex justify-content">
          <button className="btn btn-secondary btn-sm me-2 small-text">
            Order Status
          </button>
          <button className="btn btn-danger btn-sm">Detail</button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
