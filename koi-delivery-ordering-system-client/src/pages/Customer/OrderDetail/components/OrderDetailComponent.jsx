/* eslint-disable react/prop-types */
import { Box, styled, TextField } from "@mui/material";

const OrderCard = styled(Box)(() => ({
    backgroundColor: "#C3F4FD",
    borderRadius: "20px",
    width: "40%",
    padding: "40px 20px",
    border: "1px solid #0264F8"
}));

const OrderInfoField = styled(TextField)(() => ({
    backgroundColor: "white",
}))

function OrderDetailComponent({ orders }) {
    return orders && (
        <>
            {orders.map && orders.map((index, order) => (
                <Box key={index}>
                    <OrderCard>
                        <div className="form-group">
                            <OrderInfoField
                                fullWidth
                                type=""
                                label="Created Date"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                style={{ backgroundColor: "white", borderRadius: "20px" }}
                                placeholder="Description"
                                type="text"
                                name="text"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                style={{ backgroundColor: "white", borderRadius: "20px" }}
                                placeholder="Sender Address"
                                type="text"
                                name="text"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                style={{ backgroundColor: "white", borderRadius: "20px" }}
                                placeholder="Description"
                                type="text"
                                name="text"
                                className="form-input"
                            />
                        </div>
                    </OrderCard>
                </Box>
            ))}
        </>
    )
}

export default OrderDetailComponent;