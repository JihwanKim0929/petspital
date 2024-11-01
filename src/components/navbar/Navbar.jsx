import React, { Fragment, useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Show, Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from "../ui/menu";
import { Button } from '../ui/button';

const Navbar = () => {

  const isBelowMd = useBreakpointValue({ base: true, md: false });
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'PETOWNER') {
        setUserType('petOwner');
      } else if (parsedUser.role === 'DOCTOR') {
        setUserType('doctor');
      } else if (parsedUser.role === 'ADMIN') {
        setUserType('admin');
      }
    } else {
      setIsLoggedIn(false);
      return;
    }
  }, [navigate]);

  const userLink = userType === 'petOwner' ? '/user/petowner' :
                   userType === 'doctor' ? '/user/doctor' :
                   userType === 'admin' ? '/user/admin' : '/';

  const handleSignOut = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Fragment>
      <div className="navbar">
        <Link to={userLink} style={{ textDecoration: "none" }} className="logoContainer">
          <img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} alt="LOGO" className="logo" />
          <span className="logoTitle">Petspital</span>
        </Link>

        <Box hideBelow='md'>
          <div className="desktopItems">
            <div className="item">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <div className="abtPetspital">
                  About
                </div>
              </Link>
            </div>
            <div className="item">
              <Link to="/notifications" style={{ textDecoration: "none" }}>
                <div className="notifications">
                  Notifications
                </div>
              </Link>
            </div>
            { isLoggedIn && 
            (<div className="item">
              <Button className="signOutButton" colorScheme='gray' variant='solid' onClick={handleSignOut}>Sign out</Button>
            </div>)}
            { !isLoggedIn && 
            (<div className="item">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button className="signInButton" colorScheme='gray' variant='solid'>Sign up</Button>
                </Link>
            </div>)}
            { !isLoggedIn && 
            (<div className="item">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button className="signUpButton" colorScheme='gray' variant='solid'>Sign in</Button>
                </Link>
            </div>)}
          </div>
        </Box>

        <Show when={isBelowMd}>
          <div className="mobileItems">
            {
              isLoggedIn ?
              <div className="item">
                <Button className="signOutButton" colorScheme='gray' variant='solid' onClick={handleSignOut}>Sign out</Button>
              </div> :
              <div className="item">
                <Link to="/login" style={{ textDecoration: "none" }} className="signIn">
                  <Button className="signUpButton" colorScheme='gray' variant='solid'>Sign in</Button>
                </Link>
              </div>
            }
            <div className="item">
              <MenuRoot>
                <MenuTrigger asChild>
                  <IconButton colorScheme='black' variant='ghost' className="mobileMenuButton">
                    <IoMenu />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  <Link to="/about" style={{ textDecoration: "none" }}>
                    <MenuItem p={3} paddingRight={6} value='about'>
                      <IoIosArrowForward /> About
                    </MenuItem>
                  </Link>
                  <Link to="/notifications" style={{ textDecoration: "none" }}>
                    <MenuItem p={3} paddingRight={6} value='notifications'>
                      <IoIosArrowForward /> Notifications
                    </MenuItem>
                  </Link>
                    { !isLoggedIn && (
                    <div>
                      <MenuSeparator />
                      <MenuItem alignItems='center' justifyContent='center' p={3} value='signUp'>
                        <Link to="/signup" style={{ textDecoration: "none" }} className="signUp">
                          <Button className="signUpButton" colorScheme='gray' variant='solid'>Sign up</Button>
                        </Link>
                      </MenuItem>
                    </div>)}
                </MenuContent>
              </MenuRoot>
            </div>
          </div>
        </Show>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar