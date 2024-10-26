/* eslint-disable react/prop-types */
import { Box, Button, Menu, MenuItem, Modal, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";
import { useCallback, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import BlueMarker from "../../../../assets/inTransit.svg"
import GreenMarker from "../../../../assets/succeeded.svg"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import { useNavigate } from "react-router-dom";
import { deleteFishById } from "../../../../utils/axios/fish";
import { deleteOrderById } from "../../../../utils/axios/order";

const OrderCard = styled(Box)(() => ({
    backgroundColor: "#C3F4FD",
    borderRadius: "20px",
    width: "40%",
    padding: "40px 20px",
    border: "1px solid #0264F8"
}));

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const containerStyle = {
    width: '50%',
    height: '650px',
};

const ContentBox = styled(Box)(() => ({
    display: "flex",
    gap: "20px"
}))
const OrderInfoField = styled(TextField)(() => ({
    backgroundColor: "white",
}))

function OrderDetailComponent({ orders }) {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [map, setMap] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFishId, setSelectedFishId] = useState(null);
    const [fishModalOpen, setFishModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < orders.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleDropdownClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseFishModal = () => {
        setFishModalOpen(false);
    };

    const handleDeleteFish = (fishId, order) => {
        if (order.fishes.length > 1) {
            setSelectedFishId(fishId);
            setFishModalOpen(true);
        } else {
            toast("An order can not have empty fish");
        }
    }

    const handleOpenAddFishPage = (order) => {
        navigate(`/customer-add-fish/${order.id}`, {
            state: order,
        });
    };

    // Close the menu
    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleCloseOrderModal = () => {
        setOrderModalOpen(false);
    };

    async function handleDeleteOrderConfirm() {
        try {
            const response = await deleteOrderById(
                selectedOrderId,
            );
            if (response) {
                toast("Delete order successfully");
                setTimeout(() => {
                    navigate("/customer-home");
                }, 500);
                setOrderModalOpen(false);
            } else {
                toast("Unexpected error has been occured");
            }
        } catch (error) {
            console.log(error);
            toast("Unexpected error has been occured");
        }
    }

    function handleConclusion(order) {
        navigate(`/customer-edit-order/${order.id}/order-conclusion-info`)
    }

    const handleOpenEditPage = (order) => {
        if (order.fishes && order.fishes.length > 0) {
            navigate(`/customer-edit-order/${order.id}`, {
                state: order,
            });
        } else {
            toast("An order must have at least one fish");
        }
    };

    const handleDeleteOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setOrderModalOpen(true);
    };

    const handleDeleteFishConfirm = async () => {
        const response = await deleteFishById(selectedFishId);
        if (response) {
            toast("Delete fish successfully");
            setTimeout(() => {
                window.location.reload();
            }, 500);
            setFishModalOpen(false);
        } else {
            toast("Unexpected error has been occured");
        }
    }

    if (!orders || orders.length === 0) {
        return <Box>No orders available</Box>;
    }

    const currentOrder = orders[currentIndex];

    return orders && orders.length > 0 && (
        <Box>
            <ToastUtil />

            <Modal
                open={orderModalOpen}
                onClose={handleCloseOrderModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        Are you sure about delete this order ?
                    </Typography>
                    <div style={{ margin: "20px" }}></div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={() => handleDeleteOrderConfirm()}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={fishModalOpen}
                onClose={handleCloseFishModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        Are you sure about delete this fish ?
                    </Typography>
                    <div style={{ margin: "20px" }}></div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={() => handleDeleteFishConfirm()}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>

            {(currentOrder.orderStatus === 0 || currentOrder.orderStatus === 1) && (
                <Box style={{ display: "flex", justifyContent: "flex-end", marginRight: "100px" }}>
                    {currentOrder.orderStatus === 0 ? (
                        <Button onClick={() => handleConclusion(currentOrder)}>Make your payment</Button>
                    ) : (
                        <Button disabled>Make your payment</Button>
                    )}
                    <Button onClick={() => handleOpenEditPage(currentOrder)}>Edit</Button>
                    <Button onClick={() => handleDeleteOrder(currentOrder.id)}>Delete</Button>
                </Box>
            )}

            <ContentBox>
                <OrderCard>
                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.name}
                            label="Name"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.description}
                            label="Description"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.senderAddress}
                            label="Sender Address"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.destinationAddress}
                            label="Receiver Address"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.receiverEmail}
                            label="Receiver Email"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={currentOrder.receiverPhoneNumber}
                            label="Receiver Phone Number"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <OrderInfoField
                            fullWidth
                            type=""
                            value={dateTimeConvert(currentOrder.createdDate)}
                            label="Created Date"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>

                    {currentOrder.finishDate ? (
                        <div className="form-group">
                            <OrderInfoField
                                fullWidth
                                type=""
                                value={dateTimeConvert(currentOrder.finishDate)}
                                label="Finish Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <OrderInfoField
                                fullWidth
                                type=""
                                value={dateTimeConvert(currentOrder.expectedFinishDate)}
                                label="Expected Finish Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    )}
                </OrderCard>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: parseFloat(currentOrder.storage.latitude),
                        lng: parseFloat(currentOrder.storage.longitude)
                    }}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <>
                        <Marker
                            position={{
                                lat: parseFloat(currentOrder.senderLatitude),
                                lng: parseFloat(currentOrder.senderLongitude),
                            }}
                            icon={{
                                url: GreenMarker,
                            }}
                        >
                        </Marker>
                        <Marker
                            position={{
                                lat: parseFloat(currentOrder.destinationLatitude),
                                lng: parseFloat(currentOrder.destinationLongitude),
                            }}
                            icon={{
                                url: BlueMarker,
                            }}
                        >
                        </Marker>

                        <Polyline
                            path={[
                                {
                                    lat: parseFloat(currentOrder.senderLatitude),
                                    lng: parseFloat(currentOrder.senderLongitude),
                                },
                                {
                                    lat: parseFloat(currentOrder.destinationLatitude),
                                    lng: parseFloat(currentOrder.destinationLongitude),
                                },
                            ]}
                            options={{
                                strokeColor: "#041967",
                                //strokeOpacity: 0.5,
                                strokeWeight: 2,
                                geodesic: true,
                                icons: [{
                                    // eslint-disable-next-line no-undef
                                    icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                                    offset: '50%'
                                }]
                            }}
                        />
                    </>
                </GoogleMap>
            </ContentBox>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table aria-label="order-details">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fish Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentOrder.fishes &&
                            currentOrder.fishes.map &&
                            currentOrder.fishes.map((fish) => (
                                <TableRow key={fish.id}>
                                    <TableCell>{fish.id}</TableCell>
                                    <TableCell>{fish.name}</TableCell>
                                    <TableCell>{fish.price}</TableCell>
                                    <TableCell>{fish.size}</TableCell>
                                    {fish.status === 0 && (
                                        <TableCell>Unknown</TableCell>
                                    )}
                                    {fish.status === 1 && <TableCell>Good</TableCell>}
                                    {fish.status === 2 && <TableCell>Sick</TableCell>}
                                    {fish.status === 3 && <TableCell>Dead</TableCell>}
                                    <TableCell>{fish.weight}</TableCell>
                                    <TableCell><div className="button-icon" onClick={(e) => handleDropdownClick(e)}><MoreHorizIcon /></div>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={() => handleDropdownClose()}
                                        >
                                            {(currentOrder.orderStatus === 0 || currentOrder.orderStatus === 1) && (
                                                <MenuItem onClick={() => handleDeleteFish(fish.id, currentOrder)}>Delete Fish</MenuItem>
                                            )}
                                            {/* <MenuItem onClick={() => handleViewLicense()}>View License</MenuItem> */}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}

                        {/* Add "+" button below the fish list */}
                        {(currentOrder.orderStatus === 0 || currentOrder.orderStatus === 1) && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenAddFishPage(currentOrder)} // Correct
                                        style={{
                                            fontSize: "25px",
                                            padding: "5px 20px",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        +
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Navigation buttons */}
            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous Order
                </Button>
                <Button onClick={handleNext} disabled={currentIndex === orders.length - 1}>
                    Next Order
                </Button>
            </Box>
        </Box>
    );
}

export default OrderDetailComponent;