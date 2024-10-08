import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../../../utils/axios/customer";

function Customer() {
    const [customerData, setCustomerData] = useState();

    useEffect(() => {
        async function fetchCustomers() {
            let fetchedData = await getAllCustomers();
            if (fetchedData) {
                setCustomerData(fetchedData);
            }
        }
        fetchCustomers();
    }, []);

    return (
        <div>
             <div className="dashboard-info">
                <h2 style={{ marginTop: "0" }}>Customer</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                <Button variant="contained" style={{ maxWidth: "30%" }}>Create New Customer</Button>
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
                            {/* <TableCell style={{ color: '#041967' }}>
                                <Typography>Password</Typography>
                            </TableCell> */}
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Amount</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Phone Number</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell>{data.phoneNumber}</TableCell>
                                {/* <TableCell>{data.total_fail}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Customer;