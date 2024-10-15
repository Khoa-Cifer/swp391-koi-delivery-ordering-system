import { Link, useLocation } from "react-router-dom";
import "./MainContent.scss";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { getFileByFileId } from "../../../../utils/axios/file";
import ImageSlider from "../../../../components/ImageSlider";

import { Box, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import dateTimeConvert from "../../../../components/utils";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const MainContent = () => {
  const location = useLocation();
  const { state } = location;
  const [imagePreviews, setImagePreviews] = useState([]);
  const [licenseImage, setLicenseImage] = useState([]);
  const [fish, setFish] = useState();
  const [selectedFishLicenses, setSelectedFishLicenses] = useState([]);
  const [open, setOpen] = useState(false);

  function handleSlider(e) {
    setFish(e);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  async function handleLicenseImages(license) {
    handleOpen();
    console.log(license.files)
    if (Array.isArray(license.files) && license.files.length > 0) {
      const imagePromises = license.files.map(async (file) => {
        const fileId = file.file.id;
        const imageResponse = await getFileByFileId(fileId);
        return URL.createObjectURL(new Blob([imageResponse], { type: "image/jpeg" }));
      });

      // Wait for all promises to resolve (i.e., all image URLs to be fetched)
      const imageUrls = await Promise.all(imagePromises);
      setLicenseImage(imageUrls);
    }
  }

  useEffect(() => {
    async function fetchFishImages() {
      try {
        // Ensure state.fishes is an array and has content before proceeding
        if (Array.isArray(state.fishes) && state.fishes.length > 0) {
          const imagePromises = state.fishes.map(async (fish) => {
            const fileId = fish.file.id;
            const imageResponse = await getFileByFileId(fileId);
            return URL.createObjectURL(new Blob([imageResponse], { type: "image/jpeg" }));
          });

          // Wait for all promises to resolve (i.e., all image URLs to be fetched)
          const imageUrls = await Promise.all(imagePromises);
          setImagePreviews(imageUrls); // Set the image preview to an array of URLs
        }
      } catch (error) {
        console.error("Error fetching fish images:", error);
      }
    }

    fetchFishImages();
  }, [state.fishes]);

  useEffect(() => {
    if (fish) {
      console.log(fish.licenses);
      if (fish.licenses && fish.licenses.length > 0) {
        if (Array.isArray(fish.licenses) && fish.licenses.length > 0) {
          setSelectedFishLicenses(fish.licenses);
          console.log(fish.licenses);
        }
      } else {
        setSelectedFishLicenses([]);
      }
    }

  }, [fish]);

  const cardStyle = {
    width: 300,
  };

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return state && (
    <div className="main-content-license-sale">
      <div className="slider-container">
        <ImageSlider fishInfo={state.fishes} images={imagePreviews} onImageChange={e => handleSlider(e)} />
      </div>

      <Box sx={{ maxWidth: 180, marginTop: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Link className="link" to={`/delivery-order-home`}>Go back</Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <div className="slider-container">
            <ImageSlider fishInfo={null} images={licenseImage} onImageChange={e => handleSlider(e)} />
          </div>
        </Box>
      </Modal>

      <div className="card-container">
        {selectedFishLicenses && selectedFishLicenses.map && selectedFishLicenses.map((license, index) => {
          if (index >= 3) return null;
          return (
            <Card
              key={index}
              hoverable
              style={cardStyle}
              styles={{
                body: {
                  padding: 0,
                  overflow: "hidden",
                },
              }}
            >
              <Flex
                vertical
                align="flex-end"
                justify="space-around"
                style={{
                  padding: 32,
                }}
              >
                <Typography
                  level={5}
                  style={{ width: "100%" }}
                  ellipsis={{ rows: 4 }}
                >
                  {license.name}
                </Typography>
                <Typography.Title
                  level={5}
                  style={{ width: "100%" }}
                  ellipsis={{ rows: 4 }}
                >
                  {license.description}
                </Typography.Title>
                <Button type="primary" onClick={() => handleLicenseImages(license)}>
                  View Image
                </Button>
                <Typography
                  level={5}
                  style={{ width: "100%" }}
                  ellipsis={{ rows: 4 }}
                >
                  Date of issue {dateTimeConvert(license.dateOfIssue)}
                </Typography>
              </Flex>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default MainContent;
