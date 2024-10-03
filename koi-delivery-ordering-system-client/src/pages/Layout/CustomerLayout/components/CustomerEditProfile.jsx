import { Avatar, Box, Button, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import default_avatar from "../../../../assets/default-avatar.jpg"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userUpdateProfile } from "../../../../utils/customers/user";
import { toast } from "react-toastify";
import ToastUtil from "../../../../components/toastContainer";
import { useAuth } from "../../../../authentication/AuthProvider";
import { PhotoCamera } from "@mui/icons-material";

function CustomerEditProfile() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(default_avatar);
    const [updatePassword, setUpdatePassword] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            const userData = JSON.parse(localStorage.getItem("userData"));
            console.log(userData);
            setUser(userData);
        }
        fetchUserData();
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    async function handleSubmit() {
        const token = localStorage.getItem("token");
        const customerInfo = jwtDecode(token);
        const customerId = customerInfo.sub.substring(2);
        let response = null;
        if (updatePassword === false) {
            response = await userUpdateProfile(
                customerId,
                user.email,
                user.username,
                user.phoneNumber,
                "" //If do not update password, set to empty string
            );
        } else {
            response = await userUpdateProfile(
                customerId,
                user.email,
                user.username,
                user.phoneNumber,
                user.password
            );
        }
        if (response) {
            toast(response);
            auth.handleLogout();
            navigate("/");
        } else {
            toast("Unexpected error has been occurred");
        }
    };

    const handleUpdatePasswordState = () => {
        setUpdatePassword(!updatePassword);
    }

    return user && (
        <Container maxWidth="md" style={{ marginTop: "30px" }}>
            <ToastUtil />
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Grid container spacing={4}>
                    {/* Avatar Section */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Avatar
                            alt={user.username}
                            src={imagePreview}
                            sx={{ width: 180, height: 180, margin: '0 auto' }}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <PhotoCamera />
                        </IconButton>
                        <Button></Button>
                        <Button variant="outlined" size="small" onClick={handleUpdatePasswordState}>Update password</Button>
                    </Grid>

                    {/* Form Section */}
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Edit Profile
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        type="text"
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
                                {updatePassword && (
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Password"
                                                name="password"
                                                onChange={handleChange}
                                                type="password"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Confirm Password"
                                                name="confirm Password"
                                                onChange={handleConfirmPasswordChange}
                                                type="password"
                                                fullWidth
                                            />
                                        </Grid>
                                    </>
                                )}

                            </Grid>
                            <Box sx={{ mt: 3, display: "flex", gap: "16px" }}>
                                <Button variant="outlined" onClick={handleSubmit} fullWidth>
                                    Cancel
                                </Button>
                                {user.email && user.username && user.phoneNumber &&
                                    (updatePassword ? confirmPassword === user.password : true) ? (
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        fullWidth
                                    >
                                        Save Changes
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        fullWidth
                                        disabled
                                    >
                                        Save Changes
                                    </Button>
                                )}

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CustomerEditProfile;