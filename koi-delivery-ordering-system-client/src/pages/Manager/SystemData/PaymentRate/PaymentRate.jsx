import { useEffect, useState } from "react";
import { getAllPaymentRateService, updateRateById } from "../../../../utils/axios/rate";
import { Box, Button, IconButton, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";

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
};

function PaymentRate() {
    const [paymentServiceData, setPaymentServiceData] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [serviceRate, setServiceRate] = useState();
    const [currentId, setCurrentId] = useState();

    const handleClick = (event, id, rate) => {
        setAnchorEl(event.currentTarget);
        setCurrentId(id);
        setServiceRate(rate); // Set the rate for the selected item
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        handleCloseMenu();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    async function fetchPaymentRateService() {
        const fetchedData = await getAllPaymentRateService();
        if (fetchedData) {
            setPaymentServiceData(fetchedData);
        }
    }

    async function handleUpdateData() {
        const response = await updateRateById(currentId, serviceRate);
        if (response) {
            setOpenModal(false);
            toast("Update successfully");
            fetchPaymentRateService();
        } else {
            toast("Unexpected error has been occurred");
        }
    }

    const handleServiceRate = (e) => {
        setServiceRate(e.target.value);
    }

    useEffect(() => {
        fetchPaymentRateService();
    }, [])

    return (
        <div>
            <div className="dashboard-info">
                <h2 style={{ marginTop: "0" }}>Payment Rate Board</h2>
            </div>
            <ToastUtil />
            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Id</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Description</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Rate</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Action</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentServiceData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.description}</TableCell>
                                <TableCell>{data.rate}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="more" onClick={(event) => handleClick(event, data.id, data.rate)}>
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={handleOpenModal}>Edit</MenuItem>
                                    </Menu>

                                    {/* Modal */}
                                    <Modal
                                        open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="edit-modal-title"
                                        aria-describedby="edit-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            <Typography id="edit-modal-title" variant="h6" component="h2">
                                                Edit {data.description}
                                            </Typography>
                                            <TextField
                                                label="Rate"
                                                fullWidth
                                                margin="normal"
                                                value={serviceRate} // Use the currentRate state
                                                onChange={handleServiceRate}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleUpdateData()}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Modal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PaymentRate;