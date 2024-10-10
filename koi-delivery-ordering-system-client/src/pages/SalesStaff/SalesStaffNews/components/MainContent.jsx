import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const MainContent = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
        width: "100%",
      }}
    >
      {/* Image Upload Section */}
      <Box
        sx={{
          width: "40%",
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px dashed #ccc",
          borderRadius: "20px",
          position: "relative",
          backgroundColor: "#f5f5f5",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "20px",
            }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "#777" }}>
            Import Image
          </Typography>
        )}
        <Button
          variant="contained"
          component="label"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: image ? 0 : 1,
          }}
        >
          Select File
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      {/* Text Input Section */}
      <Box
        sx={{
          width: "80%",
          height: "260px",
          borderRadius: "20px",
          border: "2px solid #ccc",
          backgroundColor: "#fff",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          multiline
          fullWidth
          rows={10}
          placeholder="Enter text here..."
          value={text}
          onChange={handleTextChange}
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
