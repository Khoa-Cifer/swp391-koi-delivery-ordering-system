import Logo from "../../assets/logo.png";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainSlider from "../../components/MainSlider";

const BoxSignIn = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
}));

const BoxLogo = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
}));

const BoxForm = styled(Box)(() => ({
    margin: "25% 25%",
    textAlign: "center",
}));

const Page404 = () => {
    return (
        <BoxSignIn>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BoxLogo>
                        <img src={Logo} alt="" />
                    </BoxLogo>
                    <BoxForm>
                        <Typography>Page Not Found</Typography>
                    </BoxForm>
                </Grid>
                <Grid item xs={6}>
                    <MainSlider />
                </Grid>
            </Grid>
        </BoxSignIn>
    );
};

export default Page404;
