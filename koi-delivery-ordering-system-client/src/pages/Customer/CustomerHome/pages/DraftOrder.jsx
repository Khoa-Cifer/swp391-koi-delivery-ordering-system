/* eslint-disable react/prop-types */
import { Box, Button, Modal, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteOrderById, getOrdersByStatusAndCustomerId, updateOrderStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ToastUtil from "../../../../components/toastContainer";

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
};

const OrderInfoHeader = styled(Typography)(() => ({
    margin: "0px",
    color: "#252c6d",
    fontSize: "12px",
}));

const SearchBox = styled(Box)(() => ({
    display: "flex",
    gap: "30px"
}));

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function DraftOrder({ customerId }) {
    const [orders, setOrders] = useState();
    const [expandedOrderId, setExpandedOrderId] = useState(null); // To track expanded orders
    const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for display
    const [searchTrackingId, setSearchTrackingId] = useState(""); // For search by order ID
    const [searchOrderName, setSearchOrderName] = useState(""); // For search by customer name
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState();

    const handleClick = (orderId) => {
        // Toggle the visibility of the order table by setting the orderId
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleOpenEditPage = (order) => {
        navigate(`/customer-edit-order/${order.id}`, {
            state: order
        })
    }

    const handleDeleteOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    }

    const handleFilter = () => {
        let filtered = orders;

        if (searchTrackingId !== "") {
            // Filter by order ID
            filtered = filtered.filter((order) =>
                order.trackingId.includes(searchTrackingId.toUpperCase())
            );
        }

        if (searchOrderName !== "") {
            // Filter by customer name
            filtered = filtered.filter((order) =>
                order.name
                    .toLowerCase()
                    .includes(searchOrderName.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
    };

    const draftOrderStatus = 0;
    async function fetchDraftOrder() {
        const response = await getOrdersByStatusAndCustomerId(customerId, draftOrderStatus);
        if (response) {
            setOrders(response);
            setFilteredOrders(response);
        }
    }

    useEffect(() => {
        fetchDraftOrder();
    }, []);

    useEffect(() => {
        handleFilter();
    }, [searchTrackingId, searchOrderName]);

    async function handleDeleteOrderConfirm() {
        try {
            const abortedOrderStatus = 9;
            const response = await deleteOrderById(selectedOrderId, abortedOrderStatus);
            if (response) {
                toast("Delete order successfully");
                fetchDraftOrder();
                setOpen(false);
            } else {
                toast("Unexpected error has been occured");
            }
        } catch (error) {
            console.log(error);
            toast("Unexpected error has been occured");
        }
    }

    return (
        <div className="customer-home-order-list">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>Are you sure about this ?</Typography>
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

            {orders && orders.length > 0 ? (
                <>
                    <SearchBox>
                        <div className="form-group">
                            <input
                                style={{
                                    boxSizing: "border-box"
                                }}
                                placeholder="Tracking ID"
                                type="text"
                                name="text"
                                value={searchTrackingId}
                                onChange={(e) => setSearchTrackingId(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                style={{
                                    boxSizing: "border-box"
                                }}
                                placeholder="Name"
                                type="text"
                                name="text"
                                value={searchOrderName}
                                onChange={(e) => setSearchOrderName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </SearchBox>

                    {filteredOrders && filteredOrders.map && filteredOrders.map((order) => (
                        <>
                            <Box sx={{ ...commonStyles, borderRadius: '16px' }} className="order-box" key={order.id}>
                                <div className="order-main-info">
                                    <div className="order-text-info">
                                        <div>
                                            <OrderInfoHeader>Name</OrderInfoHeader>
                                            <Typography>{order.name}</Typography>
                                        </div>

                                        <div>
                                            <OrderInfoHeader>Created Date</OrderInfoHeader>
                                            <Typography>{dateTimeConvert(order.createdDate)}</Typography>
                                        </div>

                                        <div>
                                            <OrderInfoHeader>Expected Finish Date</OrderInfoHeader>
                                            <Typography>{dateTimeConvert(order.expectedFinishDate)}</Typography>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <OrderInfoHeader>Sender Address</OrderInfoHeader>
                                            <Typography>{order.senderAddress}</Typography>
                                        </div>
                                        <div>
                                            <OrderInfoHeader>Receiver Address</OrderInfoHeader>
                                            <Typography>{order.destinationAddress}</Typography>
                                        </div>
                                    </div>

                                    <div className="order-text-info">
                                        <div>
                                            <OrderInfoHeader>Price</OrderInfoHeader>
                                            <Typography>{Math.floor(order.price).toLocaleString()}</Typography>
                                        </div>
                                        <div>
                                            <OrderInfoHeader>Tracking Id</OrderInfoHeader>
                                            <Typography>{order.trackingId}</Typography>
                                        </div>

                                        <div className="icon-group">
                                            <div className="button-icon" onClick={() => handleOpenEditPage(order)}><EditIcon /></div>
                                            <div className="button-icon" onClick={() => handleDeleteOrder(order.id)}><RestoreFromTrashIcon /></div>
                                            <div className="button-icon" onClick={() => handleClick(order.id)}><MenuOpenIcon /></div>
                                        </div>
                                    </div>
                                </div>

                                {expandedOrderId === order.id && (
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
                                                {order.fishes && order.fishes.map && order.fishes.map((fish) => (
                                                    <TableRow key={fish.id}>
                                                        <TableCell>{fish.id}</TableCell>
                                                        <TableCell>{fish.name}</TableCell>
                                                        <TableCell>{fish.price}</TableCell>
                                                        <TableCell>{fish.size}</TableCell>
                                                        {fish.status === 0 && (
                                                            <TableCell>Unknown</TableCell>
                                                        )}
                                                        {fish.status === 1 && (
                                                            <TableCell>Good</TableCell>
                                                        )}
                                                        {fish.status === 2 && (
                                                            <TableCell>Sick</TableCell>
                                                        )}
                                                        {fish.status === 3 && (
                                                            <TableCell>Dead</TableCell>
                                                        )}
                                                        <TableCell>{fish.weight}</TableCell>
                                                        <TableCell><div className="button-icon"><MoreHorizIcon /></div></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </Box>
                        </>
                    ))}
                </>
            ) : (
                <Typography>No order found</Typography>
            )}
            <ToastUtil />
        </div>
    )
}

export default DraftOrder;