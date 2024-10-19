import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import License from "../utils/License";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import { createFishOrderInfo } from "../../../../utils/axios/fish";
import {
  createLicenseFiles,
  createLicenseOrderInfo,
} from "../../../../utils/axios/license";
import { calculateOrderPrice } from "../../../../utils/axios/order";
import { Navigate } from "react-router-dom";

const CustomBoxContainer = styled(Box)(() => ({
  display: "flex",
  gap: "40px",
}));

function FishInfo({ order }) {
  
  // State for managing fish entries
  const [fishEntries, setFishEntries] = useState([
    { name: "", age: "", size: "", weight: "", price: "", file: null },
  ]);
  const [licenseForms, setLicenseForms] = useState([]);
  const [submittedLicense, setSubmittedLicense] = useState({});
  const [totalAddedFishes, setTotalAddedFishes] = useState(0);

  const handleLicenseChange = (e, index) => {
    const { name, value, files } = e.target;
    let newFormData;

    if (files) {
      newFormData = {
        ...submittedLicense,
        [index]: { ...submittedLicense[index], [name]: files[0] },
      };
    } else {
      newFormData = {
        ...submittedLicense,
        [index]: { ...submittedLicense[index], [name]: value },
      };
    }

    setSubmittedLicense(newFormData);
  };

  const handleLicenseDateChange = (e, index) => {
    const newFormData = {
      ...submittedLicense,
      [index]: { ...submittedLicense[index], date: e },
    };
    setSubmittedLicense(newFormData);
  };

  const addNewLicenseForm = () => {
    setLicenseForms([...licenseForms, licenseForms.length]);
  };

  const addNewFishEntry = () => {
    setFishEntries([
      ...fishEntries,
      { name: "", age: "", size: "", weight: "", price: "", file: null },
    ]);
  };

  const handleFishChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedFishEntries = [...fishEntries];

    if (files) {
      updatedFishEntries[index].file = files[0]; // store first file only
    } else {
      updatedFishEntries[index][name] = value;
    }

    setFishEntries(updatedFishEntries);
  };

  const handleLicenseClose = (e, index) => {
    const filteredLicenseForms = [
      ...licenseForms.slice(0, index),
      ...licenseForms.slice(index + 1),
    ];
    setLicenseForms(filteredLicenseForms);
    setSubmittedLicense((prevData) => {
      const newData = { ...prevData };
      delete newData[index];
      return newData;
    });
  };





  async function handleSubmit() {
    const fishDataList = [];
   
    Navigate(`/order-fish-payment/${order.id}`, {
      state: {
        fishEntries,
        submittedLicense,
        orderId: order.id
      }
    });
    
    for (const fish of fishEntries) {
      const fishData = await createFishOrderInfo(
        fish.name,
        fish.age,
        fish.size,
        fish.weight,
        fish.price,
        fish.file,
        order.id
      );
      fishDataList.push(fishData);
    }

    const submittedLicenseArray = Object.values(submittedLicense);

    if (fishDataList.length > 0) {
      let licenseData;

      if (submittedLicenseArray.length > 0) {
        for (let i = 0; i < submittedLicenseArray.length; i++) {
          licenseData = await createLicenseOrderInfo(
            submittedLicenseArray[i].name,
            submittedLicenseArray[i].description,
            new Date(submittedLicenseArray[i].date).toISOString(),
            fishDataList[i] // Link license to the respective fish order
          );
          const fileList = Object.keys(submittedLicenseArray[i])
            .filter((key) => key.startsWith("file-"))
            .map((key) => submittedLicenseArray[i][key]);
          try {
            await createLicenseFiles(licenseData, fileList);
          } catch (error) {
            console.log(error);
            toast("Unexpected error has occurred");
          }
        }
        if (licenseData) {
          toast("Added Fish and its License to the order successfully");
        } else {
          toast("Unexpected error has occurred");
        }
      } else {
        toast("Added Fish to the order successfully");
      }

      setSubmittedLicense({});
      setFishEntries([
        { name: "", age: "", size: "", weight: "", price: "", file: null },
      ]); // Reset to one empty fish entry
      setLicenseForms([]);
      setTotalAddedFishes(totalAddedFishes + fishDataList.length);
      await calculateOrderPrice(order.id);
    } else {
      toast("Unexpected error has occurred");
    }

    

  }

  return (
    <div>
      <ToastUtil />
      <CustomBoxContainer>
        <div className="form-container">
          <h1>Fish Information</h1>
          {fishEntries.map((fish, index) => (
            <div key={index} className="form">
              <div className="form-group">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={fish.name}
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  className="form-input"
                  value={fish.age}
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Size"
                  type="number"
                  name="size"
                  className="form-input"
                  value={fish.size}
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Weight"
                  type="number"
                  name="weight"
                  className="form-input"
                  value={fish.weight}
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Price"
                  type="number"
                  name="price"
                  className="form-input"
                  value={fish.price}
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="file"
                  className="form-input"
                  onChange={(e) => handleFishChange(index, e)}
                />
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="form-button" onClick={() => addNewFishEntry()}>
              Add Another Fish
            </button>

            <button className="form-button" onClick={addNewLicenseForm}>
              Add License
            </button>

            <button className="form-button" onClick={() => handleSubmit()}>
              Submit
            </button>
          </div>
        </div>
      </CustomBoxContainer>

      {licenseForms.map((index) => (
        <License
          key={index}
          handleLicenseChange={(e) => handleLicenseChange(e, index)} // Pass the index to track the form
          dateChange={(e) => handleLicenseDateChange(e, index)}
          handleLicenseFormClose={(e) => handleLicenseClose(e, index)}
          index={index} // Pass the index to License component
        />
      ))}
    </div>
  );
}

export default FishInfo;
