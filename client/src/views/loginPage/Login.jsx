import React from 'react'
import {
    useTheme,
    Box,
    Typography,
    useMediaQuery
} from "@mui/material";
import Form from "./Form";

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box >
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary" display="flex" alignItems="center" >
                    Meow
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "30%" : "93%"}
                p={"2rem"}
                m={"2rem auto"}
                borderRadius={"1rem"}
                backgroundColor={theme.palette.background.alt}
            >
                <Form  />
            </Box>
        </Box>
    )
}

export default Login
