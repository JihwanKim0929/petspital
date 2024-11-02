import React from 'react'
import { Button } from '../ui/button';
import { toaster } from '../ui/toaster';
import { useNavigate } from "react-router-dom";

const SignOutButton = React.forwardRef((props, ref) => {

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try 
        {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'GET',
            credentials: 'include'
        });
    
        if (!response.ok) {
            throw new Error('Failed to log out');
        }
    
        sessionStorage.removeItem('user');
        navigate('/');
    
        toaster.create({
            title: "Successfully logged out.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        } catch (error) {
            console.error('Logout error:', error);
            toaster.create({
                title: "Logout failed.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Button onClick={handleSignOut} ref={ref} {...props}></Button>
    )
});

export default SignOutButton