import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import CloseIcon from '@mui/icons-material/Close';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './license.scss'

const LicenseCustomBoxContainer = styled(Box)(() => ({
    display: "flex",
    gap: "40px",
    marginTop: "40px",
    marginBottom: "40px"
}));

// eslint-disable-next-line react/prop-types
const License = ({ handleLicenseChange, dateChange, handleLicenseFormClose }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [file, setFile] = useState();
    const [date, setDate] = useState(null);

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

    const handleFileChange = (e) => {
        handleLicenseChange(e);
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleDateChange = (e) => {
        setDate(e);
        dateChange(e);
    }

    return (
        <LicenseCustomBoxContainer>
            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>License Information</h3>
                    <div className="license-close-btn" onClick={handleLicenseFormClose}> <CloseIcon /></div>

                </div>
                <div className="form">
                    <div className="form-group">
                        <input
                            placeholder="Name"
                            type="text"
                            name="name"
                            className="form-input"
                            onChange={handleLicenseChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Description"
                            type="text"
                            name="description"
                            className="form-input"
                            onChange={handleLicenseChange}
                        />
                    </div>
                    <Calendar onChange={e => handleDateChange(e)} date={date} />

                    <div className="form-group">
                        <input
                            type="file"
                            name="file"
                            className="form-input"
                            onChange={e => handleFileChange(e)}
                        />
                    </div>
                </div>
            </div>
            <div>
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "40vw" }} />}
            </div>
        </LicenseCustomBoxContainer>
    );
};

export default License;