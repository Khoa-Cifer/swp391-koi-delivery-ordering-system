import { Box } from "@mui/material";
import Sidebar from "../components/SideBar/Sidebar";
import HeaderBar from "../components/Header/HeaderBar";
import Footer from "../components/Footer/Footer";
import MainContent from "./components/MainContent";

function DeliveryOrderHome() {
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

export default DeliveryOrderHome;
