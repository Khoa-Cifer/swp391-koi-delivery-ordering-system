import { Box, Grid, TextField } from "@mui/material";
import ToastUtil from "../../../components/toastContainer";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../utils/customers/getOrder";
import dateTimeConvert from "../../../components/utils";

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ orderId }) {
    const [postedData, setPostedData] = useState();

    useEffect(async () => {
        const postedOrder = await getOrderById(orderId);
        console.log(postedOrder);
        setPostedData(postedOrder);
    }, [])

    return (
        <Box>
            <ToastUtil />
            {postedData && (
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
            )}
        </Box>
    )
}

export default OrderFinalInfo;