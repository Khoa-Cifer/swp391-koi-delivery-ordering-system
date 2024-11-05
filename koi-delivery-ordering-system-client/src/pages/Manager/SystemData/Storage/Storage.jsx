import { useCallback, useEffect, useState } from "react";
import { Table, Modal, Button, Input, Typography } from "antd";
import { usePlacesWidget } from "react-google-autocomplete";
import { createStorage, getAllStorages } from "../../../../utils/axios/storage";
import { GoogleMap } from "@react-google-maps/api";
import "react-toastify/dist/ReactToastify.css";
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";

const { Title } = Typography;

function Storage() {
  const centerDefault = {
    lat: 10.75,
    lng: 106.6667,
  };

  const [center, setCenter] = useState(centerDefault);
  const [storageData, setStorageData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);

  const fetchStorageData = async () => {
    const fetchedData = await getAllStorages();
    if (fetchedData) {
      setStorageData(fetchedData);
    }
  };

  useEffect(() => {
    fetchStorageData();
  }, []);

  const onMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setCenter({ lat, lng });
    setCoordinates({ lat, lng });

    // Initialize the Geocoder
    const geocoder = new window.google.maps.Geocoder();

    // Reverse Geocode to get the address
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        if (results[0].formatted_address.includes("+")) {
          console.log("Invalid token");
        } else {
          setAddress(results[0].formatted_address);
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, []);

  const handleCreateStorage = async () => {
    if (coordinates.lat && coordinates.lng) {
      const data = await createStorage(
        name,
        address,
        coordinates.lat,
        coordinates.lng
      );
      if (data) {
        await fetchStorageData();
        toast("Create Storage successfully");
      }
    } else {
      toast("Unexpected error has been occurred");
    }
    handleClose();
  };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    // Reset states if needed
    setName("");
    setAddress("");
    setCoordinates({ lat: null, lng: null });
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { ref: storageAddress } = usePlacesWidget({
    onPlaceSelected: (place) => {
      setAddress(place.formatted_address);
    },
  });

  return (
    <div>
      <ToastUtil />
      <div className="dashboard-info">
        <Title level={2} style={{ marginTop: 0, color:"#01428E"}}>
          Storage
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={handleOpen}>
          Create New Storage
        </Button>
      </div>

      <Table
        dataSource={storageData}
        rowKey="id"
        pagination={{ pageSize: 15 }} // Adjust as needed
      >
        <Table.Column title="Id" dataIndex="id" key="id" />
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Address" dataIndex="address" key="address" />
        <Table.Column title="Longitude" dataIndex="longitude" key="longitude" />
        <Table.Column title="Latitude" dataIndex="latitude" key="latitude" />
        <Table.Column
          title="Order Amount"
          dataIndex="orderAmount"
          key="orderAmount"
        />
      </Table>

      <Modal
        title="Create New Storage"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreateStorage}
            disabled={!address || !name} // Disable if either is empty
          >
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Address"
          value={address}
          readOnly
          style={{ marginBottom: "10px" }}
        />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
        />
      </Modal>
    </div>
  );
}

export default Storage;
