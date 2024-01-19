import React from "react";
import { Container, CssBaseline, Box, Typography } from "@mui/material";
import "./HomePage.css";

function HomePage(): JSX.Element {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quora-like App
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
