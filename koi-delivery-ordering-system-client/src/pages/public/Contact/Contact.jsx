import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "./Contact.css";
import StarRating from "../../../components/StarRating";
import { Link } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#4caf50",
    },
  },
});

function ContactPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #2196f3, #00bcd4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ overflow: "hidden" }}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ bgcolor: "primary.main", color: "white", p: 4 }}
              >
                <Typography variant="h4" gutterBottom>
                  Contact Info
                </Typography>
                <Typography variant="body1" paragraph>
                  If you have any questions about ordering and delivering koi
                  fish, please contact us for advice.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    TP.HCM
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      34 Street Name, City Name, United States
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">086834782</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      hngdqse170515@fpt.ed.vn
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Ha Noi
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      34 Street Name, City Name, United States
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">086834782</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      hngdqse170515@fpt.ed.vn
                    </Typography>
                  </Box>
                </Box>

                <StarRating />

                <Link to="/">Back to home page</Link>
              </Grid>

              <Grid item xs={12} md={6} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  SEND US A MESSAGE
                </Typography>
                <form>
                  <TextField
                    fullWidth
                    type=""
                    label="Name"
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type=""
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    type=""
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    type=""
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ContactPage;
