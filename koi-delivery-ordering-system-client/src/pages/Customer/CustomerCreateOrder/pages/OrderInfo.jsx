import { Box, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Calendar } from "react-date-range";
import { GoogleMap } from "@react-google-maps/api";
import { Button, Flex } from "antd";
import { createGeneralOrderInfo } from "../../../../utils/axios/order";
import ToastUtil from "../../../../components/toastContainer";

const CustomBoxContainer = styled(Box)(() => ({
    display: "flex",
    gap: "40px"
}));

const containerStyle = {
    width: '700px',
    height: '80vh',
    maxWidth: '35vw'
};

// eslint-disable-next-line react/prop-types
function OrderInfo({ orderId, formStepData }) {
    const centerDefault = {
        lat: 10.75,
        lng: 106.6667
    };

    const [center, setCenter] = useState(centerDefault);
    const [orderName, setOrderName] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [senderAddress, setSenderAddress] = useState("");
    const [senderCoordinates, setSenderCoordinates] = useState({ lat: null, lng: null });
    const [receiverAddress, setReceiverAddress] = useState("");
    const [receiverCoordinates, setReceiverCoordinates] = useState({ lat: null, lng: null });
    const [expectedFinishDate, setExpectedFinishDate] = useState(null);
    const [selectedButton, setSelectedButton] = useState(0);
    const [receiverEmail, setReceiverEmail] = useState();
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState();

    const onMapClick = useCallback((e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setCenter({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })

        if (selectedButton === 0) {
            setSenderCoordinates({ lat, lng })
        } else {
            setReceiverCoordinates({ lat, lng })
        }

        // Initialize the Geocoder
        const geocoder = new window.google.maps.Geocoder();

        // Reverse Geocode to get the address
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                if (results[0].formatted_address.includes("+")) {
                    console.log("Invalid token");
                } else {
                    if (selectedButton === 0) {
                        setSenderAddress(results[0].formatted_address);
                    } else {
                        setReceiverAddress(results[0].formatted_address);
                    }
                }
            } else {
                console.error("Geocoder failed due to: " + status);
            }
        });
    }, [selectedButton]);

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    function handleNameChange(e) {
        setOrderName(e.target.value);
    }

    function handleSenderAddressChange(e) {
        setSenderAddress(e.target.value);
    }

    function handleReceiverAddressChange(e) {
        setReceiverAddress(e.target.value);
    }

    function handleDescChange(e) {
        setOrderDescription(e.target.value);
    }

    function handleReceiverEmailChange(e) {
        setReceiverEmail(e.target.value);
    }

    function handleReceiverPhoneNumberChange(e) {
        const phone = e.target.value.replace(/\D/g, "");
        const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        setReceiverPhoneNumber(formattedPhone.slice(0, 12));
    }

    async function handleSubmit() {
        if (!orderName || !orderDescription || !receiverAddress || !senderAddress || !expectedFinishDate
            || !receiverEmail || !receiverPhoneNumber
        ) {
            toast("All fields are required");
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(receiverEmail)) {
            toast("Invalid email format");
            return;
        }

        if (receiverPhoneNumber.length !== 12) { //contain 2 dash
            // Check if phone number has exactly 10 digits
            toast("Phone number must be exactly 10 digits");
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
                new Date(expectedFinishDate).toISOString(),
                receiverEmail,
                receiverPhoneNumber.replace(/-/g, "")
            )
            // const filter = await filterOrder(response);
            if (response) {
                toast("Create successfully");
                orderId(response);
                formStepData(1);
            } else {
                toast("Unsupported Area");
            }

            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            toast("unexpected error has been occurred")
        }
    }

    const handleDateChange = (e) => {
        setExpectedFinishDate(e);
    }

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };

    return (
        <CustomBoxContainer>
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
                            onChange={e => handleSenderAddressChange(e)}
                            value={senderAddress}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Destination Address"
                            type="text"
                            name="text"
                            className="form-input"
                            onChange={e => handleReceiverAddressChange(e)}
                            value={receiverAddress}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Receiver Email"
                            type="text"
                            name="text"
                            className="form-input"
                            onChange={e => handleReceiverEmailChange(e)}
                            value={receiverEmail}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            placeholder="Receiver Phone Number"
                            type="text"
                            name="text"
                            className="form-input"
                            onChange={e => handleReceiverPhoneNumberChange(e)}
                            value={receiverPhoneNumber}
                        />
                    </div>

                    <Calendar onChange={e => handleDateChange(e)} date={expectedFinishDate} />

                    <button onClick={() => handleSubmit()} className="form-button">
                        Submit & Next Step
                    </button>
                </div>
            </div>
            <div>
                <Flex gap="small" wrap style={{ marginBottom: "20px" }}>
                    <Button
                        type="primary"
                        onClick={() => handleButtonClick(0)}
                        style={{
                            backgroundColor: selectedButton === 0 ? '#1b3176' : '#C4F3FD',
                            color: selectedButton === 1 ? 'black' : 'white'
                        }}
                    >
                        Select Address for Sender
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(1)}
                        style={{
                            backgroundColor: selectedButton === 1 ? '#1b3176' : '#C4F3FD',
                            color: selectedButton === 1 ? 'white' : 'black'
                        }}
                    >
                        Select Address for Destination
                    </Button>
                </Flex>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={onMapClick}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </div>
        </CustomBoxContainer>
    )
}

export default OrderInfo;