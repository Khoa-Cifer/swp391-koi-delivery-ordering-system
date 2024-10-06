import { Box, styled, Tab, Tabs } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import PostedOrder from "./pages/PostedOrder";
import "./customer_home.scss"

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


function CustomerHome() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ width: "100%" }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Posted Order" {...a11yProps(0)} />
                        <Tab label="Draft Order" {...a11yProps(1)} />
                        <Tab label="Getting Order" {...a11yProps(2)} />
                        <Tab label="Delivering Order" {...a11yProps(3)} />
                        <Tab label="Complete" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PostedOrder />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Item Four
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    Item Five
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default CustomerHome;