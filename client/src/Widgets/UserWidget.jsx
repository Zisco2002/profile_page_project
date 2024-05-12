import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    PhoneEnabled ,
    EmailOutlined,
    EditOutlined

} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme,IconButton } from "@mui/material";
import WidgetWrapper from "../layouts/WidgetWrapper";
import FlexBetween from "../layouts/FlexBetween";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLinksWidget from "./SocialLinksWidget";


const UserWidget = ({ PicturePath ,userId}) => {

    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const [edit,isEdit]=useState(false)
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };

      useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) return null;

    const User={
        id:user.id,
        fname:user.fname,
        lname:user.lname,
        email:user.email,
        address:user.address,
        socialLinks:{
            "facebook":user.fb,
            "linkedin":user.linkedin
        }
    }

    return (
        <WidgetWrapper>
            <FlexBetween mb={'10px'}>
                <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="500"
                    m={'10px'}
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                    }}
                >
                    {User.fname} {User.lname}
                </Typography>
                <IconButton onClick={()=>navigate('/edit')}>
                    <EditOutlined />
                </IconButton>
            </FlexBetween>
                    
            <Box
                gap="0.5rem" pb="1.1rem"
                sx={{
                    display:'flex',
                    justifyContent: 'center'
                }}
            >
                <img
                    src={'/user_1.jpg'}
                    alt="userImage"
                    style={{ 
                            objectFit: "cover", 
                            borderRadius: "10px",
                            height: '200px',
                            width: '200px', 
                        }}

                />
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Box display={"flex"} alignItems={"center"} gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{User.address}</Typography>
                </Box>
                {/* <Box display={"flex"} alignItems={"center"} gap="1rem" mb="0.5rem">
                    <PhoneEnabled fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{user.phone}</Typography>
                </Box> */}
                <Box display={"flex"} alignItems={"center"} gap="1rem" mb="0.5rem">
                    <EmailOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{User.email}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p={"1rem 0"}>
                <Typography
                    fontSize={"1rem"}
                    color={main}
                    fontWeight={"500"}
                    mb={"1rem"}
                >
                    Social Profiles
                </Typography>

                {Object.keys(User.socialLinks).map((socialKey) => (
                    <SocialLinksWidget key={socialKey} platform={socialKey} link={User.socialLinks[socialKey]} />
                ))}
            </Box>

        </WidgetWrapper>
    )
}

export default UserWidget