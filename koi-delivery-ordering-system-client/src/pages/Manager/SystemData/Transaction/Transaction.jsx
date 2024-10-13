import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllTransaction } from "../../../../utils/axios/transaction";

// Function to format the date in "DD/MM/YYYY"
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function Transaction() {
    const [transactionData, setTransactionData] = useState();

    useEffect(() => {
        async function fetchTransaction() {
            let fetchedData = await getAllTransaction();
            if (fetchedData) {
                setTransactionData(fetchedData);
            }
        }
        fetchTransaction();
    }, []);

    return (
        <div>
            <div className="dashboard-info">
                <h2 style={{ marginTop: "0" }}>Transaction</h2>
            </div>

            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Id</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Amount</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Transaction Date</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.amount}</TableCell>
                                <TableCell>{formatDate(data.transactionDate)}</TableCell> {/* Format the date here */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Transaction;
