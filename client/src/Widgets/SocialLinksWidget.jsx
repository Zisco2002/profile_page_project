import FlexBetween from '../layouts/FlexBetween'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { EditOutlined } from "@mui/icons-material"
import { LinkedIn, Facebook } from "@mui/icons-material"

const SocialLinksWidget = ({ platform, link }) => {

    const { palette } = useTheme()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    let platformIcon;
    switch (platform) {
        case 'linkedin':
            platformIcon = <LinkedIn sx={{ height: '30px', width: '30px' }} />;
            break;
        case 'facebook':
            platformIcon = <Facebook sx={{ height: '30px', width: '30px' }} />;
            break;
        default:
            platformIcon = null;
    }
    if(!link){
        return null
    }


    return (
        <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
                {platformIcon}
                <Box>                
                    {
                        <>
                            <Typography color={main} fontWeight="500">
                                {platform}
                            </Typography>
                            <Typography color={medium}>{link}</Typography>
                        </>
                    }
                </Box>
            </FlexBetween>

        </FlexBetween>
    )
}

export default SocialLinksWidget