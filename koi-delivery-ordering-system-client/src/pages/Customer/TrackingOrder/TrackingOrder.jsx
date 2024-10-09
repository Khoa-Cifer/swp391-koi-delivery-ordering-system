import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100%", // Set width to 100% to fill the parent container
  height: "100%", // Set height to 100% to fill the parent container
};

const TrackingOrder = () => {
  const centerDefault = {
    lat: 10.75,
    lng: 106.6667,
  };
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const [center, setCenter] = useState(centerDefault);

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
              justifyContent: "flex-start", // Align logo to the start
            }}
          >
            <img
              src="./src/assets/logo.png"
              alt="Logo"
              style={{ height: "40px", width: "auto" }} // Adjust height as needed
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                padding: "0 10px",
                borderRadius: "5px",
                width: "250px",
                backgroundColor: "#fff",
              }}
            >
              <SearchIcon sx={{ color: "#999" }} />
              <InputBase
                placeholder="Search By Tracking ID"
                inputProps={{ "aria-label": "search by tracking id" }}
                fullWidth
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "10px", height: "40px" }}
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          marginTop: "20px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          height: "83vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
          >
            <></>
          </GoogleMap>
        </Box>
      </Container>
    </div>
  );
};

export default TrackingOrder;
