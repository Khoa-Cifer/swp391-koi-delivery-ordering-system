import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";
import { usePlacesWidget } from "react-google-autocomplete";
import { CONSTANT_GOOGLE_MAP_API_KEY } from "../../../../utils/constants";
import { createStorage, getAllStorages } from "../../../../utils/admin/storage";

function Storage() {
    const [storageData, setStorageData] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset states if needed
        setName("");
        setAddress("");
        setCoordinates({ lat: null, lng: null });
    };

    useEffect(() => {
        const geocodeAddress = () => {
            if (address.trim() === '') return;

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    setCoordinates({ lat: location.lat(), lng: location.lng() });
                } else {
                    setCoordinates({ lat: null, lng: null });
                }
            });
        };

        if (address.length >= 5) {
            geocodeAddress();
        }
    }, [address]);

    async function fetchStorageData() {
        const fetchedData = await getAllStorages();
        console.log(fetchedData);
        if (fetchedData) { setStorageData(fetchedData) };
    }

    const { ref } = usePlacesWidget({
        apiKey: CONSTANT_GOOGLE_MAP_API_KEY,
        onPlaceSelected: (place) => {
            setAddress(place.formatted_address || "");
        },
    });

    useEffect(() => {
        fetchStorageData();
    }, []);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        zIndex: 1300, // Ensure modal is on top
    };

    async function handleCreateStorage() {
        if (coordinates.lat && coordinates.lng) {
            const data = await createStorage(name, address, coordinates.lat, coordinates.lng);
            if (data) {
                await fetchStorageData();
                toast("Create storage successfully");
            }
        } else {
            toast("Invalid address");
        }
        handleClose();
    }

    return (
        <div>
            <ToastUtil />
            <div className={open ? 'blur' : ''}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                    <Button onClick={handleOpen} variant="contained" style={{ maxWidth: "30%" }}>Create New Storage</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={modalStyle}>
                        <div className="form-group">
                            <input
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box"
                                }}
                                placeholder="Name"
                                type="text"
                                name="text"
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                ref={ref}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box"
                                }}
                                placeholder="Address"
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                name="text"
                                className="form-input"
                                ref={ref}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateStorage}
                            disabled={!address || !name} // Disable if either is empty
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#041967' }}><Typography>Id</Typography></TableCell>
                            <TableCell style={{ color: '#041967' }}><Typography>Name</Typography></TableCell>
                            <TableCell style={{ color: '#041967' }}><Typography>Address</Typography></TableCell>
                            <TableCell style={{ color: '#041967' }}><Typography>Longitude</Typography></TableCell>
                            <TableCell style={{ color: '#041967' }}><Typography>Latitude</Typography></TableCell>
                            <TableCell style={{ color: '#041967' }}><Typography>Order Amount</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storageData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.address}</TableCell>
                                <TableCell>{data.longitude}</TableCell>
                                <TableCell>{data.latitude}</TableCell>
                                <TableCell>{data.orderAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Storage;
