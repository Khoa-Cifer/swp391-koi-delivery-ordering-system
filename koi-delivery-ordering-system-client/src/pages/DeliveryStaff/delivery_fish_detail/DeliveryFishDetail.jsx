import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import MainContent from "./components/MainContent";
function DeliveryFishDetail() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <HeaderBar />

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, mt: "64px", display: "flex" }}
        >
          <Sidebar />
          <MainContent />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default DeliveryFishDetail;
