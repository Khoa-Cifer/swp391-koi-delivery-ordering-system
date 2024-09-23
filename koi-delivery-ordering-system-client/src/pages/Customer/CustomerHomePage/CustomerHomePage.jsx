import { Box } from "@mui/material";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function CustomerHomePage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <Header />

            <Box sx={{ display: 'flex', flex: 1 }}>
                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 2, mt: '64px' }}>
                    <Sidebar />
                    <Body />
                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default CustomerHomePage;