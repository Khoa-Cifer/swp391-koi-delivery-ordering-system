import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPaymentHistory } from "../../../../utils/axios/paymentHistory";


function PaymentHistory() {
    const [paymentHistoryData, setPaymentHistoryData] = useState();

    useEffect(() => {
        async function fetchPaymentHistory() {
            let fetchedData = await getAllPaymentHistory();
            if (fetchedData) {
                setPaymentHistoryData(fetchedData);
            }
        }
        fetchPaymentHistory();
    }, []);

    return (
        <div>
             <div className="dashboard-info">
                <h2 style={{ marginTop: "0" }}>Payment History</h2>
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
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentHistoryData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.amount}</TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PaymentHistory;