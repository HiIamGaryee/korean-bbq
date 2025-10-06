import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Layout from "../Layout";

const packageList = [
  {
    id: "blindbox",
    name: "Blind Box Subscription",
    monthlyPrice: "$10 / Per Month",
    annuallyPrice: "$120 / Per Year",
    description:
      "Explore new flavors each month of surprise selection of coffee beans delivered to your.",
    features: [
      "Monthly delivery of hand-picked coffee beans",
      "One Blind Box with a surprise selection of beans",
    ],
    customers: "Ideal for those looking to explore new coffee flavors",
  },
  {
    id: "education",
    name: "Educational Subscription",
    monthlyPrice: "$30 / Per Month",
    annuallyPrice: "$330 / Per Year",
    description:
      "Learn coffee brewing techniques through exclusive online courses and workshops.",
    features: [
      "Access to monthly online courses on coffee brewing",
      "Participation in monthly live workshops",
    ],
    customers:
      "Perfect for beginners and enthusiasts wanting to perfect their brewing skills",
  },
  {
    id: "member",
    name: "Membership Subscription",
    monthlyPrice: "$15 / Per Month",
    annuallyPrice: "$165 / Per Year",
    description:
      "Enjoy exclusive member benefits and promotions throughout the year.",
    features: [
      "Monthly promotions exclusive to members",
      "Special birthday promotion",
      "10% discount on all additional purchases",
    ],
    customers: "Great for regular customers seeking extra benefits and savings",
  },
];

const PackagePage = () => {
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "light.main",

          p: 4,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Join over 1 Million user using Brewed in chaos
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          <span>Cancel anytime</span> • <span>Secure payment</span>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}></Box>

        {/* Package Cards */}
        <Grid container spacing={4} justifyContent="center">
          {packageList.map((pkg) => (
            <Grid item xs={12} md={4} key={pkg.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <CardContent>
                  <Typography variant="body2">{pkg.customers}</Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 2 }}>
                    {pkg.monthlyPrice}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {pkg.description}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {pkg.features.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "8px",
                          fontSize: "0.875rem",

                          textAlign: "left",
                        }}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                  // variant="contained"
                  // sx={{ mt: 2 }}
                  // fullWidth
                  // disabled={pkg.id === "enterprise"} // Example: Enterprise plan needs contact
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default PackagePage;
