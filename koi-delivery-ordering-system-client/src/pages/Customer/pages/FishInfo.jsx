import { Box } from "@mui/material";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function FishInfo({ formStep, orderId }) {
    const [orderName, setOrderName] = useState("");
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }, [file]);

    function handleNameChange(e) {
        setOrderName(e.target.value);
    }

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
                            onChange={e => handleNameChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name: </label>
                        <input
                            type="file"
                            name="file"
                            className="form-input"
                            onChange={e => handleFileChange(e)}
                        />
                    </div>

                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    <button className="form-button" onClick={() => formStep(3)}>
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default FishInfo;