import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Paper, Button } from "@mui/material";
import {
  EmailSubscribeParams,
  postEmailSubscribe,
} from "../../api/postEmailSubscribe";
import { useAppMutation } from "../../hooks/useAppMutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

const footerLinks = [
  {
    title: "SITEMAP",
    links: [
      { name: "About us", link: "/about-us" },
      { name: "Services", link: "#" },
      // { name: "Blog", link: "/blog" },
      { name: "Upcoming Events", link: "#" },
    ],
  },
  {
    title: "HELP",
    links: [
      // { name: "Getting started", link: "/getting-started" },
      { name: "Package", link: "/package" },
      { name: "FAQ", link: "/faq" },
      { name: "Referral", link: "/referral" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailSubscribeParams>({
    resolver: yupResolver(validationSchema),
  });

  // const { mutate } = useAppMutation(postEmailSubscribe);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, reset } = useAppMutation(postEmailSubscribe, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const onSubmit = (data: EmailSubscribeParams) => {
    mutate(data);
  };

  return (
    // <Box>OI</Box>
    <Box
      component="footer"
      sx={{
        backgroundColor: "#161d2f",
        padding: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: "white",
        flexWrap: "wrap",
      }}
    >
      {footerLinks.map((section) => (
        <Box key={section.title} sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="h6" sx={{ mt: 4, color: "white" }}>
            {section.title}
          </Typography>
          {section.links.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "light.main",
                  mb: 1,
                  "&:hover": {
                    color: "#4caf50",
                  },
                }}
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Box>
      ))}

      <Box sx={{ flex: 1, minWidth: 200, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
          SUBSCRIBE
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              variant="outlined"
              {...register("email")}
              helperText={errors.email?.message}
              size="small"
              placeholder="Enter email address"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                flex: 1,
                marginRight: 1,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#ff5722", color: "white" }}
            >
              SEND
            </Button>
          </Box>
        </form>
        {showSuccess && (
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              bottom: 120,
              right: 16,
              padding: 2,
              borderRadius: "8px",
            }}
          >
            🚀 Successfully submitted!
          </Paper>
        )}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Facebook</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">Twitter</Typography>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="body2">LinkedIn</Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 4, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "white" }}>
          © 2024 All rights reserved by Brewed in chaos Sdn Bhd.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
