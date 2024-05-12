import { BrowserRouter,Navigate, Route, Routes } from'react-router-dom'
import Home from './views/homePage/Home.jsx';
import Login from './views/loginPage/Login.jsx';
import Profile from './views/profilePage/Profile.jsx';
import LoginSide from './views/loginPage/LoginSide.jsx'
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme.js';
import Edit from './views/editPage/Edit.jsx';


function App() {

  const mode = useSelector((state)=> state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/> 
          <Routes>
            <Route path="/login" element={<LoginSide />}/>
            <Route path='/' element={isAuth ? <Home /> : <Navigate to="/login" />}/>
            {/* <Route path='/login/side' element={<Login/>}/>
            <Route path='/login' element={<LoginSide/>}/> */}
            <Route path='/edit' element={isAuth ? <Edit /> : <Navigate to="/" />} />
            <Route path='/profile' element={isAuth ? <Profile /> : <Navigate to="/login" />}  />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
