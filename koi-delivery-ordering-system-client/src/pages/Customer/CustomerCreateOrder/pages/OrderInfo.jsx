import { Box, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { toast } from "react-toastify";
import { Calendar } from "react-date-range";
import { GoogleMap } from "@react-google-maps/api";
import { Button, Flex } from "antd";
import { createGeneralOrderInfo, filterOrder } from "../../../../utils/axios/order";
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

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        const geocodeAddress = () => {
            if (receiverAddress.trim() === '') {
                return;
            }

            const geocoder = new window.google.maps.Geocoder();

            //Đổi toạ độ
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

    function handleSenderAddressChange(e) {
        setSenderAddress(e.target.value);
    }

    function handleReceiverAddressChange(e) {
        setReceiverAddress(e.target.value);
    }

    function handleDescChange(e) {
        setOrderDescription(e.target.value);
    }

    const { ref: senderRef } = usePlacesWidget({
        onPlaceSelected: (place) => {
            setSenderAddress(place.formatted_address || "");
        },
    });

    const { ref: receiverRef } = usePlacesWidget({
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
            const filter = await filterOrder(response);
            toast("Create successfully");
            if (filter.storage) {
                orderId(filter.id);
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
                            ref={senderRef}
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
                            ref={receiverRef}
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
                            backgroundColor: selectedButton === 0 ? 'blue' : '',
                        }}
                    >
                        Select Address for Sender
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(1)}
                        style={{
                            backgroundColor: selectedButton === 1 ? 'blue' : '',
                        }}
                    >
                        Select Address for Receiver
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