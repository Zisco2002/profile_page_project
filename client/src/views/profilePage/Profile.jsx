import React from 'react'
import NavBar from '../navBar/NavBar'
import { Box,useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from '../../Widgets/UserWidget'
import { useTheme } from '@emotion/react'
import ActivitiesListWidget from '../../Widgets/ActivitiesListWidget'
import { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const [user, setUser] = useState(null);
  const users = useSelector(state => state.user)
  const userId = users.rows[0].id
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const theme =useTheme()

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

  return (
    <Box>
      <NavBar/>
      <Box
        width="100%"
        padding="2rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "20%":undefined} mb={'20px'}>
          <UserWidget userId={userId} PicturePath={'./user_1.jpg'}/>
        </Box>
        <Box sx={{
          borderRadius: "0.75rem",
          backgroundColor: theme.palette.background.alt
        }} flexBasis={isNonMobileScreens ? "42%":undefined} >
            <ActivitiesListWidget userId={userId}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile