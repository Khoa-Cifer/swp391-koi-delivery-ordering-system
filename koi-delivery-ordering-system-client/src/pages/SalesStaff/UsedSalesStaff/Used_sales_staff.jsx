import { Box } from "@mui/material";
import Card from "./Card/Card";
import Header from "../SalesComponent/Header/Header";
import Sidebar from "../SalesComponent/Sidebar/Sidebar";


function Sales_staff_home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <Header />

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, mt: "64px", display: "flex" }}
        >
          <Sidebar />
          <Card />
        </Box>
      </Box>
    </Box>
  );
}

export default Sales_staff_home;
