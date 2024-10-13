import {  Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Typography,} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLicenses } from "../../../../utils/axios/license";
import dateTimeConvert from "../../../../components/utils";

function License() {
  const [licenseData, setLicenseData] = useState();

  useEffect(() => {
    async function fetchLicense() {
      let fetchedData = await getAllLicenses();
      if (fetchedData) {
        setLicenseData(fetchedData);
      }
    }
    fetchLicense();
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
              <TableCell style={{ color: "#041967" }}>
                <Typography>Id</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Description</Typography>
              </TableCell>
              <TableCell style={{ color: "#041967" }}>
                <Typography>Date of issue</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenseData?.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{dateTimeConvert(data.dateOfIssue)}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default License;
