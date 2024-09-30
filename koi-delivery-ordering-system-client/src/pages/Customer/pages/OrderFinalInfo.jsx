import { Box } from "@mui/material";
import ToastUtil from "../../../components/toastContainer";

// eslint-disable-next-line react/prop-types
function OrderInfo({ orderId, formStepData }) {
    return (
        <Box>
            <ToastUtil />
            <div className="form-container">
                <div className="form">
                    Test
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;