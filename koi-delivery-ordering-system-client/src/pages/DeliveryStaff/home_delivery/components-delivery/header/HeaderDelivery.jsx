import { Image } from "antd";
import "./HeaderDelivery.scss";
import { useNavigate } from "react-router-dom";

function HeaderDelivery() {
  const navigate = useNavigate();

  const handleHomeNavigate = () => {
    navigate("/");
  }

  const handleOrderListNavigate = () => {
    navigate("/delivery-order-available");
  }

  const handleOrderHomePage = () => {
    navigate("/delivery-order-home");
  }

  return (
    <div className="header-delivery">
      <div className="logo">
        <Image onClick={() => handleHomeNavigate()} src="./src/assets/logo.png" />
      </div>

      <div className="function">
        <button>
          <strong onClick={() => handleOrderListNavigate()}>Order List Page</strong>
        </button>
        <button>
          <strong onClick={() => handleOrderHomePage()}>Delivery Staff Order Page</strong>
        </button>
      </div>

      <div className="logout-delivery">
        <button>Log out</button>
      </div>
    </div>
  );
}

export default HeaderDelivery;
