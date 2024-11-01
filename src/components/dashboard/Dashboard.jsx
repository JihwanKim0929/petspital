import React from 'react';
import './Dashboard.scss';
import { Grid } from '@chakra-ui/react';

const Dashboard = ({ children }) => {

    return (
        <div className="dashboard">
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={3} p={3} data-state="open" 
            _open={{ 
                animationName: "fade-in, slide-from-top",
                animationDuration: "300ms",
                animationTimingFunction: "ease-out"
            }}>
                {children}
            </Grid>
        </div>
    );
}

export default Dashboard