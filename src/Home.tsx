import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Welcome to the Ticketing System
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdminLogin}
          >
            Admin Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
