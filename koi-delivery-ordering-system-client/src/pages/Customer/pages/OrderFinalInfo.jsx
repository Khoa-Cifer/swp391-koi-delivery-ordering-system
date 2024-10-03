import { Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import ToastUtil from "../../../components/toastContainer";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../utils/customers/order";
import dateTimeConvert from "../../../components/utils";
import TextArea from "antd/es/input/TextArea";
import { postOrder } from "../../../utils/customers/order";
import { toast } from "react-toastify";
import { getFileByFileId } from "../../../utils/customers/file";

const SubmitButton = styled(Button)(() => ({
    padding: "10px 80px"
}))

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ orderId }) {
    const [postedData, setPostedData] = useState();
    const [fishOrderData, setFishOrderData] = useState([]);
    const [fishFiles, setFishFiles] = useState([]);

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
        const response = await postOrder(orderId);
        if (response) {
            toast("Order posted successfully");
            
        } else {
            toast("Unexpected error has been occurred");
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

                        <Grid item xs={12} sm={12}>
                            <TextArea
                                fullWidth
                                label="Description"
                                value={postedData.description}
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
