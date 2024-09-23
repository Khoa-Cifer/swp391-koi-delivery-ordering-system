import { Box } from "@mui/material";

function OrderInfo() {
    return (
        <Box>
            <div className="form-container">
                <form className="form">
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
                    <button type="submit" className="form-button">
                        Submit
                    </button>
                </form>
            </div>
        </Box>
    )
}

export default OrderInfo;