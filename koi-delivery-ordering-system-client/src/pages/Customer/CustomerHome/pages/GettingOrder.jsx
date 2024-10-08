import { Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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

function GettingOrder() {
    const [orders, setOrders] = useState();
    const [expandedOrderId, setExpandedOrderId] = useState(null); // To track expanded orders

    const handleClick = (orderId) => {
        // Toggle the visibility of the order table by setting the orderId
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    useEffect(() => {
        const gettingOrderStatus = 3;
        async function fetchGettingOrder() {
            const response = await getOrdersByStatus(gettingOrderStatus);
            if (response) {
                setOrders(response);
            }
        }

        fetchGettingOrder();
    }, []);

    return (
        <div className="customer-home-order-list">
            {orders && orders.map && orders.map((order) => (
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
                                    <Typography>{Math.floor(order.price)}</Typography>
                                </div>
                                <div>
                                    <OrderInfoHeader>Tracking Id</OrderInfoHeader>
                                    <Typography>{order.trackingId}</Typography>
                                </div>

                                <div className="icon-group">
                                    <div className="button-icon"><EditIcon /></div>
                                    <div className="button-icon"><RestoreFromTrashIcon /></div>
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
        </div>
    )
}

export default GettingOrder;