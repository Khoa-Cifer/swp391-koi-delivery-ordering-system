import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import ToastUtil from "../../../components/toastContainer";
import { toast } from "react-toastify";
import { CONSTANT_GOOGLE_MAP_API_KEY } from "../../../utils/constants"
import { jwtDecode } from "jwt-decode";
import { createGeneralOrderInfo } from "../../../utils/customers/createOrder";

// eslint-disable-next-line react/prop-types
function OrderInfo({ formStep, orderId }) {
    const [orderName, setOrderName] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [receiverAddress, setreceiverAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    useEffect(() => {
        const geocodeAddress = () => {
            if (receiverAddress.trim() === '') {
                return;
            }

            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: receiverAddress }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    setCoordinates({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                } else {
                    setCoordinates({
                        lat: null,
                        lng: null,
                    });
                }
            });
        };

        if (receiverAddress.length >= 5) { // Minimal validation for address length
            geocodeAddress();
        }

    }, [receiverAddress]);

    function handleNameChange(e) {
        setOrderName(e.target.value);
    }

    function handleDescChange(e) {
        setOrderDescription(e.target.value);
    }

    const { ref } = usePlacesWidget({
        apiKey: CONSTANT_GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            setreceiverAddress(place.formatted_address || "");
        },
    });

    async function handleSubmit() {
        if (!orderName || !orderDescription || !receiverAddress) {
            toast("All fields are required");
            return;
        }
        try {
            const response = await createGeneralOrderInfo(
                orderName,
                orderDescription,
                receiverAddress,
                coordinates.lng,
                coordinates.lat
            )
            orderId(response);
            if (response) {
                toast("Create successfully");
            }
            formStep(2);
        } catch (e) {
            toast("unexpected error has been occurred")
        }
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