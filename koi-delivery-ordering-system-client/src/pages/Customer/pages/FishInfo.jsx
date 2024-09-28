import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { createFishOrderInfo } from "../../../utils/customers/createOrder";

// eslint-disable-next-line react/prop-types
function FishInfo({ formStep, orderId }) {
    const [fishName, setFishName] = useState("");
    const [fishAge, setFishAge] = useState(0);
    const [fishSize, setFishSize] = useState(0);
    const [fishWeight, setFishWeight] = useState(0);
    const [fishPrice, setFishPrice] = useState(0);

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
        setFishName(e.target.value);
    }

    async function handleSubmit() {
        formStep(3);
        const data = await createFishOrderInfo(
            fishName,
            fishAge,
            fishSize,
            fishWeight,
            fishPrice,
            file,
            orderId
        );
        console.log(data);
    }

    function handleAgeChange(e) {
        setFishAge(e.target.value);
    }

    function handleSizeChange(e) {
        setFishSize(e.target.value);
    }

    function handleWeightChange(e) {
        setFishWeight(e.target.value);
    }

    function handlePriceChange(e) {
        setFishPrice(e.target.value);
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
                        <label className="form-label">Age: </label>
                        <input
                            type="number"
                            name="age"
                            className="form-input"
                            onChange={e => handleAgeChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Size: </label>
                        <input
                            type="number"
                            name="size"
                            className="form-input"
                            onChange={e => handleSizeChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Weight: </label>
                        <input
                            type="number"
                            name="weight"
                            className="form-input"
                            onChange={e => handleWeightChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price: </label>
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            onChange={e => handlePriceChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Attach Image: </label>
                        <input
                            type="file"
                            name="file"
                            className="form-input"
                            onChange={e => handleFileChange(e)}
                        />
                    </div>
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    <button className="form-button" onClick={() => handleSubmit()}>
                        Submit
                    </button>
                </div>
            </div>
        </Box>
    )
}

export default FishInfo;