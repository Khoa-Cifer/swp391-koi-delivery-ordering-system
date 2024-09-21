import { Box, Typography } from "@mui/material";

function Body() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to My App
            </Typography>
            <Typography variant="body1">
                This is where your body content goes. You can add cards, grids, or any other components as per your need.
            </Typography>
        </Box>
    )
}

export default Body;