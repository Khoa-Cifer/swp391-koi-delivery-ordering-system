import { Box } from "@mui/material";
import EditProfile from "../../../components/EditProfile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function EditCustomerProfile() {
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        const customerDataFromLocalStorage = localStorage.getItem('customerData');
        if (customerDataFromLocalStorage) {
            const parsedData = JSON.parse(customerDataFromLocalStorage);
            setCustomerData(parsedData);
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <Header />

            <Box sx={{ display: 'flex', flex: 1 }}>
                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 2, mt: '64px', display: "flex" }}>
                    <EditProfile />
                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default EditCustomerProfile;