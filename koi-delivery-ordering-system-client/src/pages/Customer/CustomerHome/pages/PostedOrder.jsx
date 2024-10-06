import { Box, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrdersByStatus } from "../../../../utils/axios/order";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import dateTimeConvert from "../../../../components/utils";

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

function PostedOrder() {
    const [orders, setOrders] = useState();

    useEffect(() => {
        const postedOrderStatus = 1;
        async function fetchPostedOrder() {
            const response = await getOrdersByStatus(postedOrderStatus);
            if (response) {
                setOrders(response);
            } else {
                toast("Unexpected error has been occurred");
            }
        }

        fetchPostedOrder();
    }, []);

    console.log(orders);

    return (
        <div className="customer-home-order-list">
            <ToastUtil />
            {orders && orders.map && orders.map((order, index) => (
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
                        </div>
                    </div>
                </Box>

            ))}
        </div>
    )
}

export default PostedOrder;