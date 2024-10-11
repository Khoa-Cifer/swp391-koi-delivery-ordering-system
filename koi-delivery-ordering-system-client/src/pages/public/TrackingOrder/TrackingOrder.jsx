import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { getOrderByTrackingId } from "../../../utils/axios/order"; // Ensure this function is defined to fetch order data
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const TrackingOrder = () => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [distance, setDistance] = useState("");

  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleSearch = async () => {
    if (trackingId) {
      try {
          const order = await getOrderByTrackingId(trackingId);
        console.log("Order data:", order);
        setOrderData(order);
        setOrigin(order.senderAddress);
        setDestination(order.destinationAddress);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }
  };

  useEffect(() => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
            const route = result.routes[0];
            const totalDistance = route.legs[0].distance.text;
            setDistance(totalDistance);
          } else {
            console.error(`Error fetching directions ${status}`);
          }
        }
      );
    }
  }, [origin, destination]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  const handleHomeBack = () => {
    navigate("/");
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <img
              onClick={() => handleHomeBack()}
              src="./src/assets/logo.png"
              alt="Logo"
              style={{ height: "40px", width: "auto" }}
            />
          </Box>
          {/* Search Input */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              label="Search by Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)} // Update tracking ID state
              sx={{ mr: 1 }} // Margin to the right
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch} // Trigger the search function
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          height: "83vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Google Map with Order Details */}
        <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={center}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>

          {/* Display order data and distance if available */}
          {orderData && (
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: 2,
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                zIndex: 1,
                maxWidth: "300px",
              }}
            >
              <Typography variant="h6">Order Details</Typography>
              <Typography variant="body2">
                <strong>Sender:</strong> {orderData.senderAddress}
              </Typography>
              <Typography variant="body2">
                <strong>Receiver:</strong> {orderData.destinationAddress}
              </Typography>
              <Typography variant="body2">
                <strong>Distance:</strong> {distance}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default TrackingOrder;
