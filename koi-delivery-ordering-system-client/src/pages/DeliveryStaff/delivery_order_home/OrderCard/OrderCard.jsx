import "./OrderCard.scss"
import { Button } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const OrderCard = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewDetail = (order) => {
    navigate(`/delivery-order-detail/${order.id}`, {
      state: order
    })
  }

  // eslint-disable-next-line react/prop-types
  return orders && orders.length > 0 && (
    <div className="order-container-delivery">
      <div className="order-container">
        <div className="order-card">
          {orders && orders.map && orders.map((order, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
