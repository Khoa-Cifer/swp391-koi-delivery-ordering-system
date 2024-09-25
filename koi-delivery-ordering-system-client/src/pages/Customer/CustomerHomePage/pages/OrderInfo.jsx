import { Box } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function OrderInfo({ formStep }) {
    const [orderName, setOrderName] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [receiverAddres, setreceiverAddres] = useState("");

    function handleNameChange(e) {
        setOrderName(e.target.value);
    }

    function handleDescChange(e) {
        setOrderDescription(e.target.value);
    }

    function handleAddressChange(e) {
        setreceiverAddres(e.target.value);
    }

    return (
        <Box>
            <div className="form-container">
                <div className="form">
                    <div className="form-group">
                        <label className="form-label">Name: </label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            onChange={e => handleNameChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description: </label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            onChange={e => handleDescChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Receiver Address: </label>
                        <input
                            type="text"
                            name="text"
                            className="form-input"
                            onChange={e => handleAddressChange(e)}
                        />
                    </div>
                    <button onClick={() => formStep(2)} className="form-button">
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;