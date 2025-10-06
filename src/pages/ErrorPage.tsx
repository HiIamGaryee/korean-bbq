import React from "react";
import ErrorBg from "../assets/errorbg.jpeg";
import { Box } from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${ErrorBg})`,
        backgroundSize: "contain",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    />
  );
};

export default ErrorPage;
