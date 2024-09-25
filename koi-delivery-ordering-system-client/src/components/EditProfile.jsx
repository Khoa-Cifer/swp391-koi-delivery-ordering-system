import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import default_avatar from "../assets/default-avatar.jpg"

// eslint-disable-next-line react/prop-types
function EditProfile({ role, username, email, amount, phoneNumber }) {
    const [user, setUser] = useState({
        name: username,
        role: role,
        email: email,
        password: '',
        confirmPassword: '',
        phoneNumber: phoneNumber,
        amount: amount ? amount : 0,
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('User profile updated', user);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "30px" }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Grid container spacing={4}>
                    {/* Avatar Section */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Avatar
                            alt={user.name}
                            src={default_avatar}
                            sx={{ width: 180, height: 180, margin: '0 auto' }}
                        />
                        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                            {role}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {username}
                        </Typography>
                    </Grid>

                    {/* Form Section */}
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Edit Profile
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        type="email"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={user.phoneNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        type="password"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        type="password"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 3, display: "flex", gap: "16px" }}>
                                <Button variant="outlined" fullWidth>
                                    Cancel
                                </Button>
                                <Button variant="contained" fullWidth>
                                    Save Changes
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default EditProfile;