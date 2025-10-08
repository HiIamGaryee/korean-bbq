import React, { useEffect, useMemo, useRef } from "react";
import Layout from "../Layout";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeRounded from "@mui/icons-material/HomeRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import ReceiptLongRounded from "@mui/icons-material/ReceiptLongRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import LocalCafeRounded from "@mui/icons-material/LocalCafeRounded";
import IcecreamRounded from "@mui/icons-material/IcecreamRounded";
import LocalOfferRounded from "@mui/icons-material/LocalOfferRounded";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import SetMealIcon from "@mui/icons-material/SetMeal";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
};

const CATEGORIES = [
  {
    key: "bbq",
    label: "BBQ",
    icon: <LocalFireDepartmentIcon fontSize="small" />,
  },
  { key: "soup", label: "Soups", icon: <SoupKitchenIcon fontSize="small" /> },
  { key: "side", label: "Sides", icon: <SetMealIcon fontSize="small" /> },
  { key: "drink", label: "Drinks", icon: <LiquorIcon fontSize="small" /> },
  {
    key: "dessert",
    label: "Dessert",
    icon: <IcecreamRounded fontSize="small" />,
  },
  { key: "set", label: "Sets", icon: <RamenDiningIcon fontSize="small" /> },
  {
    key: "special",
    label: "Special",
    icon: <LocalOfferRounded fontSize="small" />,
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Signature Pork Belly",
    desc: "Thick-cut samgyeopsal grilled to perfection, served with dipping sauces.",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1601315483607-62a74c5c3a2f?w=600&auto=format&fit=crop",
    category: "bbq",
  },
  {
    id: "2",
    name: "Marinated Beef Bulgogi",
    desc: "Sweet-salty soy marinade on tender beef slices with sesame aroma.",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1569058242261-8235a82909f8?w=600&auto=format&fit=crop",
    category: "bbq",
  },
  {
    id: "3",
    name: "Spicy Kimchi Stew",
    desc: "Traditional kimchi jjigae simmered with tofu and pork belly.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1601924582971-90e4a2c47cf9?w=600&auto=format&fit=crop",
    category: "soup",
  },
  {
    id: "4",
    name: "Seafood Pancake",
    desc: "Crispy haemul pajeon filled with squid, shrimp, and spring onions.",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1603079843959-9a0a43a2e7e8?w=600&auto=format&fit=crop",
    category: "side",
  },
  {
    id: "5",
    name: "Japchae Glass Noodles",
    desc: "Stir-fried sweet potato noodles with vegetables and beef slices.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1590080875831-4e68b9a3cd3b?w=600&auto=format&fit=crop",
    category: "side",
  },
  {
    id: "6",
    name: "Iced Citron Tea",
    desc: "Refreshing yuzu-infused tea with ice and honey sweetness.",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1601043636663-7e5b4e3a3c1a?w=600&auto=format&fit=crop",
    category: "drink",
  },
  {
    id: "7",
    name: "Korean Soju",
    desc: "Classic distilled rice spirit, smooth and slightly sweet.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1575395824780-8a4e3a72f49a?w=600&auto=format&fit=crop",
    category: "drink",
  },
  {
    id: "8",
    name: "Matcha Bingsu",
    desc: "Shaved ice dessert with green tea syrup, red beans, and mochi.",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1606813902770-7c46a5ad9d54?w=600&auto=format&fit=crop",
    category: "dessert",
  },
  {
    id: "9",
    name: "Honey Butter Corn Cheese",
    desc: "Sweet-salty sizzling corn topped with butter and mozzarella.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1603079843959-9a0a43a2e7e8?w=600&auto=format&fit=crop",
    category: "special",
  },
  {
    id: "10",
    name: "Chef’s Combo Set",
    desc: "Best value: pork belly, bulgogi, 2 sides, and soft drink.",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1622012479469-1b7b8b1f8363?w=600&auto=format&fit=crop",
    category: "set",
  },
  {
    id: "11",
    name: "Tteokbokki Rice Cakes",
    desc: "Spicy chewy rice cakes in gochujang sauce, sprinkled with sesame.",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600628422019-50b6be9279cf?w=600&auto=format&fit=crop",
    category: "special",
  },
  {
    id: "12",
    name: "Korean Fried Chicken",
    desc: "Crispy twice-fried chicken glazed in sweet-spicy sauce.",
    price: 36,
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop",
    category: "bbq",
  },
];

const MenuV2Page: React.FC = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = React.useState(CATEGORIES[0].key);
  const [clickedKey, setClickedKey] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<string[]>(["hot"]);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Product | null>(null);
  const [qty, setQty] = React.useState(1);

  // Group products by category; we'll render ALL sections and use scroll-spy to highlight
  const groupedAll = useMemo(() => {
    const q = query.toLowerCase();
    return CATEGORIES.map((c) => ({
      key: c.key,
      label: c.label,
      items: MOCK_PRODUCTS.filter(
        (p) =>
          (p.category.includes(c.key) || c.key === "coffee") &&
          p.name.toLowerCase().includes(q)
      ),
    }));
  }, [query]);
  const grouped = useMemo(
    () => groupedAll.filter((g) => g.items.length > 0),
    [groupedAll]
  );

  // Section refs for scroll/spy
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>(
    {} as Record<string, HTMLDivElement | null>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target && (visible.target as HTMLElement).dataset.key) {
          const key = (visible.target as HTMLElement).dataset.key as string;
          setActiveCategory(key);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    Object.values(sectionRefs.current).forEach(
      (el) => el && observer.observe(el)
    );
    return () => observer.disconnect();
  }, [grouped.length]);

  useEffect(() => {
    if (grouped.length && !grouped.find((g) => g.key === activeCategory)) {
      setActiveCategory(grouped[0].key);
    }
  }, [grouped, activeCategory]);

  const addToCart = (product: Product, quantity: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const code = product.id; // use stable id as code
    const existingIndex = cart.findIndex((item: any) => item.code === code);
    const item = { name: product.name, code, price: product.price, quantity };
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <Layout>
      <Box
        sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}
      >
        {/* Header / Top bar */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            bgcolor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              JuJuly Café
            </Typography>
            <Typography variant="body2" color="text.secondary">
              714.2m
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* Filters for desktop */}
            <ToggleButtonGroup
              value={filters}
              onChange={(_, v) => v && setFilters(v)}
              aria-label="filters"
              exclusive={false}
              size="small"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              <ToggleButton value="hot">热饮</ToggleButton>
              <ToggleButton value="cold">冷饮</ToggleButton>
              <ToggleButton value="dessert">特选</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              size="small"
              sx={{ width: { xs: "100%", sm: 260 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Mobile filter tabs */}
          <Tabs value={0} sx={{ display: { xs: "block", md: "none" }, px: 1 }}>
            <Tab label="热饮" />
            <Tab label="冷饮" />
            <Tab label="特选" />
          </Tabs>
        </Box>

        {/* Layout: Sidebar + Content */}
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 2 }}>
          <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} md={3} lg={2}>
              <Paper
                sx={{
                  position: { md: "sticky" },
                  top: { md: 80 },
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <List dense>
                  {grouped.map((c) => (
                    <ListItemButton
                      key={c.key}
                      selected={c.key === activeCategory}
                      onClick={() => {
                        setClickedKey(c.key);
                        const el = document.getElementById(`sec-${c.key}`);
                        if (el) {
                          const y =
                            el.getBoundingClientRect().top +
                            window.scrollY -
                            80;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      sx={{
                        borderRadius: 1,
                        my: 0.25,
                        "&.Mui-selected": {
                          bgcolor: `${theme.palette.primary.main}10`,
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {(CATEGORIES.find((x) => x.key === c.key) as any)?.icon}
                        <ListItemText
                          primary={c.label}
                          primaryTypographyProps={{
                            fontWeight: c.key === activeCategory ? 700 : 500,
                          }}
                        />
                      </Box>
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Product grid - display ALL sections with scroll spy */}
            <Grid item xs={12} md={9} lg={10}>
              {/* Cinematic Banner - auto loop */}
              <Box sx={{ mb: 2 }}>
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop
                  pagination={{ clickable: true }}
                  style={{ borderRadius: 12 }}
                >
                  {[
                    {
                      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&auto=format&fit=crop",
                      title: "JuJuly Café Specials",
                      sub: "Fresh bakery daily · Seasonal beans",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&auto=format&fit=crop",
                      title: "Seasonal Drinks",
                      sub: "Pumpkin latte · Yuzu tea · Cold brew",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1400&auto=format&fit=crop",
                      title: "Breakfast Set",
                      sub: "Croissant · Scramble · Cappuccino",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=1400&auto=format&fit=crop",
                      title: "Artisan Pastries",
                      sub: "Baked in-house every morning",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1400&auto=format&fit=crop",
                      title: "Chef’s Picks",
                      sub: "Hand‑picked favorites of the week",
                    },
                  ].map((b, i) => (
                    <SwiperSlide key={i}>
                      <Box
                        sx={{
                          position: "relative",
                          height: { xs: 180, md: 260 },
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <motion.img
                          src={b.img}
                          alt={b.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2 }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            bottom: 18,
                            right: 16,
                          }}
                        >
                          <motion.div
                            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.6 }}
                          >
                            <Typography
                              variant="h5"
                              sx={{ color: "#fff", fontWeight: 800 }}
                            >
                              {b.title}
                            </Typography>
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "#fff", opacity: 0.9 }}
                            >
                              {b.sub}
                            </Typography>
                          </motion.div>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              {grouped.map((group) => (
                <Box
                  key={group.key}
                  id={`sec-${group.key}`}
                  data-key={group.key}
                  ref={(el: HTMLDivElement | null) =>
                    (sectionRefs.current[group.key] = el)
                  }
                  sx={{ scrollMarginTop: 96, mb: 3, position: "relative" }}
                >
                  {clickedKey === group.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -24,
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Swipe up to explore {group.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {group.label}
                  </Typography>
                  <Grid container spacing={2}>
                    {group.items.map((p) => (
                      <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: 2,
                              cursor: "pointer",
                              transition:
                                "transform 0.2s ease, box-shadow 0.2s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                              },
                            }}
                            onClick={() => {
                              setSelected(p);
                              setQty(1);
                            }}
                          >
                            <CardMedia
                              component="img"
                              height={isSmDown ? 140 : 160}
                              image={p.image}
                              alt={p.name}
                            />
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                minHeight: { xs: 72, sm: 96 },
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                gutterBottom
                              >
                                {p.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                              >
                                {p.desc}
                              </Typography>
                            </CardContent>
                            <CardActions
                              sx={{
                                px: 2,
                                pb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="subtitle1" fontWeight={800}>
                                RM{p.price}
                              </Typography>
                              <IconButton
                                color="primary"
                                size={isSmDown ? "small" : "medium"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelected(p);
                                  setQty(1);
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                    {group.items.length === 0 && (
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            No items in this category.
                          </Typography>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>

        {/* Bottom navigation (mobile only) */}
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: { xs: "16px 16px 0 0", md: 0 },
            mx: { xs: 2, md: 0 },
            mb: { xs: 1.5, md: 0 },
            p: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "space-around",
            alignItems: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          {[
            { icon: <HomeRounded />, label: "首页" },
            { icon: <PlaceRounded />, label: "发现" },
            { icon: <ReceiptLongRounded />, label: "订单" },
            { icon: <PersonRounded />, label: "我的" },
            { icon: <HelpCenterRounded />, label: "客服" },
          ].map((i) => (
            <Box
              key={i.label}
              sx={{ textAlign: "center", color: "primary.main" }}
            >
              <IconButton color="primary">{i.icon}</IconButton>
              <Typography variant="caption">{i.label}</Typography>
            </Box>
          ))}
        </Paper>
        {/* Product Detail Dialog */}
        <Dialog
          open={!!selected}
          onClose={() => setSelected(null)}
          fullWidth
          maxWidth="sm"
        >
          {selected && (
            <>
              <DialogTitle sx={{ fontWeight: 800 }}>
                {selected.name}
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    style={{ width: "100%", display: "block" }}
                  />
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip size="small" label="300ml" />
                  <Chip size="small" label="359 cal" />
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                >
                  {selected.desc}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Ingredients
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ramen, pumpkin, onion, garlic, greens, nori, ginger, olive
                  oil, broth, tomatoes, chili, coconut milk, soy sauce,
                  turmeric, cumin, salt, pepper
                </Typography>
              </DialogContent>
              <DialogActions
                sx={{
                  px: 3,
                  pb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: (t) => `1px solid ${t.palette.divider}`,
                    borderRadius: 999,
                    px: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </IconButton>
                  <Typography sx={{ width: 24, textAlign: "center" }}>
                    {qty}
                  </Typography>
                  <IconButton size="small" onClick={() => setQty((q) => q + 1)}>
                    +
                  </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    if (selected) {
                      addToCart(selected, qty);
                      setSelected(null);
                      navigate("/cart");
                    }
                  }}
                >
                  Order ·RM
                  {(selected?.price ? selected.price * qty : 0).toFixed(0)}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Layout>
  );
};

export default MenuV2Page;
