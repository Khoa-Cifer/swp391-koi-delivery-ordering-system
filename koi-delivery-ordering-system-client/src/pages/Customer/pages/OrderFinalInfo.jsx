import { Box, Grid, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import ToastUtil from "../../../components/toastContainer";
import { Fragment, useEffect, useState } from "react";
import { getOrderById } from "../../../utils/customers/getOrder";
import dateTimeConvert from "../../../components/utils";
import { getFishesByOrderId } from "../../../utils/customers/getFish";
import TextArea from "antd/es/input/TextArea";

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '100%',
    height: '15rem',
};

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ orderId }) {
    const [postedData, setPostedData] = useState();
    const [fishOrderData, setFishOrderData] = useState([]);

    useEffect(async () => {
        const postedOrder = await getOrderById(orderId);
        setPostedData(postedOrder);
        console.log(postedOrder);
    }, [])

    return (
        <Box>
            <ToastUtil />
            {postedData && (
                <div>
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
                    {fishOrderData && fishOrderData.length > 0 && fishOrderData.map && fishOrderData.map((fish, index) => (
                        <Box key={index}>
                            <Typography></Typography>
                        </Box>
                    ))}
                </div>

            )}
        </Box>
    )
}

export default OrderFinalInfo;