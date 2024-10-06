import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        backgroundColor: "#1976d2",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © 2024 My App. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
