import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { createFishOrderInfo } from "../../../utils/customers/createOrder";
import License from "../utils/License";

const CustomBoxContainer = styled(Box)(() => ({
    display: "flex",
    gap: "40px"
}));

// eslint-disable-next-line react/prop-types
function FishInfo({ orderId, formStepData }) {
    const [fishName, setFishName] = useState("");
    const [fishAge, setFishAge] = useState(0);
    const [fishSize, setFishSize] = useState(0);
    const [fishWeight, setFishWeight] = useState(0);
    const [fishPrice, setFishPrice] = useState(0);
    const [forms, setForms] = useState([]); // Manage multiple forms

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({}); // Manage data for each form

    const handleAddLicenseForm = (e, index) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [index]: { ...formData[index], [name]: value } };
        setFormData(newFormData); // Update the state for each form's data
    };

    const handleSubmitCheck = (index) => {
        console.log(`Form ${index + 1} Data:`, formData[index]);
    };

    const addNewForm = () => {
        setForms([...forms, forms.length]); // Add a new form based on its index
    };

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

    function handleContinue() {
        formStepData(2);
    }

    async function handleSubmit() {
        const data = await createFishOrderInfo(
            fishName,
            fishAge,
            fishSize,
            fishWeight,
            fishPrice,
            file,
            orderId
        );
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
        <div>
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
                                onChange={e => handleNameChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Age"
                                type="number"
                                name="age"
                                className="form-input"
                                onChange={e => handleAgeChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Size"
                                type="number"
                                name="size"
                                className="form-input"
                                onChange={e => handleSizeChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Weight"
                                type="number"
                                name="weight"
                                className="form-input"
                                onChange={e => handleWeightChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Price"
                                type="number"
                                name="price"
                                className="form-input"
                                onChange={e => handlePriceChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                name="file"
                                className="form-input"
                                onChange={e => handleFileChange(e)}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="form-button" onClick={() => handleSubmit()}>
                                Submit
                            </button>
                            <button className="form-button" onClick={() => addNewForm()}>
                                Add License
                            </button>
                            <button className="form-button" onClick={() => handleContinue()}>
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "40vw" }} />}
                </div>
            </CustomBoxContainer>

            {forms.map((form, index) => (
                <License
                    key={index}
                    handleChange={(e) => handleAddLicenseForm(e, index)} // Pass the index to track the form
                    handleSubmit={() => handleSubmitCheck(index)} // Handle submit for the respective form
                />
            ))}
        </div>

    )
}

export default FishInfo;