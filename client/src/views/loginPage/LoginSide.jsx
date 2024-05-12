import React from 'react';
import {Box, CssBaseline, Grid, Paper, ThemeProvider, Typography, useMediaQuery, useTheme} from "@mui/material";
import Form from "./Form";
import background from './background.jpeg'

const LoginSide = () => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <ThemeProvider theme={theme} >
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundImage: `url(${background})`,
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                        p={"2rem"}
                        m={"2rem auto"}
                        borderRadius={"1rem"}
                        backgroundColor={theme.palette.background.alt}
                    >
                        <div className={"test"}>
                            <Form />
                        </div>
                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default LoginSide