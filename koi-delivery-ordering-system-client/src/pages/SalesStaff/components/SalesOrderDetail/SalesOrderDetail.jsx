import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./MainContent.scss";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import GreenMarker from "../../../../assets/succeeded.svg"
import BlueMarker from "../../../../assets/inTransit.svg"
import RedMarker from "../../../../assets/failed.svg"
import { updateOrderSalesAction, updateOrderStatus } from "../../../../utils/axios/order";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import { jwtDecode } from "jwt-decode";

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

function SalesOrderDetail() {
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
  let salesId;
  if (token) {
    const salesInfo = jwtDecode(token);
    salesId = salesInfo.sub.substring(2);
  }

  const [center, setCenter] = useState(centerDefault);
  const { state } = location;
  const [map, setMap] = useState(null);

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

  const cancelledOrderStatus = 8;
  const acceptedOrderStatus = 2;
  const confirmedOrderStatus = 5;

  const acceptSales = 0;
  const confirmSales = 1;
  const cancelSales = 2;

  async function handleAcceptOrder() {
    const response = await updateOrderStatus(state.id, acceptedOrderStatus, salesId);
    const salesUpdateOrderResponse = await updateOrderSalesAction(state.id, salesId, acceptSales);
    if (response && salesUpdateOrderResponse) {
      toast("Order accepted");
      navigate("/sales-staff-home")
    } else {
      toast("Unexpected Error has been occurred");
    }
  }

  async function handleConfirmOrder() {
    const response = await updateOrderStatus(state.id, confirmedOrderStatus, salesId);
    const salesUpdateOrderResponse = await updateOrderSalesAction(state.id, salesId, confirmSales);
    if (response && salesUpdateOrderResponse) {
      toast("Order confirmed");
      navigate("/sales-staff-home")
    } else {
      toast("Unexpected Error has been occurred");
    }
  }

  async function handleCancelOrder() {
    const response = await updateOrderStatus(state.id, cancelledOrderStatus);
    const salesUpdateOrderResponse = await updateOrderSalesAction(state.id, salesId, cancelSales);
    if (response && salesUpdateOrderResponse) {
      toast("Order cancelled");
      navigate("/sales-staff-home")
    } else {
      toast("Unexpected Error has been occurred");
    }
  }

  function handleViewFishDetail() {
    navigate(`/sales-order-detail/${id}/sales-fish-detail`, {
      state: state
    });
  }

  return (
    <div className="sales-order-details-container">
      {/* Order Details Table */}
      <ToastUtil />
      <div className="order-name-detail">
        <strong>{state.name}</strong>
      </div>

      <div className="order-details">
        <div className="details-row">
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
          <button className="view-fish-btn" onClick={() => handleViewFishDetail()}>View Fishes</button>
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

          {userData.roleId === 2 && (
            <>
              <SubmitButton variant="contained" style={{ backgroundColor: "#f44336" }} onClick={() => handleCancelOrder()}>Cancel</SubmitButton>
              {state.orderStatus === 1 && (
                <SubmitButton variant="contained" onClick={() => handleAcceptOrder()}>Accept</SubmitButton>
              )}
              {state.orderStatus === 4 && (
                <SubmitButton variant="contained" onClick={() => handleConfirmOrder()}>Confirm</SubmitButton>
              )}
            </>
          )}
        </Box>
      </div>

      {/* Google Map Section */}
    </div>
  );
}

export default SalesOrderDetail;