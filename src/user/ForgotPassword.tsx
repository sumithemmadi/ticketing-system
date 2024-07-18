import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SmallCopyright } from "../components/SmallCopyright";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [emailError, setEmailError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("error"); // Default to error for showing errors

  const context = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (context?.isReady && context?.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [context?.isReady, context?.isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    let valid = true;

    if (!email || !validateEmail(email.toString())) {
      setEmailError("Invalid email address");
      setSeverity("error");
      setMessage("Please provide a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      try {
        await context?.forgotPassword(email as string);
        setSeverity("success");
        setMessage("Password reset email sent successfully.");
      } catch (error) {
        setSeverity("error");
        setMessage("Failed to send password reset email.");
      }
    }

    setOpen(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email && validateEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  if (!context?.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!emailError}
            helperText={emailError}
            onChange={handleEmailChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>

          <Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Client Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <SmallCopyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity as any}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
