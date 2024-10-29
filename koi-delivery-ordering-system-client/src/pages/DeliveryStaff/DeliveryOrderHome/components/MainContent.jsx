import "./MainContent.scss";
import { useEffect, useState } from "react";
import {
  getOnGoingOrderForDeliveryStaff,
  getOrdersByStatus,
  getOrdersRecommendedForDeliveryStaff,
} from "../../../../utils/axios/order";
import { Button } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DirectionsRenderer, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import GreenMarker from "../../../../assets/succeeded.svg"
import BlueMarker from "../../../../assets/inTransit.svg"
import RedMarker from "../../../../assets/failed.svg"

const MainContent = () => {
  // State để lưu trữ dữ liệu lấy từ API
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [confirmedOrders, setConfirmedOrders] = useState();
  const [recommendedOrders, setRecommendedOrders] = useState();
  const [directions, setDirections] = useState(null);
  const [ongoingGettingOrders, setOngoingGettingOrders] = useState();
  const [onGoingDeliveringOrders, setOngoingDeliveringOrders] = useState();
  const [selectedOrder, setSelecterOrder] = useState();

  const [map, setMap] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let deliveryStaffId;
  if (token) {
    const deliveryStaffInfo = jwtDecode(token);
    deliveryStaffId = deliveryStaffInfo.sub.substring(2);
  }

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 10.75,
    lng: 106.6667,
  };

  const acceptedOrderStatus = 2;
  const confirmedOrderStatus = 5;
  const gettingOrderStatus = 3;
  const deliveringOrderStatus = 6;

  const handleMapDirectionShow = (order) => {
    setSelecterOrder(order);
    console.log(order);
  }

  useEffect(() => {
    fetchMapBounds();
  }, [selectedOrder]);

  const handleMapLoad = (map) => {
    setMap(map);
    fetchMapBounds();
  };

  function fetchMapBounds() {
    if (map) {
      if (!selectedOrder) {
        return;
      }
      // eslint-disable-next-line no-undef
      const bounds = new google.maps.LatLngBounds();

      if (selectedOrder) {
        // eslint-disable-next-line no-undef
        bounds.extend(new google.maps.LatLng(parseFloat(selectedOrder.destinationLatitude), parseFloat(selectedOrder.destinationLongitude)));
        // eslint-disable-next-line no-undef
        bounds.extend(new google.maps.LatLng(parseFloat(selectedOrder.senderLatitude), parseFloat(selectedOrder.senderLongitude)));
      }

      map.fitBounds(bounds);
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      const acceptedOrderResponse = await getOrdersByStatus(
        acceptedOrderStatus
      );
      const confirmedOrderResponse = await getOrdersByStatus(
        confirmedOrderStatus
      );
      const recommendedOrderResponse =
        await getOrdersRecommendedForDeliveryStaff(deliveryStaffId);
      const ongoingGettingOrderResponse = await getOnGoingOrderForDeliveryStaff(
        deliveryStaffId,
        0,
        gettingOrderStatus
      );
      const ongoingDeliveringOrderResponse =
        await getOnGoingOrderForDeliveryStaff(
          deliveryStaffId,
          1,
          deliveringOrderStatus
        );
      setOngoingDeliveringOrders(ongoingDeliveringOrderResponse);
      setAcceptedOrders(acceptedOrderResponse);
      setConfirmedOrders(confirmedOrderResponse);
      setRecommendedOrders(recommendedOrderResponse);
      setOngoingGettingOrders(ongoingGettingOrderResponse);
    }

    fetchOrders();
  }, []);

  const handleViewDetail = (order) => {
    navigate(`/delivery-order-detail/${order.id}`, {
      state: order,
    });
  };
  return (
    <div className="delivery-order-container">

      {/* <div className="google-map"><h2>Google map</h2></div> */}
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={center}
          onLoad={handleMapLoad}
        >
          {directions && <DirectionsRenderer directions={directions} />}

          {selectedOrder && (
            <>

              <Marker
                position={{
                  lat: parseFloat(selectedOrder.senderLatitude),
                  lng: parseFloat(selectedOrder.senderLongitude),
                }}
                icon={{
                  url: GreenMarker,
                }}
              >
              </Marker>
              <Marker
                position={{
                  lat: parseFloat(selectedOrder.storage.latitude),
                  lng: parseFloat(selectedOrder.storage.longitude),
                }}
                icon={{
                  url: BlueMarker,
                }}
              >
              </Marker>
              <Marker
                position={  {
                  lat: parseFloat(selectedOrder.destinationLatitude),
                  lng: parseFloat(selectedOrder.destinationLongitude),
                }}
                icon={{
                  url: RedMarker,
                }}
              >
              </Marker>

              <Polyline
                path={[
                  {
                    lat: parseFloat(selectedOrder.senderLatitude),
                    lng: parseFloat(selectedOrder.senderLongitude),
                  },
                  {
                    lat: parseFloat(selectedOrder.storage.latitude),
                    lng: parseFloat(selectedOrder.storage.longitude),
                  },
                ]}
                options={{
                  strokeColor: "#041967",
                  //strokeOpacity: 0.5,
                  strokeWeight: 2,
                  geodesic: true,
                  icons: [{
                    // eslint-disable-next-line no-undef
                    icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                    offset: '50%'
                  }]
                }}
              />
              <Polyline
                path={[
                  {
                    lat: parseFloat(selectedOrder.storage.latitude),
                    lng: parseFloat(selectedOrder.storage.longitude),
                  },
                  {
                    lat: parseFloat(selectedOrder.destinationLatitude),
                    lng: parseFloat(selectedOrder.destinationLongitude),
                  },
                ]}
                options={{
                  strokeColor: "#041967",
                  //strokeOpacity: 0.5,
                  strokeWeight: 2,
                  geodesic: true,
                  icons: [{
                    // eslint-disable-next-line no-undef
                    icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                    offset: '50%'
                  }]
                }}
              />
            </>
          )}

        </GoogleMap>
      </div>

      <div className="order-container-delivery">
        {onGoingDeliveringOrders && onGoingDeliveringOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Your Delivering Order</strong>
            </div>
            <div className="order-row">
              {onGoingDeliveringOrders &&
                onGoingDeliveringOrders.map &&
                onGoingDeliveringOrders.map((order, index) => {
                  // Show all orders if showAll is true, otherwise show only the first 3
                  if (index >= 3) return null;
                  return (
                    <div className="order-card" key={order.id} onClick={() => handleMapDirectionShow(order)}>
                      <h5 className="card-title">{order.name}</h5>
                      <p className="card-text">
                        Created Date: {dateTimeConvert(order.createdDate)}
                      </p>
                      <p className="card-text">
                        Expected Finish Date:{" "}
                        {dateTimeConvert(order.expectedFinishDate)}
                      </p>
                      <div className="button-container">
                        <Button
                          variant="contained"
                          onClick={() => handleViewDetail(order)}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {onGoingDeliveringOrders.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}

        {ongoingGettingOrders && ongoingGettingOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Your Getting Order</strong>
            </div>
            <div className="order-row">
              {ongoingGettingOrders &&
                ongoingGettingOrders.map &&
                ongoingGettingOrders.map((order, index) => {
                  // Show all orders if showAll is true, otherwise show only the first 3
                  if (index >= 3) return null;
                  return (
                    <div className="order-card" key={order.id} onClick={() => handleMapDirectionShow(order)}>
                      <h5 className="card-title">Order {order.name}</h5>
                      <p className="card-text">
                        Created Date: {dateTimeConvert(order.createdDate)}
                      </p>
                      <p className="card-text">
                        Expected Finish Date:{" "}
                        {dateTimeConvert(order.expectedFinishDate)}
                      </p>
                      <div className="button-container">
                        <Button
                          variant="contained"
                          onClick={() => handleViewDetail(order)}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {ongoingGettingOrders.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}

        {acceptedOrders && acceptedOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Waiting For Getting Order</strong>
            </div>
            <div className="order-row">
              {acceptedOrders &&
                acceptedOrders.map &&
                acceptedOrders.map((order, index) => {
                  // Show all orders if showAll is true, otherwise show only the first 3
                  if (index >= 3) return null;
                  return (
                    <div className="order-card" key={order.id} onClick={() => handleMapDirectionShow(order)}>
                      <h5 className="card-title">Order {order.name}</h5>
                      <p className="card-text">
                        Created Date: {dateTimeConvert(order.createdDate)}
                      </p>
                      <p className="card-text">
                        Expected Finish Date:{" "}
                        {dateTimeConvert(order.expectedFinishDate)}
                      </p>
                      <div className="button-container">
                        <Button
                          variant="contained"
                          onClick={() => handleViewDetail(order)}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {acceptedOrders.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}

        {confirmedOrders && confirmedOrders.length > 0 && (
          <div>
            <div className="order">
              <strong>Waiting For Delivered Order</strong>
            </div>
            <div className="order-row">
              {confirmedOrders &&
                confirmedOrders.map &&
                confirmedOrders.map((order, index) => {
                  // Show all orders if showAll is true, otherwise show only the first 3
                  if (index >= 3) return null;
                  return (
                    <div className="order-card" key={order.id} onClick={() => handleMapDirectionShow(order)}>
                      <h5 className="card-title">Order {order.name}</h5>
                      <p className="card-text">
                        Created Date: {dateTimeConvert(order.createdDate)}
                      </p>
                      <p className="card-text">
                        Expected Finish Date:{" "}
                        {dateTimeConvert(order.expectedFinishDate)}
                      </p>
                      <div className="button-container">
                        <Button
                          variant="contained"
                          onClick={() => handleViewDetail(order)}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {confirmedOrderStatus.length > 3 && (
              <div className="view-more">
                <a href="#">View more →</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
