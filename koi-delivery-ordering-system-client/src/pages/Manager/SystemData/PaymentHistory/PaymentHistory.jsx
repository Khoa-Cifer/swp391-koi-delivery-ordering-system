import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllFishes } from "../../../../utils/axios/fish";


function PaymentHistory() {
    const [fishData, setFishData] = useState();

    useEffect(() => {
        async function fetchFish() {
            let fetchedData = await getAllFishes();
            if (fetchedData) {
                setFishData(fetchedData);
            }
        }
        fetchFish();
    }, []);

    return (
        <div>
             <div className="dashboard-info">
                <h2 style={{ marginTop: "0" }}>Fish</h2>
            </div>

            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Id</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Name</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Size</Typography>
                            </TableCell>
                            {/* <TableCell style={{ color: '#041967' }}>
                                <Typography>Password</Typography>
                            </TableCell> */}
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Age</Typography>
                            </TableCell>
                            <TableCell style={{ color: '#041967' }}>
                                <Typography>Weight</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fishData?.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.size}</TableCell>
                                <TableCell>{data.age}</TableCell>
                                <TableCell>{data.weight}</TableCell>
                                {/* <TableCell>{data.total_fail}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PaymentHistory;