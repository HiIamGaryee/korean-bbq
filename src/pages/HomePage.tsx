import Layout from "../Layout";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  CardContent,
  Card,
  Avatar,
  Chip,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenu, type MenuItem } from "../api/getMenu";

const CategoryTeasers = [
  { key: "BBQ", label: "BBQ", icon: "🔥" },
  { key: "Bibimbap", label: "Bibimbap", icon: "🥗" },
  { key: "Sides", label: "Sides", icon: "🥟" },
  { key: "Drinks", label: "Drinks", icon: "🥤" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const [offers, setOffers] = useState<MenuItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getMenu();
        const items = (data.menu ?? []).slice(0, 8);
        setOffers(items);
      } catch {
        setOffers([]);
      }
    })();
  }, []);

  return (
    <Layout>
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: 360, md: 520 },
          backgroundColor: "#0E0E0E",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.4), #0E0E0E)",
          }}
        />
        <Grid container sx={{ position: "relative", zIndex: 1, py: 6 }}>
          <Grid item xs={12} md={8} sx={{ px: { xs: 2, md: 8 } }}>
            <Stack spacing={2}>
              <Typography variant="h2">
                Authentic Korean BBQ Experience.
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Grilled perfection in every bite.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/menu")}
                >
                  Order Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/menu")}
                >
                  View Menu
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* Category Teasers */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
        <Grid container spacing={2}>
          {CategoryTeasers.map((c) => (
            <Grid item xs={12} sm={6} md={3} key={c.key}>
              <Box
                sx={{
                  backgroundColor: "#1A1A1A",
                  borderRadius: 2,
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  cursor: "pointer",
                  transition: "box-shadow .2s ease, transform .2s ease",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(107,60,246,0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() =>
                  navigate(`/menu?category=${encodeURIComponent(c.key)}`)
                }
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>{c.icon}</Avatar>
                <Typography variant="h6">{c.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Member Food Picks - Swiper */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          pb: 8,
          "& .swiper": { overflow: "visible" },
          "& .swiper-wrapper": { overflow: "visible" },
          "& .swiper-slide": { overflow: "visible" },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Member Picks
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            900: { slidesPerView: 2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {[
            {
              id: 1,
              name: "Jeera Chawal",
              price: 180,
              old: 200,
              img: "https://images.unsplash.com/photo-1542442828-287211e2cd50?w=800&auto=format&fit=crop",
            },
            {
              id: 2,
              name: "Kadai Chicken",
              price: 220,
              old: 260,
              img: "https://images.unsplash.com/photo-1604908176997-9313b2b76c7e?w=800&auto=format&fit=crop",
            },
            {
              id: 3,
              name: "Palak Paneer",
              price: 200,
              old: 220,
              img: "https://images.unsplash.com/photo-1631459375138-3e9d9e0d05f6?w=800&auto=format&fit=crop",
            },
            {
              id: 4,
              name: "Mutton Curry",
              price: 260,
              old: 300,
              img: "https://images.unsplash.com/photo-1604908554015-7dd09f0ae7d2?w=800&auto=format&fit=crop",
            },
            {
              id: 5,
              name: "Veg Biryani",
              price: 190,
              old: 210,
              img: "https://images.unsplash.com/photo-1625944529448-56a67a9d88d2?w=800&auto=format&fit=crop",
            },
            {
              id: 6,
              name: "Butter Naan",
              price: 70,
              old: 80,
              img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop",
            },
          ].map((f) => (
            <SwiperSlide key={f.id}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  p: 2,
                  bgcolor: (t) => t.palette.background.paper,
                  boxShadow: 2,
                  overflow: "visible",
                  height: 300,
                }}
              >
                {/* Protruding Food Image */}
                <Box
                  component="img"
                  src={f.img}
                  alt={f.name}
                  sx={{
                    position: "absolute",
                    top: -40,
                    left: 24,
                    width: 140,
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 3,
                    transform: "rotate(-8deg)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
                {/* Circular Price Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 16,
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    boxShadow: 3,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      PRICE
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      ₹{f.price}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }}
                    >
                      ₹{f.old}
                    </Typography>
                  </Box>
                </Box>
                {/* Content */}
                <Box sx={{ mt: 8 }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Chef
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    {f.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Aromatic, soft, and tender chunks of lamb layered with rice
                    infused with the flavors of spices…
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="ORDER NOW" color="secondary" clickable />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Layout>
  );
};

export default HomePage;
