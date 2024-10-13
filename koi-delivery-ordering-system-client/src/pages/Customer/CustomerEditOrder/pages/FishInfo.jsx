import { Box, styled } from "@mui/material";
import ToastUtil from "../../../../components/toastContainer";

const CustomBoxContainer = styled(Box)(() => ({
    display: "flex",
    gap: "40px"
}));

// eslint-disable-next-line react/prop-types
function FishInfo({ order }) {
    return (
        <div>
            <ToastUtil />
            <CustomBoxContainer>
                <div className="form-container">
                    <h1>Fish Information</h1>
                    <div className="form">
                        <div className="form-group">
                            <input
                                placeholder="Name"
                                type="text"
                                name="name"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Age"
                                type="number"
                                name="age"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Size"
                                type="number"
                                name="size"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Weight"
                                type="number"
                                name="weight"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Price"
                                type="number"
                                name="price"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                name="file"
                                className="form-input"
                            />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="form-button" >
                                Submit
                            </button>
                            <button className="form-button" >
                                Add License
                            </button>
                            <button className="form-button" >
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "40vw" }} />} */}
                </div>
            </CustomBoxContainer>

            {/* {licenseForms.map((index) => (
                <License
                    key={index}
                    handleLicenseChange={(e) => handleAddLicenseForm(e, index)} // Pass the index to track the form
                    dateChange={(e) => handleLicenseDateChange(e, index)}
                    handleLicenseFormClose={(e) => handleLicenseClose(e, index)}
                />
            ))} */}
        </div>

    )
}

export default FishInfo;