import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
function FishInfo({ formStep }) {
    return (
        <Box>
            <div className="form-container">
                <h1>Fish Information</h1>
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
                    <button className="form-button" onClick={() => formStep(3)}>
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default FishInfo;