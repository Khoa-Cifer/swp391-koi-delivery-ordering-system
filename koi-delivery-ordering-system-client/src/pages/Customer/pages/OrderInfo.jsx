import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_API_KEY } from "../../../utils/constants";
import ToastUtil from "../../../components/toastContainer";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function OrderInfo({ formStep, orderGeneralData }) {
    const [orderName, setOrderName] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [receiverAddress, setreceiverAddress] = useState("");

    function handleNameChange(e) {
        setOrderName(e.target.value);
    }

    function handleDescChange(e) {
        setOrderDescription(e.target.value);
    }

    function handleAddressChange(e) {
        setreceiverAddress(e.target.value);
    }

    const { ref,  } = usePlacesWidget({
        apiKey: GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            setreceiverAddress(place.formatted_address || "");
        },
    });

    function handleSubmit() {
        if (!orderName || !orderDescription || !receiverAddress) {
            toast("All fields are required");
            return;
        }
        formStep(2);
        orderGeneralData({
            name: orderName,
            description: orderDescription,
            receiver: receiverAddress,
        });
    }

    return (
        <Box>
            <ToastUtil />
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
                            type="text"
                            name="text"
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
                            ref={ref}
                            onChange={e => handleAddressChange(e)}
                        />
                    </div>
                    <button onClick={() => handleSubmit()} className="form-button">
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;