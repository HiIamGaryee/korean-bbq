import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Card,
  Avatar,
  Rating,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../Layout";
import { motion } from "framer-motion";
import {
  Phone,
  Email,
  Instagram,
  LocationOn,
  Restaurant,
  LocalFireDepartment,
  Star,
  Favorite,
  FlashOn,
  CheckCircle,
} from "@mui/icons-material";
import { ContactUsParams, postContactUs } from "../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppMutation } from "../hooks/useAppMutation";

const contactList = [
  {
    icon: <Phone color="primary" />,
    text: "(+60) 1234-567-890",
    label: "Phone",
  },
  {
    icon: <Email color="primary" />,
    text: "hello@sansanbbq.my",
    label: "Email",
  },
  {
    icon: <LocationOn color="primary" />,
    text: "123, Jalan Bukit Bintang, Kuala Lumpur, Malaysia",
    label: "Address",
  },
  {
    icon: <Instagram color="primary" />,
    text: "@SanSanBBQ",
    label: "Instagram",
  },
];

// Reviews data
const reviews = [
  {
    title: "Authentic Korean Experience",
    content:
      "SanSan Korean BBQ delivers an incredible dining experience with authentic flavors and excellent service. The marinated meats are perfectly grilled and the atmosphere is amazing!",
    name: "Sarah Kim",
    location: "Kuala Lumpur",
    rating: 5,
    avatar: "SK",
  },
  {
    title: "Best BBQ in Town",
    content:
      "The quality of meat and the variety of side dishes is outstanding. Every visit feels like a celebration. Highly recommended for Korean food lovers!",
    name: "David Chen",
    location: "Petaling Jaya",
    rating: 5,
    avatar: "DC",
  },
  {
    title: "Amazing Service & Food",
    content:
      "From the moment we walked in, the staff was incredibly welcoming. The food exceeded our expectations and the prices are very reasonable for the quality.",
    name: "Lisa Wong",
    location: "Subang Jaya",
    rating: 5,
    avatar: "LW",
  },
];

// Our Promise data
const promises = [
  {
    title: "Fresh Ingredients",
    description: "Premium quality meats and vegetables",
    icon: <CheckCircle sx={{ fontSize: 40 }} />,
    color: "#4CAF50",
  },
  {
    title: "Authentic Taste",
    description: "Traditional Korean recipes and flavors",
    icon: <Favorite sx={{ fontSize: 40 }} />,
    color: "#E91E63",
  },
  {
    title: "Fast Service",
    description: "Quick preparation and delivery",
    icon: <FlashOn sx={{ fontSize: 40 }} />,
    color: "#FF9800",
  },
  {
    title: "100% Satisfaction",
    description: "Your happiness is our priority",
    icon: <Star sx={{ fontSize: 40 }} />,
    color: "#9C27B0",
  },
];

const AboutUsPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    message: Yup.string().required("Message is required"),
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

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          minHeight: "100vh",
          padding: 0,
        }}
      >
        {/* 1. Discover the SanSan Experience - Large Feature Card */}
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card
                  sx={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                    borderRadius: 4,
                    padding: 4,
                    minHeight: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box>
                    <Chip
                      label="NEW!"
                      sx={{
                        backgroundColor: "white",
                        color: "#FF6A00",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h2"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "Anton, sans-serif",
                        mb: 2,
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      DISCOVER THE SANSAN EXPERIENCE
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        opacity: 0.9,
                        maxWidth: 500,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      Experience authentic Korean BBQ with premium marinated
                      meats, traditional side dishes, and an atmosphere that
                      brings Seoul to Malaysia.
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "white",
                        color: "#FF6A00",
                        fontWeight: "bold",
                        px: 4,
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "#F5F5F5",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            {/* 2. Our Story - Smaller Image Cards */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        height: 200,
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(25, 118, 210, 0.8)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <Restaurant
                          sx={{ fontSize: 60, color: "white", mb: 2 }}
                        />
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="white"
                        >
                          Our Story
                        </Typography>
                        <Typography variant="body2" color="white" mt={1}>
                          Founded with passion for authentic Korean cuisine
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        height: 200,
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(245, 124, 0, 0.8)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <LocalFireDepartment
                          sx={{ fontSize: 60, color: "white", mb: 2 }}
                        />
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="white"
                        >
                          Authentic Flavors
                        </Typography>
                        <Typography variant="body2" color="white" mt={1}>
                          Traditional recipes passed down through generations
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* 3. Reviews Section */}
        <Box sx={{ padding: 4, backgroundColor: "#E8F5E8" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Anton, sans-serif",
                color: "#2E7D32",
                textAlign: "left",
                mb: 4,
              }}
            >
              Reviews
            </Typography>
            <Grid container spacing={4}>
              {reviews.map((review, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Speech Bubble Style Review */}
                    <Box
                      sx={{
                        position: "relative",
                        mb: 3,
                      }}
                    >
                      {/* Speech Bubble */}
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          backgroundColor: "#F5F5F5",
                          border: "2px solid #E0E0E0",
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -10,
                            left: "20%",
                            width: 0,
                            height: 0,
                            borderLeft: "15px solid transparent",
                            borderRight: "15px solid transparent",
                            borderTop: "15px solid #F5F5F5",
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            bottom: -12,
                            left: "20%",
                            width: 0,
                            height: 0,
                            borderLeft: "15px solid transparent",
                            borderRight: "15px solid transparent",
                            borderTop: "15px solid #E0E0E0",
                          },
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {review.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {review.content}
                        </Typography>
                      </Paper>

                      {/* Customer Info Below */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: "#4CAF50",
                            width: 50,
                            height: 50,
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {review.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {review.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {review.location}
                          </Typography>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* 4. Our Promise Section */}
        <Box sx={{ padding: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Anton, sans-serif",
                color: "#333",
                textAlign: "center",
                mb: 4,
              }}
            >
              Our Promise
            </Typography>
            <Grid container spacing={3}>
              {promises.map((promise, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "white",
                        textAlign: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          color: promise.color,
                          mb: 2,
                        }}
                      >
                        {promise.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {promise.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {promise.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* 5. Contact Us Section */}
        <Box sx={{ padding: 4, backgroundColor: "#F8F9FA" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Anton, sans-serif",
                color: "#333",
                textAlign: "center",
                mb: 4,
              }}
            >
              Get in Touch with Us!
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary.main"
                  gutterBottom
                >
                  Contact Information
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Have a question, event booking, or special request? We'd love
                  to hear from you!
                </Typography>
                <Grid container spacing={3}>
                  {contactList.map((contact, index) => (
                    <Grid item xs={12} key={index}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: "50%",
                            backgroundColor: "primary.main",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {contact.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {contact.label}
                          </Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {contact.text}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Send us a Message
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <TextField
                        {...register("name")}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                      <TextField
                        {...register("email")}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                      <TextField
                        {...register("phone")}
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                      <TextField
                        {...register("message")}
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                          mt: 2,
                          py: 1.5,
                          fontWeight: "bold",
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </form>
                  {showSuccess && (
                    <Paper
                      elevation={4}
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#4CAF50",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      🔥 Message sent successfully! We'll be in touch soon.
                    </Paper>
                  )}
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutUsPage;
