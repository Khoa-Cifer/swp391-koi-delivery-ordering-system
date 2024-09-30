import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import ToastUtil from "../../../components/toastContainer";
import { toast } from "react-toastify";
import { CONSTANT_GOOGLE_MAP_API_KEY } from "../../../utils/constants"
import { createGeneralOrderInfo } from "../../../utils/customers/createOrder";
import { Calendar } from "react-date-range";

// eslint-disable-next-line react/prop-types
function OrderInfo({ orderId, formStepData }) {
    const [orderName, setOrderName] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [senderAddress, setSenderAddress] = useState("");
    const [senderCoordinates, setSenderCoordinates] = useState({ lat: null, lng: null });
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverCoordinates, setReceiverCoordinates] = useState({ lat: null, lng: null });
    const [expectedFinishDate, setExpectedFinishDate] = useState(null);

    useEffect(() => {
        const geocodeAddress = () => {
            if (senderAddress.trim() === '') {
                return;
            }

            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: senderAddress }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    setSenderCoordinates({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                } else {
                    setSenderCoordinates({
                        lat: null,
                        lng: null,
                    });
                }
            });
        };

        if (senderAddress.length >= 5) { // Minimal validation for address length
            geocodeAddress();
        }

    }, [senderAddress]);

    useEffect(() => {
        const geocodeAddress = () => {
            if (receiverAddress.trim() === '') {
                return;
            }

            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: receiverAddress }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    setReceiverCoordinates({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                } else {
                    setReceiverCoordinates({
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

    const { ref: senderRef } = usePlacesWidget({
        apiKey: CONSTANT_GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            setSenderAddress(place.formatted_address || "");
        },
    });

    const { ref: receiverRef } = usePlacesWidget({
        apiKey: CONSTANT_GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            setReceiverAddress(place.formatted_address || "");
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
                receiverCoordinates.lng,
                receiverCoordinates.lat,
                senderAddress,
                senderCoordinates.lng,
                senderCoordinates.lat,
                new Date(expectedFinishDate).toISOString()
            )
            orderId(response);
            if (response) {
                formStepData(1);
                toast("Create successfully");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            toast("unexpected error has been occurred")
        }
    }

    const handleDateChange = (e) => {
        setExpectedFinishDate(e);
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
                            placeholder="Sender Address"
                            type="text"
                            name="text"
                            className="form-input"
                            ref={senderRef}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Destination Address"
                            type="text"
                            name="text"
                            className="form-input"
                            ref={receiverRef}
                        />
                    </div>

                    <Calendar onChange={e => handleDateChange(e)} date={expectedFinishDate} />

                    <button onClick={() => handleSubmit()} className="form-button">
                        Submit & Next Step
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;