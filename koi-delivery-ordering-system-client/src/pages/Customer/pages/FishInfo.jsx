import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { createFishOrderInfo, createLicenseOrderInfo } from "../../../utils/customers/createOrder";
import License from "../utils/License";
import { toast } from "react-toastify";
import ToastUtil from "../../../components/toastContainer";

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
    const [licenseForms, setLicenseForms] = useState([]); // Manage multiple forms

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);

    const [licenseFormData, setLicenseFormData] = useState({}); // Manage data for each form

    const [submittedLicense, setSubmittedLicense] = useState();

    const handleAddLicenseForm = (e, index) => {
        const { name, value, files } = e.target;
        let newFormData;
        
        if (files) {
            // If there are files (indicating it's a file input), store the file(s) instead of the value
            newFormData = { ...licenseFormData, [index]: { ...licenseFormData[index], [name]: files[0] } }; // store first file only
        } else {
            // Handle regular input fields
            newFormData = { ...licenseFormData, [index]: { ...licenseFormData[index], [name]: value } };
        }
    
        setLicenseFormData(newFormData);
    };

    const handleLicenseSubmit = () => {
        setSubmittedLicense(licenseFormData);
    };

    const handleLicenseDateChange = (e, index) => {
        const newFormData = { ...licenseFormData, [index]: { ...licenseFormData[index], 'date': e } };
        setLicenseFormData(newFormData);
    }

    const addNewForm = () => {
        setLicenseForms([...licenseForms, licenseForms.length]); // Add a new form based on its index
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
        const fishData = await createFishOrderInfo(
            fishName,
            fishAge,
            fishSize,
            fishWeight,
            fishPrice,
            file,
            orderId
        );
        const submittedLicenseArray = Object.values(submittedLicense);

        let licenseData;
        if (fishData !== 0) {
            for (var i = 0; i < submittedLicenseArray.length; i++) {
                licenseData = await createLicenseOrderInfo(
                    submittedLicenseArray[i].name,
                    submittedLicenseArray[i].description,
                    submittedLicenseArray[i].file,
                    new Date(submittedLicenseArray[i].date).toISOString(),
                    fishData
                )
            }
        }
        if (licenseData) {
            toast("Add Fish to the order successfully");
        } else {
            toast("Unexpected error has been occurred");
        }
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

            {licenseForms.map((form, index) => (
                <License
                    key={index}
                    handleLicenseChange={(e) => handleAddLicenseForm(e, index)} // Pass the index to track the form
                    handleLicenseSubmit={() => handleLicenseSubmit(index)} // Handle submit for the respective form
                    dateChange={(e) => handleLicenseDateChange(e, index)}
                />
            ))}
        </div>

    )
}

export default FishInfo;