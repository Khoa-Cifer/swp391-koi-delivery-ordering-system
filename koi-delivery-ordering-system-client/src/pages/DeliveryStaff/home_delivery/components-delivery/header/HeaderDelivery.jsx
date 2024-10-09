import { Image } from "antd";
import "./HeaderDelivery.scss";

function HeaderDelivery() {
  return (
    <div className="header-delivery">
      <div className="logo">
        <Image src="./src/assets/logo.png" />
      </div>

      <div className="function">
        <button>
          <strong>Order List Page</strong>
        </button>
        <button>
          <strong>Available Order Page</strong>
        </button>
        <button>
          <strong>Update Order Info</strong>
        </button>
        <button>
          <strong>User Page</strong>
        </button>
      </div>

      <div className="logout-delivery">
        <button>Log out</button>
      </div>
    </div>
  );
}

export default HeaderDelivery;
