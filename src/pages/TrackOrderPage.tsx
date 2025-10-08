import React from "react";
import Layout from "../Layout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  Chip,
} from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const TrackOrderPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Track Order
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* Left: Order Details & Timeline */}
          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1604908554015-7dd09f0ae7d2?w=400&auto=format&fit=crop"
                  alt="item"
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography fontWeight={800}>
                    Almond Chocolate Cake
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cake | Qty: 1 | $70.00
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Order Details
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ color: "text.secondary", mb: 2 }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption">
                    Expected Delivery Date
                  </Typography>
                  <Typography>19 Dec 2023</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption">Order ID</Typography>
                  <Typography>BKRA45HGJF</Typography>
                </Box>
              </Stack>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Order Status
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: "Order Placed", time: "19 Dec 2023, 11:25 PM" },
                  { label: "In Progress", time: "19 Dec 2023, 02:15 PM" },
                  { label: "Shipped", time: "19 Dec 2023, 06:05 PM" },
                  { label: "Delivered", time: "19 Dec 2023, 06:40 PM" },
                ].map((s, i) => (
                  <Stack
                    key={s.label}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        bgcolor:
                          i < 3
                            ? theme.palette.secondary.main
                            : theme.palette.grey[400],
                      }}
                    />
                    <Box>
                      <Typography fontWeight={700}>{s.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {s.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3, borderRadius: 2 }}
              >
                Track Live Location
              </Button>
            </CardContent>
          </Card>

          {/* Right: Map & Courier info (mock) */}
          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Box
                sx={{
                  height: 260,
                  borderRadius: 2,
                  bgcolor: theme.palette.action.hover,
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                }}
              >
                <DeliveryDiningIcon color="secondary" />
                <Chip
                  label="Estimated: 05:30 PM - 06:00 PM"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    bgcolor: theme.palette.background.paper,
                  }}
                />
              </Box>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Avatar src="https://i.pravatar.cc/100?img=5" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={700}>John Doe</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Delivery Man
                  </Typography>
                </Box>
                <PhoneIcon color="primary" />
              </Stack>
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon color="primary" />
                  <Typography variant="body2">
                    Rise & Shine Bakery Co.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon color="primary" />
                  <Typography variant="body2">
                    1901 Thornridge Cir. Shiloh, Haw…
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Layout>
  );
};

export default TrackOrderPage;
