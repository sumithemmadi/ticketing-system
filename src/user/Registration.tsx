import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SmallCopyright } from "../components/SmallCopyright";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  company?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Registration() {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);

  const context = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (context?.isReady && context?.isAuthenticated) {
      if (context.user?.account_type === "user") {
        navigate("/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [
    context?.isReady,
    context?.isAuthenticated,
    context?.user?.account_type,
    navigate,
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues: FormValues = {
      fullName: data.get("fullName") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      company: data.get("company") as string,
      address: data.get("address") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirmPassword") as string,
    };

    const errors = validateForm(formValues);

    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      setFormErrors({});
    } else {
      setFormErrors(errors);
      setOpen(true);
    }
  };

  const validateForm = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    }
    if (!values.phone || !isValidPhoneNumber(values.phone, "IN")) {
      errors.phone = "Valid Indian phone number is required";
    }
    if (!values.email || !validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.company) {
      errors.company = "Company name is required";
    }
    if (!values.address) {
      errors.address = "Address is required";
    }
    if (!values.password || values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newErrors = { ...formErrors };

    switch (name) {
      case "email":
        if (value && validateEmail(value)) {
          delete newErrors[name];
        } else {
          newErrors[name] = "Invalid email address";
        }
        break;
      case "password":
        if (value && value.length >= 6) {
          delete newErrors[name];
        } else {
          newErrors[name] = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        const password = (
          document.getElementById("password") as HTMLInputElement
        ).value;
        if (value === password) {
          delete newErrors[name];
        } else {
          newErrors[name] = "Passwords do not match";
        }
        break;
      case "phone":
        if (value && isValidPhoneNumber(value, "IN")) {
          delete newErrors[name];
        } else {
          newErrors[name] = "Valid Indian phone number is required";
        }
        break;
      default:
        if (value) {
          //   delete newErrors[name];
        } else {
          //   newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
    }

    setFormErrors(newErrors);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!formErrors.email}
                helperText={formErrors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="company"
                label="Company Name"
                name="company"
                autoComplete="company"
                error={!!formErrors.company}
                helperText={formErrors.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                error={!!formErrors.address}
                helperText={formErrors.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!formErrors.password}
                helperText={formErrors.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept terms of service and privacy policy."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <SmallCopyright sx={{ mt: 5 }} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please correct the errors in the form
        </Alert>
      </Snackbar>
    </Container>
  );
}
