import { Box, styled } from "@mui/material";
import ToastUtil from "../../../../components/toastContainer";
import { useEffect, useState } from "react";
import { getFileByFileId } from "../../../../utils/axios/file";
import { updateFishById } from "../../../../utils/axios/fish";
import License from "./License";

const CustomBoxContainer = styled(Box)(() => ({
    display: "flex",
    gap: "40px"
}));

// eslint-disable-next-line react/prop-types
function Fish({ fish }) {
    const [fishName, setFishName] = useState(fish.name);
    const [fishAge, setFishAge] = useState(fish.age);
    const [fishSize, setFishSize] = useState(fish.size);
    const [fishWeight, setFishWeight] = useState(fish.weight);
    const [fishPrice, setFishPrice] = useState(fish.price);
    const [licenseForms, setLicenseForms] = useState([]); // Manage multiple forms

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);

    const [submittedLicense, setSubmittedLicense] = useState({});

    useEffect(() => {
        async function fetchData() {
            const fileId = fish.file.id;
            if (fileId) {
                try {
                    const response = await getFileByFileId(fileId); // Assuming this returns a Blob or file
                    setFile(response); // Set the file URL in state
                } catch (error) {
                    console.error('Error fetching file:', error);
                }
            }
        }
        fetchData();

        function addDefaultForm() {
            // eslint-disable-next-line react/prop-types
            if (fish.licenses && fish.licenses.length > 0) {
                const updatedLicenseForms = [...licenseForms]; // Make a copy of the current state

                // eslint-disable-next-line react/prop-types
                fish.licenses.forEach(() => {
                    updatedLicenseForms.push(updatedLicenseForms.length); // Add to the array
                });

                setLicenseForms(updatedLicenseForms);
            }
        }

        addDefaultForm();
    }, []);

    useEffect(() => {
        if (!file) {
            console.error("The provided file is not a valid Blob or File.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }, [file]);

    const handleAddLicenseForm = (e, index) => {
        const { name, value, files } = e.target;
        let newFormData;

        if (files) {
            // If there are files (indicating it's a file input), store the file(s) instead of the value
            newFormData = { ...submittedLicense, [index]: { ...submittedLicense[index], [name]: files[0] } }; // store first file only
        } else {
            // Handle regular input fields
            newFormData = { ...submittedLicense, [index]: { ...submittedLicense[index], [name]: value } };
        }

        setSubmittedLicense(newFormData);
    };

    const handleLicenseDateChange = (e, index) => {
        const newFormData = { ...submittedLicense, [index]: { ...submittedLicense[index], 'date': e } };
        setSubmittedLicense(newFormData);
    }

    const addNewForm = () => {
        console.log("function called");
        setLicenseForms([...licenseForms, licenseForms.length]); // Add a new form based on its index
    };

    const handleFishFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    function handleNameChange(e) {
        setFishName(e.target.value);
    }

    const handleLicenseClose = (e, index) => {
        const filteredLicenseForms = [...licenseForms.slice(0, index), ...licenseForms.slice(index + 1)];
        setLicenseForms(filteredLicenseForms);
        setSubmittedLicense((prevData) => {
            const newData = { ...prevData }; // Create a shallow copy of the previous state
            delete newData[index]; // Remove the specified index
            return newData; // Return the updated object
        });
    }


    async function handleConfirm() {
        const fishData = await updateFishById(
            fish.id,
            fishName,
            fishAge,
            fishSize,
            fishWeight,
            fishPrice,
            file,
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
                                value={fishName}
                                onChange={e => handleNameChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Age"
                                type="number"
                                name="age"
                                className="form-input"
                                value={fishAge}
                                onChange={e => handleAgeChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Size"
                                type="number"
                                name="size"
                                className="form-input"
                                value={fishSize}
                                onChange={e => handleSizeChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Weight"
                                type="number"
                                name="weight"
                                className="form-input"
                                value={fishWeight}
                                onChange={e => handleWeightChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Price"
                                type="number"
                                name="price"
                                className="form-input"
                                value={fishPrice}
                                onChange={e => handlePriceChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                name="file"
                                className="form-input"
                                onChange={e => handleFishFileChange(e)}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="form-button" onClick={() => handleConfirm()}>
                                Confirm
                            </button>
                            <button className="form-button" onClick={() => addNewForm()}>
                                Add License
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "40vw" }} />}
                </div>
            </CustomBoxContainer>

            {licenseForms.map((index) => (
                <License
                    key={index}
                    // eslint-disable-next-line react/prop-types
                    licenseData={fish.licenses && (index < fish.licenses.length ? fish.licenses[index] : null)}
                    handleLicenseChange={(e) => handleAddLicenseForm(e, index)} // Pass the index to track the form
                    dateChange={(e) => handleLicenseDateChange(e, index)}
                    handleLicenseFormClose={(e) => handleLicenseClose(e, index)}
                />
            ))}
        </div>

    )
}

export default Fish;