import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../../../utils/admin/customer";

function Customer() {
    const [customerData, setCustomerData] = useState();

    async function fetchCustomers() {
        let fetchedData = await getAllCustomers();
        console.log(fetchedData);
        if (fetchedData) {
            setCustomerData(fetchedData);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div>
            <Button variant="contained" style={{ maxWidth: "30%" }}>Create New Customer</Button>

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