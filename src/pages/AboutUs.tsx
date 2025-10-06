import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Link,
  Card,
  Paper,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../Layout";
import { Phone, Email, Instagram, LocationOn } from "@mui/icons-material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MarketingIcon from "@mui/icons-material/LocalOffer";
import BusinessIcon from "@mui/icons-material/BusinessCenter";
import CreativeIcon from "@mui/icons-material/Brush";
import WebIcon from "@mui/icons-material/Web";
import { ContactUsParams, postContactUs } from "../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppMutation } from "../hooks/useAppMutation";

const contactList = [
  { icon: <Phone color="primary" />, text: "(+60) 123456789", label: "Phone" },
  {
    icon: <Email color="primary" />,
    text: "hello@brewedinchaos.com",
    label: "Email",
  },
  {
    icon: <LocationOn color="primary" />,
    text: "Kuala Lumpur, Malaysia",
    label: "Address",
  },
  {
    icon: <Instagram color="primary" />,
    text: "@BrewedInChaos",
    label: "Instagram",
  },
];

const services = [
  {
    title: "Solution",
    description:
      "We provide a seamless all-in-one platform for beans, supplies, equipmentm and education. ",
    icon: <MarketingIcon color="primary" />,
  },
  {
    title: "Transparency",
    description:
      "Using blockchain, we offer transparent product traceability, ensuring users know the origin of each product.",
    icon: <BusinessIcon color="primary" />,
  },
  {
    title: "Creative",
    description:
      "Our interactive learning hub features books and courses that empower coffee enthusiast at all levels.",
    icon: <CreativeIcon color="primary" />,
  },
  {
    title: "Subcriptions",
    description: "Exclusive loyalty program which offers tailored VIP rewards.",
    icon: <WebIcon color="primary" />,
  },
];

const AboutUsPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    name: Yup.string().required("name is required"),
    phone: Yup.string().required("phone is required"),
    message: Yup.string().required("message is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactUsParams>({
    resolver: yupResolver(validationSchema),
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, reset } = useAppMutation(postContactUs, {
    onSuccess: () => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const onSubmit = (data: ContactUsParams) => {
    mutate(data);
  };

  // const { data: aboutData } = useQuery({
  //   queryKey: ["aboutUs"],
  //   queryFn: getAboutUs,
  // });

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "light.main",
          color: "white",
          padding: 4,
          minHeight: "100vh",
        }}
      >
        {/* <p>
          <strong>About:</strong> {aboutData?.about}
        </p> */}

        <Box sx={{ maxWidth: 1200, margin: "auto", textAlign: "center" }}>
          {/* Original About Us Content */}
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome to Brewed in Chaos!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Welcome to Brewed in Chaos, where coffee lovers deserve a 1 stop
            shop, not a maze of platforms. We are passionate about delivering
            the finest coffee experience to our customers by offering
            premium-quality beans, barista supplies, and educational resources
            to enhance your coffee journey. Whether you’re a seasoned barista or
            a coffee enthusiast, our carefully curated collection is designed to
            meet your every need.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, boxShadow: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  align="center"
                >
                  Our Products
                </Typography>
                <Typography align="center">
                  We offer a curated selection of premium coffee beans, both
                  classic and flavored, sourced from sustainable farms. Our
                  collection includes everything from bold espressos to smooth
                  blends, perfect for any coffee lover.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, boxShadow: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  align="center"
                >
                  Our Vision
                </Typography>
                <Typography align="center">
                  We aim to create a global community of coffee enthusiasts by
                  delivering exceptional coffee experiences, blending quality
                  and innovation while supporting ethical and sustainable
                  practices.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* New Get In Touch Section */}
          <Box sx={{ flexGrow: 1, p: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              textAlign="center"
            >
              Our Solution: Innovating Coffee, One Cup At A Time.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {services.map((service, index) => (
                <Grid item key={index} xs={12} sm={8} md={3}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ alignItems: "center", display: "flex" }}
                        >
                          {service.icon}
                        </Typography>
                        <Typography variant="h5">{service.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" mt={2}>
                        {service.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button>Learn More</Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                // justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography variant="h4" align="left" fontWeight="bold">
                  Get in touch with us!
                </Typography>
                <Typography align="left" color="secondary.main">
                  Get In Touch Desc
                </Typography>
              </Box>
              <Grid container spacing={2} justifyContent="center" my={2}>
                {contactList.map((contact, index) => (
                  <Grid item xs={12} md={6} key={index} gap={2}>
                    <Typography variant="h3">{contact.icon}</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {contact.text}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* <Box sx={{ display: "flex", gap: 2 }}>
                <Link href="#">
                  <FacebookIcon />
                </Link>
                <Link href="#">
                  <InstagramIcon />
                </Link>
                <Link href="#">
                  <TwitterIcon />
                </Link>
                <Link href="#">
                  <LinkedInIcon />
                </Link>
              </Box> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  // component="form"
                  // noValidate
                  // autoComplete="off"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    {...register("email")}
                    label="Email"
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    helperText={errors.email?.message}
                  />
                  <TextField
                    {...register("name")}
                    label="Name"
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    helperText={errors.name?.message}
                  />
                  <TextField
                    {...register("phone")}
                    label="Phone"
                    variant="filled"
                    sx={{ bgcolor: "light.main" }}
                    helperText={errors.phone?.message}
                  />
                  <TextField
                    {...register("message")}
                    label="Message"
                    variant="filled"
                    multiline
                    rows={4}
                    sx={{ bgcolor: "light.main" }}
                    helperText={errors.message?.message}
                  />
                  <Button sx={{ mt: 2 }} type="submit">
                    Submit
                  </Button>
                </Box>
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
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutUsPage;
