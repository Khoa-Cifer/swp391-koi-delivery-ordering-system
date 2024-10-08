import BannerDelivery from "../components-delivery/banner/BannerDelivery";
import HeaderDelivery from "../components-delivery/header/HeaderDelivery";
import HistoryDelivery from "../components-delivery/history/HistoryDelivery";
import "./delivery_staff.scss";

function DeliveryStaffHome() {
  return (
    <div className="background-delivery-container">
      <div className="background-delivery">
        <>
          <HeaderDelivery />
          <BannerDelivery />
          <HistoryDelivery />
        </>
      </div>
    </div>
  );
}

export default DeliveryStaffHome;
