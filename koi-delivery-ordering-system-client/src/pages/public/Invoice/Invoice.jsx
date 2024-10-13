import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { CreditCard, AttachMoney, CheckCircle } from "@mui/icons-material";

const invoiceData = {
  receiptNumber: "14258",
  date: "MARCH 03, 2018",
  companyName: "COMPANY NAME",
  tagline: "BRANDING TAGLINE SPACE HERE",
  invoiceTo: {
    name: "JOHN SMITH",
    address: "123 GREEN LAKE ST.",
    cityState: "CITY STATE",
    country: "COUNTRY",
  },
  items: [
    { id: 1, description: "ITEM 1", price: 30.5, qty: 3, total: 91.5 },
    { id: 2, description: "ITEM 2", price: 50.0, qty: 1, total: 50.0 },
    { id: 3, description: "ITEM 3", price: 70.0, qty: 5, total: 350.0 },
    { id: 4, description: "ITEM 4", price: 20.0, qty: 2, total: 40.0 },
  ],
  subtotal: 531.5,
  taxes: 63.78,
  shipping: 12.0,
  discount: -15.0,
  total: 592.28,
  termsAndConditions:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et magna aliqua.",
};

const Invoice = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        transform: "scale(0.8)",
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        {/* Invoice Info */}
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            RECEIPT # {invoiceData.receiptNumber} • {invoiceData.date}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ display: "inline", ml: 5 }}>
            INVOICE TO:
          </Typography>
        </Box>

        {/* Invoice To Section - Top Right */}
        <Box sx={{ textAlign: "left", ml: -3 }}>
          <Typography
            variant="body1"
            sx={{ display: "inline", fontWeight: "bold" , mb:3}}
          >
            {invoiceData.invoiceTo.name}
          </Typography>

          {/* Address Information Below */}
          <Typography>{invoiceData.invoiceTo.address}</Typography>
          <Typography>{invoiceData.invoiceTo.cityState}</Typography>
          <Typography>{invoiceData.invoiceTo.country}</Typography>
        </Box>
      </Box>

      {/* Company Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{invoiceData.companyName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {invoiceData.tagline}
        </Typography>
      </Box>

      {/* Items Table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>PRODUCT DESCRIPTION</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">QTY</TableCell>
              <TableCell align="right">TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.id}
                  </Box>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">${item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Terms and Total */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ width: "48%" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            TERMS AND CONDITIONS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {invoiceData.termsAndConditions}
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          {["Subtotal", "Taxes", "Shipping", "Discount"].map((item) => (
            <Box
              key={item}
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography>{item}</Typography>
              <Typography>
                ${invoiceData[item.toLowerCase()].toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              p: 1,
              borderRadius: 1,
              mt: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              TOTAL
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              ${invoiceData.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Payment Method */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          PAYMENT METHOD
        </Typography>
        <RadioGroup row>
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AttachMoney />
                &nbsp;Cash/Debit
              </Box>
            }
          />
          <FormControlLabel
            value="cheque"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircle />
                &nbsp;Cheque
              </Box>
            }
          />
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CreditCard />
                &nbsp;Credit card
              </Box>
            }
          />
        </RadioGroup>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Cardholder's Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Card #" variant="outlined" fullWidth />
            <TextField label="Exp" variant="outlined" sx={{ width: "100px" }} />
            <TextField label="CV" variant="outlined" sx={{ width: "80px" }} />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">THANK YOU FOR YOUR PURCHASING!</Typography>
      </Box>
    </Box>
  );
};

export default Invoice;
