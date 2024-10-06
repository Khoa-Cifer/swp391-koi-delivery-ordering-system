import { Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../../utils/axios/order";
import dateTimeConvert from "../../../../components/utils";
import { postOrder } from "../../../../utils/axios/order";
import { toast } from "react-toastify";
import { getFileByFileId } from "../../../../utils/axios/file";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logPaymentHistory, paymentOpenGateway } from "../../../../utils/axios/payment";
import ToastUtil from "../../../../components/toastContainer";

const SubmitButton = styled(Button)(() => ({
    padding: "10px 80px"
}))

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ orderId }) {
    const [postedData, setPostedData] = useState();
    const [fishOrderData, setFishOrderData] = useState([]);
    const [fishFiles, setFishFiles] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const customerInfo = jwtDecode(token);
    const customerId = customerInfo.sub.substring(2);

    useEffect(() => {
        async function fetchData() {
            const postedOrder = await getOrderById(orderId);
            setPostedData(postedOrder);
            setFishOrderData(postedOrder.fishes);

            const fileIds = postedOrder.fishes.map(fish => fish.file.id);
            if (fileIds && fileIds.length > 0) {
                const fishFilesPromises = fileIds.map(async fileId => {
                    const response = await getFileByFileId(fileId);
                    return URL.createObjectURL(response); // Create Object URL from response blob
                });

                const fishFilesArray = await Promise.all(fishFilesPromises);
                setFishFiles(fishFilesArray);
            }
        }

        fetchData();
    }, []);

    async function handlePostOrder() {
        const paymentOpen = await paymentOpenGateway(customerId, Math.floor(postedData.price), "NCB");
        if (paymentOpen) {
            let paymentWindow = window.open(paymentOpen.paymentUrl, "_blank");

            // Check every 500ms if the window is closed
            let checkWindowClosed = setInterval(async function () {
                if (paymentWindow.closed) {
                    clearInterval(checkWindowClosed);
                    console.log("Payment window closed. Proceeding...");

                    const paymentResponse = await logPaymentHistory(customerId, orderId, Math.floor(postedData.price));
                    if (paymentResponse) {
                        const response = await postOrder(orderId);
                        if (response) {
                            toast("Order posted successfully");
                        } else {
                            toast("Unexpected error has been occurred");
                        }
                    } else {
                        toast("Unexpected error has been occurred");
                    }
                }
            }, 500);
        }
    }

    return (
        <Box>
            <ToastUtil />
            {postedData && (
                <Box
                    sx={{
                        border: '1px solid #C3F4FD',
                        padding: '16px',
                        borderRadius: '8px',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Create Date"
                                value={dateTimeConvert(postedData.createdDate)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Expect Finish Date"
                                value={dateTimeConvert(postedData.expectedFinishDate)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Sender Address"
                                value={postedData.senderAddress}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Receive Address"
                                value={postedData.destinationAddress}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Order Name"
                                value={postedData.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tracking Id"
                                value={postedData.trackingId}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tracking Id"
                                value={postedData.description}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tracking Id"
                                value={`${Math.floor(postedData.price)} VND`}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <div style={{ marginTop: "20px" }}></div>
                    {/* Display fish details and images */}
                    <Grid container spacing={2}>
                        {fishOrderData && fishOrderData.length > 0 && fishOrderData.map((fish, index) => (
                            <Grid container item xs={12} sm={6} key={index} spacing={2}>
                                {/* Fish details */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">Fish {index + 1}</Typography>
                                    <Typography>Name: {fish.name}</Typography>
                                </Grid>

                                {/* Fish image */}
                                <Grid item xs={12}>
                                    {fishFiles[index] && (
                                        <img src={fishFiles[index]} alt={`Fish ${index + 1}`} width="100%" style={{ maxWidth: "200px", height: "200px" }} />
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: "30px"
                        }}>
                        <SubmitButton variant="contained" onClick={handlePostOrder}>Post as Order</SubmitButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default OrderFinalInfo;
