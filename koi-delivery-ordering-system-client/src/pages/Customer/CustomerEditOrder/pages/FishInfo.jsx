/* eslint-disable react/prop-types */
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import Fish from "../utils/Fish";

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

function FishInfo({ order }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return order.fishes && (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {order.fishes.map && order.fishes.map((fish, index) => (
                        <Tab key={fish.id} label={`${fish.name}`} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {order.fishes.map && order.fishes.map((fish, index) => (
                <CustomTabPanel value={value} index={index} key={index}>
                    <div className="body-container">
                        <Fish fish={fish} />
                    </div>
                </CustomTabPanel>
            ))}
        </div>
    )
}

export default FishInfo;