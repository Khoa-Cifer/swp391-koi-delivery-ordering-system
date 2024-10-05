import { Box } from "@mui/material";
import Header from "../SalesComponent/Header/Header";
import Sidebar from "../SalesComponent/Sidebar/Sidebar";
import MainContent from "./Conponent/MainContent";
import HeaderBar from "../../DeliveryStaff/components/HeaderBar";
import Footer from "../../DeliveryStaff/components/Footer";

function SalesStaffHome() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <HeaderBar />

      <Box sx={{ display: "flex", flex: 1, mt: "64px" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <MainContent />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default SalesStaffHome;
