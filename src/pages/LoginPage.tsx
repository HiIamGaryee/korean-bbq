import {
  Box,
  Button,
  Link,
  Typography,
  TextField,
  Stack,
  Grid,
  Toolbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoginParams, postLogin } from "../api"; // Adjust the path as necessary
import loginBg from "../assets/login-bg.jpeg";
import loginBg2 from "../assets/coffee1.png";

import { useAppMutation } from "../hooks/useAppMutation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = useAppMutation(postLogin);

  const onSubmit = (data: LoginParams) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={12} md={1} sx={{ h: 1 }}></Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            alignitem: { xs: "center", md: "start" },
          }}
        >
          {" "}
          <Box
            sx={{ display: "flex", justifyItems: "end", justifyContent: "end" }}
          >
            <img
              src="/logo.png"
              // src={loginBg2}
              alt="Logo"
              style={{
                height: "auto",
                width: 120,
                cursor: "pointer",
                objectFit: "cover",
              }}
              onClick={() => navigate(`/`)}
            />
          </Box>
          <Box>
            <Typography variant="h4" color="light.main">
              Welcome !
            </Typography>
            <Link href="/sign-up" underline="none">
              <Typography variant="body2" color="light.main" pb={4}>
                Don't have an account?{" "}
                <span style={{ color: "#e2994f", fontWeight: "bold" }}>
                  Sign up
                </span>
              </Typography>
            </Link>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <TextField
                {...register("email")}
                placeholder="Email address"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />
              <TextField
                {...register("password")}
                placeholder="Password"
                type="password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: "light.main",
                  },
                  "& .MuiFilledInput-root": {
                    "&::before": { borderBottomColor: "light.main" },
                    "&::after": { borderBottomColor: "light.main" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 2, color: "light.main" }}
              >
                Sign In
              </Button>
            </Stack>
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link href="#" underline="none" sx={{ color: "light.main" }}>
                <Typography
                  variant="body2"
                  color="light.main"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password ?
                </Typography>
              </Link>{" "}
              <Link href="/" underline="none">
                <Typography
                  variant="body2"
                  color="light.main"
                  sx={{ cursor: "pointer" }}
                >
                  Back Home
                </Typography>
              </Link>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} md={7} sx={{ h: 1 }} />
      </Grid>
    </Box>
  );
};

export default LoginPage;
