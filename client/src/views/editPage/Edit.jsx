import React from 'react'
import Form from '../loginPage/Form'
import {Box, Button, TextField, useTheme, Typography, useMediaQuery} from "@mui/material";
import { useSelector } from 'react-redux' 

const Edit = () => {
    
    const user=useSelector((state) => state.user)
    const theme=useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const oldUser={
        firstName: 'ahmed',
        lastName: 'mahmoud',
        
    }

  return (
    <>
        
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
                <Form isEdit={true} oldUser={oldUser}/>
            </Box>
        </Box>
    </>


)
}

export default Edit