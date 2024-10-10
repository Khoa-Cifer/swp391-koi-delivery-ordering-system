// import "./MainContent.scss";
// const MainContent = () => {
//   return (
//     <div className="order-details-container">
//       {/* Order Details Table */}

import { Box, Button, Grid, Paper, styled } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createOrderDeliveringData, updateOrderDeliveringLocation } from "../../../../utils/axios/orderDelivering";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import dateTimeConvert from "../../../../components/utils";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import GreenMarker from "../../../../assets/succeeded.svg"
import BlueMarker from "../../../../assets/inTransit.svg"
import RedMarker from "../../../../assets/failed.svg"
import { updateDeliveryStaffCurrentLocation } from "../../../../utils/axios/deliveryStaff";
import { finishOrder } from "../../../../utils/axios/order";
import Spinner from "../../../../components/SpinnerLoading";

//       <div className="order-name-detail">
//         <strong>Order name</strong>
//       </div>
//       <div className="order-status-detail">Order status</div>

//       <div className="order-details">
//         <div className="details-row">
//           <div className="details-column">
//             <p>Tracking Id</p>
//             <p>Receiver Address</p>
//             <p>Sender Address</p>
//           </div>
//           <div className="details-column">
//             <p>Name</p>
//             <p>Price</p>
//           </div>
//           <div className="details-column">
//             <p>Created Date</p>
//             <p>Last Updated Date / Finish Date</p>
//           </div>
//           <div className="view-fish">
//             <button className="view-fish-btn">View Fish </button>
//           </div>
//         </div>

//         <div className="map-placeholder">Google Map</div>

//         <div className="order-description">
//           <h4>Description</h4>
//           <p>
//             Con biết bây giờ mẹ chờ tin con Khi thấy mai đào nở vàng bên nương
//             Năm trước con hẹn đầu xuân sẽ về Nay én bay đầy trước ngõ mà tin con
//             vẫn xa ngàn xa Ôi nhớ xuân nào thuở trời yên vui Nghe pháo giao thừa
//             rộn ràng nơi nơi Bên mái tranh nghèo ngồi quanh bếp hồng Trông bánh
//             chưng chờ trời sáng Đỏ hây hây những đôi má đào Nếu con không về
//             chắc mẹ buồn lắm, Mái tranh nghèo không người sửa sang Khu vườn
//             thiếu hoa vàng mừng xuân Đàn trẻ thơ ngây chờ mong anh trai Sẽ đem
//             về cho tà áo mới Ba ngày xuân đi khoe xóm giềng
//           </p>
//         </div>
//       </div>

//       {/* Google Map Section */}
//     </div>
//   );
// };

// export default MainContent;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),

  minHeight: '48px', // Adjust as needed for desired height
  lineHeight: '1.5', // Adjust line height for better spacing
}));

const SubmitButton = styled(Button)(() => ({
  padding: "10px 50px"
}))

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const centerDefault = {
    lat: 10.75,
    lng: 106.6667
  };
  const { id } = useParams();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const googleMapStyled = {
    width: "100%",
    height: "50vh",
  }

  const token = localStorage.getItem("token");
  let deliveryStaffId;
  if (token) {
    const deliveryStaffInfo = jwtDecode(token);
    deliveryStaffId = deliveryStaffInfo.sub.substring(2);
  }

  const [center, setCenter] = useState(centerDefault);
  const { state } = location;
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const senderPosition = {
    lat: parseFloat(state.senderLatitude),
    lng: parseFloat(state.senderLongitude),
  };
  const receiverPosition = {
    lat: parseFloat(state.destinationLatitude),
    lng: parseFloat(state.destinationLongitude),
  };

  const storagePosition = {
    lat: parseFloat(state.storage.latitude),
    lng: parseFloat(state.storage.longitude),
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Function to reverse geocode lat, lng to an address
  const getAddressFromCoordinates = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed due to: ", status);
      }
    });
  };

  async function handleReceiveOrder() {
    setIsLoading(true);
    try {
      const response = await createOrderDeliveringData(deliveryStaffId, state.id);

      if (response) {
        toast("Order information updated");
      } else {
        toast("Unexpected error occurred");
      }

      navigate("/delivery-order-home");
    } catch (error) {
      console.error("Error while receiving the order:", error);
      toast("An error occurred while processing request.");
    } finally {
      setIsLoading(false); // Hide loading spinner after processing
    }
  }

  async function handleUpdateOrderLocation() {
    const availableOrderDelivering = state.orderDeliveringSet.reduce((prev, current) => {
      return (prev.id > current.id) ? prev : current;
    });
    const response = await updateOrderDeliveringLocation(availableOrderDelivering.id, address, currentLocation.lat, currentLocation.lng);

    if (response) {
      await updateDeliveryStaffCurrentLocation(deliveryStaffId, address, currentLocation.lat, currentLocation.lng);
    }

    if (response) {
      toast("Order information updated");
    } else {
      toast("Unexpected Error has been occurred");
    }
  }

  async function handleFinishOrderStep() {
    const availableOrderDelivering = state.orderDeliveringSet.reduce((prev, current) => {
      return (prev.id > current.id) ? prev : current;
    });
    const response = await finishOrder(state.id, availableOrderDelivering.id, deliveryStaffId, state.storage.id);

    if (response) {
      toast("Order Finish");
      navigate("/delivery-order-home");
    } else {
      toast("Unexpected Error has been occurred");
    }
  }

  function handleCancelOrder() {
    navigate("/delivery-order-home");
  }

  function handleViewFishDetail() {
    navigate(`/delivery-order-detail/${id}/delivery-fish-detail`);
  }

  return (
    <div className="sales-order-details-container">
      {/* Order Details Table */}
      <ToastUtil />
      {isLoading && <Spinner />} 
      <div className="order-name-detail">
        <strong>{state.name}</strong>
      </div>

      <div className="order-details">
        <div className="details-row">
          {/* <div className="details-column">
            <p>Tracking Id</p>
            <p>Receiver Address</p>
            <p>Sender Address</p>
          </div>
          <div className="details-column">
            <p>Name</p>
            <p>Price</p>
          </div>
          <div className="details-column">
            <p>Created Date</p>
            <p>Last Updated Date / Finish Date</p>
          </div> */}
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>Create Date: {dateTimeConvert(state.createdDate)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Expected Finish Date: {dateTimeConvert(state.expectedFinishDate)}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Tracking Id: {state.trackingId}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Storage Address: {state.storage.address}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Sender Address: {state.senderAddress}</Item>
            </Grid>
            <Grid item xs={6} sx={{ height: '100px' }}>
              <Item>Destination Address: {state.destinationAddress}</Item>
            </Grid>
          </Grid>

        </div>
        <div className="view-fish">
          <button className="view-fish-btn">View Fishes</button>
        </div>

        <GoogleMap
          mapContainerStyle={googleMapStyled}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Polyline
            path={[
              senderPosition,
              storagePosition,
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
              storagePosition,
              receiverPosition,
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

          <Marker
            position={senderPosition}
            icon={{
              url: GreenMarker,
            }}
          >
          </Marker>
          <Marker
            position={storagePosition}
            icon={{
              url: BlueMarker,
            }}
          >
          </Marker>
          <Marker
            position={receiverPosition}
            icon={{
              url: RedMarker,
            }}
          >
          </Marker>
        </GoogleMap>

        <div className="order-description">
          <h4>Description</h4>
          <p>{state.description}</p>
        </div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "30px",
            gap: "20px"
          }}>

          {userData.roleId === 3 && (
            <>
              <SubmitButton variant="contained" style={{ backgroundColor: "#f44336" }} onClick={() => handleCancelOrder()}>Cancel</SubmitButton>
              {state.orderDeliveringSet && state.orderDeliveringSet.length > 0 ? (
                <>
                  <SubmitButton variant="contained" onClick={() => handleUpdateOrderLocation()}>Update Location</SubmitButton>
                  <SubmitButton variant="contained" style={{ backgroundColor: "#01428E" }} onClick={() => handleFinishOrderStep()}>Mark as Complete</SubmitButton>
                </>
              ) : (
                <>
                  <SubmitButton variant="contained" onClick={() => handleReceiveOrder()}>Get This Order</SubmitButton>
                </>
              )}
            </>
          )}
        </Box>
      </div>

      {/* Google Map Section */}
    </div>
  );
}

export default MainContent;