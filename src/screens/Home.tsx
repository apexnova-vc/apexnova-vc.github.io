import React from 'react';
import QuestionForm from '../core/QuestionForm';
import QuestionFeed from '../core/QuestionFeed';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HomePage = () => {
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Quora-like App
                </Typography>
                <QuestionForm />
                <QuestionFeed />
            </Box>
        </Container>
    );
};

export default HomePage;
