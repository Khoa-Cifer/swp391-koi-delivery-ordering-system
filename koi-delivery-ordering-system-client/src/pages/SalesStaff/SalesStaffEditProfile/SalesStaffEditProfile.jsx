    import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
    } from "@mui/material";
    import { useEffect, useState } from "react";
    import default_avatar from "../../../assets/default-avatar.jpg";
    import { useNavigate } from "react-router-dom";
    import { jwtDecode } from "jwt-decode";
    import { getCustomerById } from "../../../utils/axios/customer";
    import { toast } from "react-toastify";
    import { PhotoCamera } from "@mui/icons-material";
    import { useAuth } from "../../../authentication/AuthProvider";
    import { getFileByFileId } from "../../../utils/axios/file";
    import ToastUtil from "../../../components/toastContainer";
    import {
    salesStaffUpdateProfile,
    salesStaffUpdateProfileImage,
    } from "../../../utils/axios/salesStaff";

    function SalesStaffEditProfile() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(default_avatar);
    const [updatePassword, setUpdatePassword] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    let salestaffId;
    if (token) {
        const customerInfo = jwtDecode(token);
        salestaffId = customerInfo.sub.substring(2);
    }

    useEffect(() => {
        async function fetchUserData() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUser(userData);
        const customer = await getCustomerById(salestaffId);
        if (customer.file) {
            const imageResponse = await getFileByFileId(customer.file.id);
            const imgUrl = URL.createObjectURL(imageResponse);
            setImagePreview(imgUrl);
        }
        }
        fetchUserData();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
        }
    };


    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, ""); // Loại bỏ ký tự không phải số
        const phoneNumberLength = phoneNumber.length;
      
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
          return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      };
      
      const handleBlur = () => {
        setUser((prevUser) => ({
          ...prevUser,
          phoneNumber: formatPhoneNumber(prevUser.phoneNumber),
        }));
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
    };
    
    function handleSalesStaffHomeNavigation() {
        navigate("/sales-staff-home");
    }

    async function handleSubmit() {
        let response = null;
        if (updatePassword === false) {
        response = await salesStaffUpdateProfile(
            salestaffId,
            user.email,
            user.username,
            user.phoneNumber,
            "" //If do not update password, set to empty string
        );
        } else {
        response = await salesStaffUpdateProfile(
            salestaffId,
            user.email,
            user.username,
            user.phoneNumber,
            user.password
        );
        }

        if (selectedImage) {
        const imageResponse = await salesStaffUpdateProfileImage(
            salestaffId,
            selectedImage
        );
        if (imageResponse) {
            toast(imageResponse);
        }
        }

        if (response) {
        toast(response);
        auth.handleLogout();
        navigate("/");
        } else {
        toast("Unexpected error has been occurred");
        }
    }

    const handleUpdatePasswordState = () => {
        setUpdatePassword(!updatePassword);
    };



    return (
        user && (
        <Container maxWidth="md" style={{ marginTop: "120px" }}>
            <ToastUtil />
            <Paper elevation={3} sx={{ padding: 4 }}>
            <Grid container spacing={4}>
                {/* Avatar Section */}
                <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                <Avatar
                    alt={user.username}
                    src={imagePreview}
                    sx={{ width: 180, height: 180, margin: "0 auto" }}
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
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleUpdatePasswordState}
                >
                    Update password
                </Button>
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
                        type=""
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
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type=""
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
                    <Button
                        variant="outlined"
                        onClick={() => handleSalesStaffHomeNavigation()}
                        fullWidth
                    >
                        Cancel
                    </Button>
                    {user.email &&
                    user.username &&
                    user.phoneNumber &&
                    (updatePassword
                        ? confirmPassword === user.password
                        : true) ? (
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
    );
    }

    export default SalesStaffEditProfile;
