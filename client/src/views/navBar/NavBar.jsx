import React from 'react'
// import LogoIcon from './LogoIcon.svg'
import { useState } from 'react'
import { Box,IconButton,InputBase,Typography,Select,MenuItem,FormControl,useTheme, Icon } from '@mui/material'
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"
import { setMode,setLogout } from '../../state/index.js'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../layouts/FlexBetween.jsx'

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector((state)=> state.user)

  const theme=useTheme() 
  const neutralLight =theme.palette.neutral.light
  const main =theme.palette.neutral.main
  const dark= theme.palette.neutral.dark
  const background =theme.palette.background.default
  const primaryLight=theme.palette.primary.light
  const alt=theme.palette.background.alt

  const fullName=`${user.rows[0].fname} ${user.rows[0].lname}`
  

  return (
    <FlexBetween
      padding={'1rem 6%'}
      backgroundcolor={'#fff'}
      sx={{
        boxShadow:'0px 8px 12px rgba(0, 0, 0, 0.05)'
        
      }}
    >
      <FlexBetween  gap="1.75rem">
        <Typography 
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={()=>navigate("/home")}
            sx={{
              "&:hover":{
                color: primaryLight,
                cursor:"pointer"
              }
            }}
          >
            Meow 
            <IconButton
              onClick={()=>navigate("/home")}
            >
              <img src="/iconsCat.svg" alt="My Icon" />
            </IconButton>
            
          </Typography>

      </FlexBetween>
        <FlexBetween gap="2rem">
            <IconButton onClick={()=>dispatch(setMode())}>
            {theme.palette.mode ==="dark" ? (
              <DarkMode sx={{fontSize:"25px"}} />
            ) : (
              <LightMode sx={{fontSize:"25px"}}/>
            )}
            </IconButton>
            <FormControl variant="standard"
              value={fullName}
            >
              <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
              >
                <MenuItem 
                value={fullName}
                >
                  <Typography>
                    {fullName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
  </FlexBetween>


  )
}

export default NavBar
