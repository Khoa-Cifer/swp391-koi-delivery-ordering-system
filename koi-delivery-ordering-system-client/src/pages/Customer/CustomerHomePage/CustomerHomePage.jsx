import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import Footer from "./components/Footer";

function CustomerHomePage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <Header />

            <Box sx={{ display: 'flex', flex: 1 }}>
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 2, mt: '64px' }}>
                    {/* The `mt` (margin-top) ensures content is below the header */}
                    <Body />
                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default CustomerHomePage;