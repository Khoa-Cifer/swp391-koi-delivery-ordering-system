import { Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import ToastUtil from "../../../../components/toastContainer";

const SubmitButton = styled(Button)(() => ({
    padding: "10px 80px"
}))

// eslint-disable-next-line react/prop-types
function OrderFinalInfo({ order }) {
    return (
        <Box>
            <ToastUtil />
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
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Expect Finish Date"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Sender Address"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Receive Address"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Order Name"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Tracking Id"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginTop: "20px" }}></div>

            </Box>
        </Box>
    );
}

export default OrderFinalInfo;
