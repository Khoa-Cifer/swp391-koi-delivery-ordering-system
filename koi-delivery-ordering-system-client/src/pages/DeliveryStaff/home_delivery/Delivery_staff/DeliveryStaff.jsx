import Banner_delivery from "../components-delivery/banner/BannerDelivery";
import Header_delivery from "../components-delivery/header/HeaderDelivery";
import History_delivery from "../components-delivery/history/HistoryDelivery";
import "./delivery_staff.scss";

function DeliveryStaff() {
  return (
    <div className="background-delivery-container">
      <div className="background-delivery">
        <>
          <Header_delivery />
          <Banner_delivery />
          <History_delivery />
        </>
      </div>
    </div>
  );
}

export default DeliveryStaff;
