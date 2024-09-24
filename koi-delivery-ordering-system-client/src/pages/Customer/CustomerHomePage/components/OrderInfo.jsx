import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
function OrderInfo({ formStep }) {
    return (
        <Box>
            <div className="form-container">
                <div className="form">
                    <div className="form-group">
                        <label className="form-label">Name: </label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description: </label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Receiver Address: </label>
                        <input
                            type="text"
                            name="text"
                            className="form-input"
                        />
                    </div>
                    <button onClick={() => formStep(3)} className="form-button">
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default OrderInfo;