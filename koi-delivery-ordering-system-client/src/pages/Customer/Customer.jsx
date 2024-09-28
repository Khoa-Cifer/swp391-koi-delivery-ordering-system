import { Box, styled, Tab, Tabs } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import PropTypes from 'prop-types';
import OrderInfo from "./pages/OrderInfo";
import FishInfo from "./pages/FishInfo";
import { useState } from "react";
import "./components/body_customer.scss"

const CustomTab = styled(Tab)(() => ({
    maxWidth: "20%"
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div style={{ marginTop: "20px" }}>{children}</div>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function Customer() {
    const [generalData, setGeneralData] = useState({});
    const [value, setValue] = useState(0);
    const [formStep, setFormStep] = useState(0);

    function handleOrderId(e) {
        setGeneralData(e);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFormStep = (e) => {
        setValue(e);
        setFormStep(e);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <Header />

            <Box sx={{ display: 'flex', flex: 1 }}>
                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 2, mt: '64px', display: "flex" }}>
                    <Sidebar />
                    <div style={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange}>
                                <CustomTab label="Order Info" {...a11yProps(0)} />
                                {formStep === 1 && (
                                    <CustomTab label="Fish Info" {...a11yProps(1)} />
                                )}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <div className="body-container">
                                <OrderInfo orderId={e => handleOrderId(e)} formStepData={e => handleFormStep(e)} />
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className="body-container">
                                <FishInfo orderId={generalData} formStepData={e => handleFormStep(e)} />
                            </div>
                        </CustomTabPanel>
                    </div>
                </Box>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default Customer;