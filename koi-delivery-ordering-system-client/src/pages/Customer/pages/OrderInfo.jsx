import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import ToastUtil from "../../../components/toastContainer";
import { toast } from "react-toastify";
import { CONSTANT_GOOGLE_MAP_API_KEY } from "../../../utils/constants"
import { createGeneralOrderInfo } from "../../../utils/customers/createOrder";

// eslint-disable-next-line react/prop-types
function OrderInfo({ orderId, formStepData }) {
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
                formStepData(1);
                toast("Create successfully");
            }
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
                        <input
                            placeholder="Name"
                            type="text"
                            name="name"
                            className="form-input"
                            onChange={e => handleNameChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Description"
                            type="text"
                            name="text"
                            className="form-input"
                            onChange={e => handleDescChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="text"
                            className="form-input"
                            ref={ref}
                        />
                    </div>

                    <button onClick={() => handleSubmit()} className="form-button">
                        Submit & Next Step
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;