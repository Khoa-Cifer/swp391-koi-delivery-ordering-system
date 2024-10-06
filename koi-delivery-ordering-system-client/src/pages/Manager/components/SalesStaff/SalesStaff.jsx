import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import ToastUtil from "../../../../components/toastContainer";
import { toast } from "react-toastify";
import { createSalesStaff, getAllSalesStaff } from "../../../../utils/admin/salesStaff";

function SalesStaff() {
    const [salesStaffData, setSalesStaffData] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    async function fetchSalesStaffs() {
        let fetchedData = await getAllSalesStaff();
        if (fetchedData) {
            setSalesStaffData(fetchedData);
        }
    }

    useEffect(() => {
        fetchSalesStaffs();
    }, [])

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

    async function handleCreateSalesStaff() {
        const data = await createSalesStaff(email, username);
        if (data === "Account create successfully") {
            await fetchSalesStaffs();
        }
        toast(data);
        handleClose();
    }

    return (
        <div>
            <ToastUtil />
            <div className={open ? 'blur' : ''}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                    <Button onClick={handleOpen} variant="contained" style={{ maxWidth: "30%" }}>Create New Sales Staff</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={modalStyle}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateSalesStaff}
                            disabled={!username || !email} // Disable if either is empty
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
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Id</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Username</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Email</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Phone Number</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesStaffData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phoneNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SalesStaff;