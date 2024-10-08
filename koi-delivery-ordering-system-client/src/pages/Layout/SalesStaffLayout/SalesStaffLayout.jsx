import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function SalesStaffLayout() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "100vw" }}>
            {/* Header */}
            <Header />

            <Box sx={{ display: "flex", flex: 1 }}>
                {/* Main Content */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 2, mt: "64px", display: "flex" }}
                >
                    <Sidebar />
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default SalesStaffLayout;