import { Box, Grid, TextField, Typography } from "@mui/material";
import ToastUtil from "../../../components/toastContainer";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../utils/customers/getOrder";
import dateTimeConvert from "../../../components/utils";
import { getFishesByOrderId } from "../../../utils/customers/getFish";

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ orderId }) {
    const [postedData, setPostedData] = useState();
    const [fishOrderData, setFishOrderData] = useState([]);

    useEffect(async () => {
        const postedOrder = await getOrderById(orderId);
        setPostedData(postedOrder);
        // const fishOrder = await getFishesByOrderId(orderId);
        // setFishOrderData(fishOrder);
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
                                label="First Name"
                                value={dateTimeConvert(postedData.createdDate)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={postedData.destinationAddress}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={postedData.senderAddress}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={dateTimeConvert(postedData.expectedFinishDate)}
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